// Build a photo-guided visual reconstruction from attributed LDraw geometry.
// Usage: node scripts/build-robot-model.mjs /path/to/extracted/ldraw/library
import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { LDrawLoader } from "three/addons/loaders/LDrawLoader.js";
import { LDrawConditionalLineMaterial } from "three/addons/materials/LDrawConditionalLineMaterial.js";
import { LDrawUtils } from "three/addons/utils/LDrawUtils.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

const library = path.resolve(
  process.argv[2] || "../../local/tessa-fll/website-visual-proof/ldraw/library",
);
const output = path.resolve("public/models");
fs.mkdirSync(output, { recursive: true });
globalThis.ProgressEvent ??= class {
  constructor(type, init) {
    Object.assign(this, { type }, init);
  }
};
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((x) => {
      this.result = x;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((x) => {
      this.result = `data:${blob.type};base64,${Buffer.from(x).toString("base64")}`;
      this.onloadend?.();
    });
  }
};
const accessed = new Set();
const manager = new THREE.LoadingManager();
manager.setURLModifier((url) => {
  const rel = url
    .replaceAll("\\", "/")
    .replace(/^ldraw\//, "")
    .toLowerCase();
  const found = [rel, `parts/${rel}`, `p/${rel}`]
    .map((f) => path.join(library, f))
    .find((f) => fs.existsSync(f));
  if (!found) throw new Error(`Missing LDraw source: ${url}`);
  accessed.add(found);
  return `data:text/plain;base64,${fs.readFileSync(found).toString("base64")}`;
});
const loader = new LDrawLoader(manager)
  .setPartsLibraryPath("ldraw/")
  .setConditionalLineMaterial(LDrawConditionalLineMaterial);
await loader.preloadMaterials("LDConfig.ldr");
const ids = [
  "45601",
  "32278",
  "32525",
  "32524",
  "32523",
  "64179",
  "6558",
  "2780",
  "41896c01",
  "54696",
  "3648",
  "3649",
  "3706",
  "11954",
  "3743",
  "3713",
  "3707",
  "32073",
  "32270",
];
const parts = new Map();
for (const id of ids) {
  const raw = await loader.loadAsync(`parts/${id}.dat`);
  const remove = [];
  raw.traverse((o) => {
    if (o.isLineSegments) remove.push(o);
  });
  remove.forEach((o) => o.removeFromParent());
  raw.rotation.x = Math.PI;
  const merged = LDrawUtils.mergeObject(raw);
  const box = new THREE.Box3().setFromObject(merged);
  console.log(
    id,
    "bounds",
    box.min.toArray().map(Math.round),
    box.max.toArray().map(Math.round),
  );
  parts.set(id, merged);
}
if (process.argv.includes("--inspect")) process.exit(0);
const palette = new Map();
function finish(material, override = "#ebe9df") {
  const original =
    material.name === "Main_Colour" ||
    material.name === "Main Colour" ||
    material.userData.code === "16";
  const code = override && original ? override : material.color.getHexString();
  const key = `${code}/${material.name}`;
  if (!palette.has(key)) {
    let color =
      original && override ? override : `#${material.color.getHexString()}`;
    if (material.name.toLowerCase() === "black") color = "#141819";
    if (material.name.toLowerCase().includes("yellow")) color = "#e9b500";
    if (material.name.toLowerCase() === "white") color = "#ebe9df";
    const mat = new THREE.MeshPhysicalMaterial({
      name: original && override ? override : material.name,
      color,
      roughness: 0.25,
      metalness: 0.025,
      clearcoat: 0.3,
      clearcoatRoughness: 0.26,
    });
    if (material.opacity < 1) {
      mat.color.set("#b0c7c5");
      mat.roughness = 0.12;
      mat.metalness = 0.25;
    }
    if (material.name.toLowerCase().includes("rubber")) {
      mat.roughness = 0.8;
      mat.clearcoat = 0;
    }
    palette.set(key, mat);
  }
  return palette.get(key);
}
const root = new THREE.Group();
root.name = "ConnecTech_photo_inspired_concept";
const units = [];
function unit(name, explosion, turn = [0, 0, 0]) {
  const g = new THREE.Group();
  g.name = name;
  g.userData = { explosion, turn };
  root.add(g);
  units.push(g);
  return g;
}
function part(parent, id, xyz, rot = [0, 0, 0], color) {
  const copy = parts.get(id).clone(true);
  copy.traverse((o) => {
    if (o.isMesh) {
      o.material = finish(o.material, color);
    }
  });
  copy.position.set(...xyz);
  copy.rotation.set(...rot);
  parent.add(copy);
  return copy;
}
const black = "#141819",
  yellow = "#ebbd05",
  blue = "#176be8",
  grey = "#989e9e";
const pi = Math.PI;
const v = (a) => new THREE.Vector3(...a);
// In the imported parts, beams run along Z and their face holes point along Y.
function oriented(parent, id, xyz, along, normal, color) {
  const object = part(parent, id, xyz, [0, 0, 0], color);
  const z = v(along).normalize(), y = v(normal).normalize();
  const x = y.clone().cross(z).normalize();
  object.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
  return object;
}
function beam(parent, id, xyz, along, normal, color) {
  return oriented(parent, id, xyz, along, normal, color);
}
function pin(parent, xyz, direction, color = blue, id = "6558") {
  const object = part(parent, id, xyz, [0, 0, 0], color);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), v(direction));
  return object;
}
function axle(parent, id, xyz, direction, color = grey) {
  return pin(parent, xyz, direction, color, id);
}
function gear(parent, id, xyz, phase = 0, color = grey) {
  return part(parent, id, xyz, [phase, pi / 2, 0], color);
}
function solid(parent, size, xyz, color, name) {
  const material = new THREE.MeshPhysicalMaterial({ name, color, roughness: 0.35, clearcoat: 0.15 });
  const object = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  object.position.set(...xyz);
  parent.add(object);
  return object;
}
function cable(parent, points) {
  const curve = new THREE.CatmullRomCurve3(points.map(v), false, "centripetal");
  const material = new THREE.MeshStandardMaterial({ name: "Black electrical cable", color: "#171a1b", roughness: 0.62 });
  // Parallel fine strands suggest the flat Powered Up cable without excess geometry.
  for (const shift of [-2.2, 0, 2.2]) {
    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 1.6, 6, false), material);
    wire.position.x = shift;
    parent.add(wire);
  }
}

// Photo-guided base with its removable cage: the later underside photos resolve the four motors and castors.
const base = unit("01_Chassis", [0, -36, 0]);
for (const x of [-80, 80])
  for (const z of [-85, 65]) part(base, "64179", [x, -20, z], [0, 0, 0], black);
for (const z of [-190, 170])
  for (const x of [-70, 70]) beam(base, "32524", [x, 0, z], [1, 0, 0], [0, 1, 0], yellow);
for (const x of [-150, 150]) {
  beam(base, "32278", [x, 0, 20], [0, 0, 1], [0, 1, 0], yellow);
  beam(base, "32523", [x, 0, -160], [0, 0, 1], [0, 1, 0], yellow);
}
// The inner base keeps the alternating protective strips. The separate outer cage carries open frames.
for (const side of [-1, 1]) {
  const wall = unit(side < 0 ? "02_Left_chassis" : "03_Right_chassis", [side * 235, 10, 0], [0, 0, side * 0.08]);
  for (const [y, color] of [[20, black], [40, yellow], [60, black], [80, yellow], [100, black], [120, yellow], [140, black]]) {
    beam(wall, "32278", [side * 160, y, 20], [0, 0, 1], [0, 1, 0], color);
    beam(wall, "32523", [side * 160, y, -160], [0, 0, 1], [0, 1, 0], color);
  }
  for (const z of [-110, 50]) {
    // A 7 x 5 frame on its edge, holes visible from the side.
    const cageWindow = oriented(wall, "64179", [side * 185, 80, z], [0, 0, 1], [side, 0, 0], grey);
    cageWindow.userData.cage = true;
  }
  for (const z of [-170, -90, 10, 110, 150]) pin(wall, [side * 160, 122, z], [0, 1, 0]);
  // Rounded black top panels alongside the white hub.
  part(wall, "11954", [side * 140, 100, 45], [0, side < 0 ? pi : 0, 0], black);
  const end = unit(side < 0 ? "04_Front_frame" : "05_Rear_frame", [0, 5, side * 220], [side * -0.05, 0, 0]);
  const z = side < 0 ? -190 : 170;
  for (const [y, color] of [[20, black], [40, yellow], [60, black], [80, yellow], [100, black], [120, yellow], [140, black]])
    beam(end, "32278", [0, y, z], [1, 0, 0], [0, 1, 0], color);
  for (const x of [-70, 70]) {
    const cageWindow = oriented(end, "64179", [x, 80, z + side * 22], [1, 0, 0], [0, 0, side], side < 0 ? yellow : grey);
    cageWindow.userData.cage = true;
  }
  for (const x of [-130, -90, -30, 30, 90, 130]) pin(end, [x, 122, z], [0, 1, 0]);
}
const hub = unit("06_SPIKE_hub", [0, 190, 100], [0.04, 0.08, 0]);
part(hub, "45601", [0, 75, 80], [0, pi / 2, 0]);
// White top is just above the surrounding panels, as in the photographs.
// Show physical plugs and cable continuity to the attachment motor and two drive motors.
const drive = unit("07_Motor_core", [0, 75, 60]);
for (const side of [-1, 1]) {
  // Angular outputs face the actual wheel axles, not vertically into empty space.
  const motor = part(drive, "54696", [side * 38, 40, -60], [0, pi, side * -pi / 2]);
  // Explicit basis keeps the output axis across the chassis and cable end toward the hub.
  const y = new THREE.Vector3(side, 0, 0), z = new THREE.Vector3(0, 0, -1);
  motor.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(y.clone().cross(z), y, z));
  beam(drive, "32525", [side * 50, 8, 20], [0, 0, 1], [0, 1, 0], black);
}
for (const x of [-40, 0, 40]) {
  solid(drive, [15, 13, 23], [x, 143, 1], "#b9c8c6", "Powered Up plug");
  solid(drive, [12, 8, 8], [x, 143, -12], "#4c5251", "Cable strain relief");
}
cable(drive, [[0, 143, -15], [0, 154, -38], [-50, 151, -52], [-65, 105, -86], [45, 100, -7]]);
cable(drive, [[-40, 143, -15], [-61, 135, -32], [-66, 88, -15], [-43, 42, 83]]);
cable(drive, [[40, 143, -15], [61, 135, -32], [66, 88, -15], [43, 42, 83]]);

// Two white ball supports and azure mounts are visible in the supplied underside views.
for (const x of [-100, 100]) {
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 18, 32), new THREE.MeshStandardMaterial({ name: "Azure caster housing", color: "#36b1c4", roughness: 0.32 }));
  cup.position.set(x, -10, 120); base.add(cup);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(19, 28, 16), new THREE.MeshStandardMaterial({ name: "White caster ball", color: "#e7e4d7", roughness: 0.27 }));
  ball.position.set(x, -17, 120); base.add(ball);
}
for (const side of [-1, 1]) {
  const wheel = unit(side < 0 ? "08_Left_drive" : "09_Right_drive", [side * 185, -45, 0], [0, 0, side * 0.12]);
  part(wheel, "41896c01", [side * 108, 40, -60], [0, pi / 2, 0], grey);
  axle(wheel, "32073", [side * 97, 40, -60], [1, 0, 0]);
}

// Photo 5/6 attachment cassette: retain bearings, gears and shafts as one connected unit.
const tool = unit("10_Attachment", [0, 340, -65], [-0.06, 0.02, 0]);
// The windows belong to the removable attachment, not the striped robot base.
for (const panel of [...units]) {
  if (panel === tool) continue;
  for (const object of [...panel.children]) if (object.userData.cage) tool.add(object);
}
for (const x of [-185, 185]) {
  for (const y of [20, 140]) {
    beam(tool, "32278", [x, y, 20], [0, 0, 1], [0, 1, 0], y === 20 ? yellow : black);
    beam(tool, "32523", [x, y, -160], [0, 0, 1], [0, 1, 0], y === 20 ? yellow : black);
  }
  for (const z of [-180, 160]) {
    pin(tool, [x, 122, z], [0, 1, 0]);
  }
}
for (const z of [-212, 192]) for (const x of [-70, 70]) {
  beam(tool, "32524", [x, 20, z], [1, 0, 0], [0, 1, 0], yellow);
  beam(tool, "32524", [x, 140, z], [1, 0, 0], [0, 1, 0], black);
}
for (const x of [-110, 110]) beam(tool, "32525", [x, 110, -130], [0, 0, 1], [0, 1, 0], black);
for (const z of [-230, -30]) beam(tool, "32525", [0, 130, z], [1, 0, 0], [0, 1, 0], yellow);
for (const x of [-20, 120]) {
  oriented(tool, "64179", [x, 160, -150], [0, 0, 1], [1, 0, 0], grey);
  for (const z of [-210, -90]) {
    beam(tool, "32523", [x, 145, z], [0, 1, 0], [1, 0, 0], black);
    pin(tool, [x, 140, z], [1, 0, 0]);
  }
}
// Two upright attachment motors remain in the base; the cage lifts off their keyed couplers.
for (const x of [-45, 45]) {
  part(drive, "54696", [x, 100, -150], [0, pi, 0]);
  axle(drive, "32073", [x, 151, -150], [0, 1, 0], yellow);
}
// Dark top deck encloses the motor cases; only output hubs and keyed shafts show.
for (const x of [-55, 55]) part(drive, "64179", [x, 155, -135], [0, 0, 0], black);
for (const z of [-55, -35, -15])
  for (const x of [-70, 70]) beam(drive, "32524", [x, 145, z], [1, 0, 0], [0, 1, 0], black);
// Supported right-angle input: vertical motor shaft -> bevel pair -> horizontal gear train.
axle(tool, "3706", [45, 180, -150], [0, 1, 0]);
part(tool, "32270", [45, 200, -150], [pi / 2, 0, 0], "#d0b988");
gear(tool, "32270", [65, 200, -150], pi / 12, "#d0b988");
// Both shaft axes pass through frame holes at y=120 and y=200; 80 LDU is the
// pitch-centre distance for 24T + 40T gears. No free-floating decorative gears.
axle(tool, "3707", [150, 120, -150], [1, 0, 0]);
axle(tool, "3707", [60, 200, -150], [1, 0, 0]);
gear(tool, "3648", [90, 120, -150], pi / 24, "#d0b988");
gear(tool, "3649", [90, 200, -150], 0, grey);
gear(tool, "3648", [210, 120, -150], pi / 24, grey);
for (const [x, y] of [[-27, 200], [137, 200], [137, 120], [224, 120]])
  part(tool, "3713", [x, y, -150], [0, pi / 2, 0], grey);
// Visible keyed output and crank on the far side of the upper bearing.
beam(tool, "32523", [-42, 200, -150], [0, 0, 1], [1, 0, 0], black);
pin(tool, [-42, 200, -130], [1, 0, 0], yellow, "2780");
// Yellow side fork and linked supports seen alongside the long black arm.
for (const z of [-210, -90]) {
  beam(tool, "32524", [-185, 90, z], [1, 0, 0], [0, 1, 0], yellow);
  beam(tool, "32523", [-255, 60, z], [0, 1, 0], [1, 0, 0], black);
  pin(tool, [-120, 90, z], [0, 1, 0]);
}
beam(tool, "32524", [-255, 30, -150], [0, 0, 1], [0, 1, 0], yellow);
// The rack slides through a real-looking channel instead of hovering beside the drive gear.
for (const z of [-190, -70]) {
  beam(tool, "32523", [210, 49, z], [1, 0, 0], [0, 1, 0], black);
  for (const x of [190, 230]) pin(tool, [x, 74, z], [0, 1, 0], black, "2780");
}
const rack = unit("11_Rack_arm", [0, 55, -180], [0, -0.03, 0]);
beam(rack, "32525", [210, 70, -180], [0, 0, 1], [0, 1, 0], black);
beam(rack, "32524", [210, 70, -360], [0, 0, 1], [0, 1, 0], black);
// Four genuine rack elements sit directly under the 24T pinion (30 LDU pitch radius).
for (const z of [-110, -190, -270, -350]) part(rack, "3743", [210, 88, z], [0, pi / 2, 0], grey);
beam(rack, "32523", [210, 60, -410], [1, 0, 0], [0, 1, 0], yellow);
for (const z of [-80, -400]) pin(rack, [210, 75, z], [0, 1, 0]);

// Merge by material inside each animated unit, then index vertices for a compact payload.
const final = new THREE.Group();
final.name = root.name;
let triangles = 0;
for (const unit of units) {
  const merged = LDrawUtils.mergeObject(unit);
  merged.name = unit.name;
  merged.userData = unit.userData;
  merged.traverse((o) => {
    if (o.isMesh) {
      o.geometry = mergeVertices(o.geometry, 1e-4);
      triangles += o.geometry.index.count / 3;
      o.userData = {};
    }
  });
  final.add(merged);
}
final.userData = {
  description:
    "Visual concept inspired by ConnecTech reference photos. Not an exact or mechanically validated robot.",
  units: "LDraw units",
  credit: "/models/credits.txt",
};
const glb = await new GLTFExporter().parseAsync(final, {
  binary: true,
  onlyVisible: true,
});
fs.writeFileSync(path.join(output, "connectech-concept.glb"), Buffer.from(glb));
const credits = [
  "ConnecTech robot visual concept, September 2026",
  "Original arrangement and animation by ConnecTech website project.",
  "Inspired by team-supplied reference photos. Not a mechanically verified reconstruction.",
  "",
  "Geometry adapted from the LDraw.org Official Parts Library.",
  "Source: https://library.ldraw.org/",
  "Licensed under Creative Commons Attribution 4.0 (CC BY 4.0).",
  "https://creativecommons.org/licenses/by/4.0/",
  "Changes: assembled, recolored, smoothed, indexed and converted to glTF.",
  "LEGO is a trademark of the LEGO Group. This site is not endorsed by LEGO.",
  "",
  "Individual source files and authors:",
];
for (const file of [...accessed].sort()) {
  const text = fs.readFileSync(file, "utf8");
  const author =
    text.match(/^0 Author: (.*)$/m)?.[1]?.trim() || "LDraw contributors";
  const license =
    text.match(/^0 !LICENSE (.*)$/m)?.[1]?.trim() ||
    "LDraw color configuration";
  credits.push(`${path.relative(library, file)} | ${author} | ${license}`);
}
fs.writeFileSync(path.join(output, "credits.txt"), credits.join("\n") + "\n");
console.log(
  "Exported",
  units.length,
  "animated units,",
  triangles,
  "triangles,",
  (glb.byteLength / 1024 / 1024).toFixed(2),
  "MB",
);
