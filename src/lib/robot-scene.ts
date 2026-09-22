import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { robotUnitPose } from "./robot-motion";

export type RobotSceneHandle = {
  dispose: () => void;
  endInteraction: () => void;
  rotateBy: (x: number) => void;
};

const emptyHandle: RobotSceneHandle = {
  dispose: () => {},
  endInteraction: () => {},
  rotateBy: () => {},
};

type Unit = {
  node: THREE.Object3D;
  explode: [number, number, number];
  turn: [number, number, number];
  anchor: THREE.Vector3;
  guide: THREE.Line;
};
const clamp = THREE.MathUtils.clamp;
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export async function createRobotScene(
  host: HTMLDivElement,
  paused: () => boolean,
  ready: (ok: boolean) => void,
  manualChanged: (manual: boolean) => void,
  options?: { scrollLinked: true },
): Promise<RobotSceneHandle> {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    ready(false);
    return emptyHandle;
  }
  const mobile = () => window.innerWidth <= 700;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, mobile() ? 1.5 : 1.75),
  );
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.setClearColor(0x0c0d0e, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    34,
    host.clientWidth / host.clientHeight,
    0.1,
    80,
  );
  camera.position.set(6, 4.7, 7.8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new THREE.Scene();
  room.background = new THREE.Color("#191b18");
  for (const [position, size, strength] of [
    [[-4, 5, 3], [4, 5, 1], 5],
    [[4, 3, -4], [2, 6, 1], 7],
    [[0, 7, 0], [5, 1, 5], 3],
  ] as [number[], number[], number][]) {
    const softbox = new THREE.Mesh(
      new THREE.BoxGeometry(...(size as [number, number, number])),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(strength, strength, strength),
      }),
    );
    softbox.position.set(...(position as [number, number, number]));
    softbox.lookAt(0, 0, 0);
    room.add(softbox);
  }
  const env = pmrem.fromScene(room, 0.03);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.65;
  room.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      o.material.dispose();
    }
  });
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xeaf2ee, 0x203121, 0.35));
  const key = new THREE.DirectionalLight(0xfff9e6, 2.2);
  key.position.set(-3, 7, 5);
  scene.add(key);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0003;
  key.shadow.radius = 4;
  const rim = new THREE.DirectionalLight(0xc9efdb, 3.5);
  rim.position.set(4, 2, -6);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xe3edff, 0.35);
  fill.position.set(6, 1, 4);
  scene.add(fill);
  const robot = new THREE.Group();
  scene.add(robot);
  const content = new THREE.Group();
  content.scale.setScalar(0.012);
  content.position.y = -1.4;
  robot.add(content);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.35 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.62;
  floor.receiveShadow = true;
  scene.add(floor);
  const orbit = new THREE.Group();
  scene.add(orbit);
  orbit.position.y = -1.64;
  for (const radius of [2.9, 3.03]) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.003, 4, 160),
      new THREE.MeshBasicMaterial({
        color: 0xf5c518,
        transparent: true,
        opacity: radius === 2.9 ? 0.25 : 0.08,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    orbit.add(ring);
  }
  // A sparse physical floor grid keeps scale visible without competing with the robot.
  const grid = new THREE.GridHelper(16, 32, 0x24382c, 0x24382c);
  grid.position.y = -1.65;
  grid.material.transparent = true;
  grid.material.opacity = 0.12;
  scene.add(grid);
  const units: Unit[] = [];
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  let model: THREE.Group;
  try {
    model = (await loader.loadAsync("/models/connectech-concept.glb")).scene;
    model.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const assembly = model.children.length === 1 ? model.children[0] : model;
    for (const node of [...assembly.children]) {
      if (node.userData.explosion) {
        const anchor = new THREE.Box3()
          .setFromObject(node)
          .getCenter(new THREE.Vector3());
        // Rotate each assembly around its own centre after extraction.
        const pivot = new THREE.Group();
        pivot.name = node.name;
        pivot.position.copy(anchor);
        node.position.sub(anchor);
        pivot.add(node);
        assembly.add(pivot);
        const guide = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([anchor, anchor]),
          new THREE.LineBasicMaterial({
            color: 0xf5c518,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          }),
        );
        content.add(guide);
        units.push({
          node: pivot,
          explode: node.userData.explosion as [number, number, number],
          turn: node.userData.turn as [number, number, number],
          anchor,
          guide,
        });
      }
    }
    content.add(model);
  } catch {
    ready(false);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    env.dispose();
    return emptyHandle;
  }
  const renderTarget = new THREE.WebGLRenderTarget(
    host.clientWidth,
    host.clientHeight,
    { type: THREE.HalfFloatType, samples: 4 },
  );
  const composer = new EffectComposer(renderer, renderTarget);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  composer.addPass(new RenderPass(scene, camera));
  const ao = new GTAOPass(scene, camera, host.clientWidth, host.clientHeight);
  ao.updateGtaoMaterial({
    radius: 0.28,
    thickness: 1,
    distanceExponent: 1.4,
    distanceFallOff: 0.8,
    scale: 1,
    samples: 12,
  });
  ao.blendIntensity = 0.7;
  composer.addPass(ao);
  const output = new OutputPass();
  composer.addPass(output);
  let frame = 0,
    target = 0,
    progress = 0,
    turntableAngle = 0,
    lastTime = 0,
    visible = !document.hidden,
    dirty = true,
    lastPose = -1;
  let manual = false,
    manualYaw = 0;
  let pointer: { id: number; x: number; y: number; moved: boolean; touch: boolean } | null = null;
  const automaticYaw = () =>
    reduce.matches ? -0.2 : -0.2 - smooth(0, 0.32, progress) * 1.15 +
      smooth(0.42, 0.78, progress) * 2.5 + smooth(0.78, 0.97, progress) * 0.2;
  const rotateBy = (x: number) => {
    if (!manual) {
      manual = true;
      manualYaw = robot.rotation.y;
      manualChanged(true);
    }
    manualYaw += x * 0.008;
    dirty = true;
  };
  const finishDrag = () => {
    const finishedPointer = pointer;
    // Clear first so lostpointercapture cannot keep an old drag active.
    pointer = null;
    if (finishedPointer && renderer.domElement.hasPointerCapture(finishedPointer.id))
      renderer.domElement.releasePointerCapture(finishedPointer.id);
    if (manual) {
      // Rebase the turntable at the released pose so rotation resumes without a snap.
      turntableAngle = manualYaw - automaticYaw();
      manual = false;
      manualChanged(false);
    }
    host.style.cursor = "grab";
    dirty = true;
  };
  const pointerDown = (event: PointerEvent) => {
    if (pointer || !event.isPrimary || event.button !== 0) return;
    // The whole canvas is a drag surface, including the space between assemblies.
    // HTML links and controls sit above it and retain their own pointer events.
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, touch: event.pointerType === "touch" };
    renderer.domElement.setPointerCapture(event.pointerId);
    host.style.cursor = "grabbing";
    // Pointer users should not receive the keyboard focus outline around the scene.
    rotateBy(0);
  };
  const pointerMove = (event: PointerEvent) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const x = event.clientX - pointer.x, y = event.clientY - pointer.y;
    if (!pointer.moved && Math.hypot(x, y) < 4) return;
    // Let a vertical phone gesture scroll without changing the robot angle.
    if (!pointer.moved && pointer.touch && Math.abs(y) > Math.abs(x)) return;
    pointer.moved = true;
    rotateBy(x);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };
  const pointerEnd = (event: PointerEvent) => {
    if (pointer?.id === event.pointerId) finishDrag();
  };
  renderer.domElement.addEventListener("pointerdown", pointerDown);
  renderer.domElement.addEventListener("pointermove", pointerMove);
  renderer.domElement.addEventListener("pointerup", pointerEnd);
  renderer.domElement.addEventListener("pointercancel", pointerEnd);
  renderer.domElement.addEventListener("lostpointercapture", pointerEnd);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scroll = () => {
    if (options) {
      const bounds = host.getBoundingClientRect();
      const viewport = window.innerHeight;
      // One complete, reversible disassembly while this inline scene crosses
      // the phone viewport. Finger position maps directly to the model pose.
      target = clamp(
        (viewport * 0.65 - bounds.top) /
          (viewport * 0.5 + bounds.height),
        0,
        1,
      );
      dirty = true;
      return;
    }
    const page = document.getElementById("bioglow");
    dirty = true;
    if (page)
      target = clamp(
        window.scrollY / Math.max(1, page.offsetHeight - window.innerHeight),
        0,
        1,
      );
  };
  const resize = () => {
    dirty = true;
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, mobile() ? 1.5 : 1.75),
    );
    composer.setSize(host.clientWidth, host.clientHeight);
    scroll();
  };
  const observe = new ResizeObserver(resize);
  observe.observe(host);
  const onVisibility = () => {
    visible = !document.hidden;
    if (!visible) finishDrag();
    lastTime = 0;
    dirty = true;
  };
  const onMotionPreference = () => {
    dirty = true;
  };
  reduce.addEventListener("change", onMotionPreference);
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  scroll();
  progress = target;
  const render = (time: number) => {
    frame = requestAnimationFrame(render);
    if (!visible) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    const motionPaused = paused();
    const autoRotating = !motionPaused && !reduce.matches && !manual && !pointer;
    if (autoRotating) {
      // A 40-second turntable reveals every angle even when scrolling stops.
      turntableAngle =
        (turntableAngle + (delta * Math.PI * 2) / 40) % (Math.PI * 2);
    }
    // Scrub directly from scroll position. Time-based damping causes the parts
    // to chase the scrollbar and keep moving after the user has stopped.
    if (!motionPaused) progress = target;
    const open = reduce.matches
      ? 0
      : smooth(0.1, 0.32, progress) * (1 - smooth(0.55, 0.78, progress));
    // Pausing freezes articulation, but section placement must keep copy readable.
    const shift =
      reduce.matches || motionPaused
        ? target > 0.18 && target < 0.5
          ? 1
          : 0
        : smooth(0.12, 0.3, progress) * (1 - smooth(0.47, 0.65, progress));
    const isMobile = mobile();
    if (
      !dirty &&
      !autoRotating &&
      (motionPaused || Math.abs(progress - lastPose) < 0.00005)
    )
      return;
    dirty = false;
    lastPose = progress;
    for (const unit of units) {
      const amount = reduce.matches ? 0 : open;
      const pose = robotUnitPose(
        unit.node.name,
        amount,
        unit.explode,
        unit.turn,
      );
      unit.node.position.set(...pose.offset).add(unit.anchor);
      unit.node.rotation.set(...pose.rotation);
      const points = unit.guide.geometry.attributes.position;
      points.setXYZ(
        1,
        unit.node.position.x,
        unit.node.position.y,
        unit.node.position.z,
      );
      points.needsUpdate = true;
      (unit.guide.material as THREE.LineBasicMaterial).opacity = amount * 0.12;
      unit.guide.visible = amount > 0.01;
    }
    // Only yaw changes: the robot's up direction stays aligned with world up.
    robot.rotation.set(
      0,
      manual ? manualYaw : automaticYaw() + turntableAngle,
      0,
    );
    robot.position.set(0, 0, 0);
    // Centre the long attachment on the turntable, including its extracted pose.
    content.position.z = 1.1 + open * 0.75;
    // Reserve room for the long attachment throughout the complete rotation.
    const desktopFit = Math.min(1, host.clientWidth / host.clientHeight / 1.5);
    const scale = isMobile
      ? 0.62 - smooth(0, 0.18, open) * 0.18 - smooth(0.7, 1, open) * 0.05
      : (0.62 - smooth(0, 0.18, open) * 0.17 - smooth(0.7, 1, open) * 0.05) *
        desktopFit;
    robot.scale.setScalar(scale);
    const base = units.find((unit) => unit.node.name === "01_Chassis");
    const baseDrop = base ? base.node.position.y - base.anchor.y : 0;
    floor.position.y =
      (content.position.y + (-31 + baseDrop) * 0.012) * scale +
      robot.position.y -
      0.06;
    grid.position.y = floor.position.y + 0.005;
    orbit.position.y = floor.position.y + 0.01;
    const distance = isMobile
      ? 7.7 * Math.max(1, host.clientHeight / host.clientWidth)
      : 12;
    camera.position.set(distance * 0.6, distance * 0.47, distance * 0.78);
    camera.lookAt(0, 0.15, 0);
    if (isMobile) {
      // Mobile has a dedicated lower viewport; frame its centre without a page offset.
      camera.clearViewOffset();
    } else
      camera.setViewOffset(
        host.clientWidth,
        host.clientHeight,
        -host.clientWidth * (0.215 - shift * 0.445),
        0,
        host.clientWidth,
        host.clientHeight,
      );
    orbit.position.x = robot.position.x;
    orbit.scale.setScalar(scale);
    orbit.visible = !isMobile;
    if (isMobile) renderer.render(scene, camera);
    else composer.render();
  };
  frame = requestAnimationFrame(render);
  ready(true);
  const contextLost = (event: Event) => {
    event.preventDefault();
    visible = false;
    ready(false);
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  const dispose = () => {
    finishDrag();
    renderer.domElement.removeEventListener("pointerdown", pointerDown);
    renderer.domElement.removeEventListener("pointermove", pointerMove);
    renderer.domElement.removeEventListener("pointerup", pointerEnd);
    renderer.domElement.removeEventListener("pointercancel", pointerEnd);
    renderer.domElement.removeEventListener("lostpointercapture", pointerEnd);
    cancelAnimationFrame(frame);
    observe.disconnect();
    reduce.removeEventListener("change", onMotionPreference);
    window.removeEventListener("scroll", scroll);
    document.removeEventListener("visibilitychange", onVisibility);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
        geometries.add(o.geometry);
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          materials.add(m),
        );
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    ao.dispose();
    output.dispose();
    composer.dispose();
    env.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
  return {
    dispose,
    rotateBy,
    endInteraction: finishDrag,
  };
}
