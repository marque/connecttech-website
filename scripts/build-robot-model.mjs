// Build an original visual concept from attributed LDraw geometry.
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
  "54675",
  "54696",
  "3648",
  "3649",
  "3706",
  "32526",
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
const base = unit("01_Chassis", [0, -120, 0]);
for (const x of [-100, 0, 100])
  part(base, "64179", [x, 0, 0], [0, 0, 0], black);
for (const z of [-140, 140])
  part(base, "32278", [0, 0, z], [0, pi / 2, 0], yellow);
for (const x of [-150, 150]) part(base, "32278", [x, 0, 0], [0, 0, 0], yellow);
// Four independently removable, layered protective panels echo the reference robot.
for (const side of [-1, 1]) {
  const wall = unit(
    side < 0 ? "02_Left_chassis" : "03_Right_chassis",
    [side * 180, 25, 0],
    [0, 0, side * 0.1],
  );
  for (let layer = 1; layer <= 7; layer++)
    part(
      wall,
      "32278",
      [side * 150, layer * 20, 0],
      [0, 0, 0],
      layer % 2 ? black : yellow,
    );
  for (const z of [-140, -100, 0, 100, 140])
    part(wall, "6558", [side * 150, 120, z], [0, 0, pi / 2], blue);
  const end = unit(
    side < 0 ? "04_Front_frame" : "05_Rear_frame",
    [0, 15, side * 175],
    [side * -0.08, 0, 0],
  );
  for (let layer = 1; layer <= 7; layer++)
    part(
      end,
      "32278",
      [0, layer * 20, side * 150],
      [0, pi / 2, 0],
      layer % 2 ? black : yellow,
    );
  for (const x of [-140, -100, -40, 40, 100, 140])
    part(end, "6558", [x, 120, side * 150], [0, 0, pi / 2], blue);
}
const hub = unit("06_SPIKE_hub", [0, 205, 45], [0.08, 0.08, 0]);
part(hub, "45601", [0, 105, 55], [0, pi / 2, 0]);
const led = new THREE.MeshStandardMaterial({
  name: "Concept LED pixels",
  color: "#e4ffc1",
  emissive: "#b5ef67",
  emissiveIntensity: 0.65,
  roughness: 0.4,
});
for (const [row, line] of [
  "01110",
  "11000",
  "11000",
  "11000",
  "01110",
].entries())
  for (let col = 0; col < 5; col++) {
    if (line[col] === "1") {
      const dot = new THREE.Mesh(new THREE.CircleGeometry(2.2, 12), led);
      dot.rotation.x = -pi / 2;
      dot.position.set((row - 2) * 15, 185.3, 55 + (col - 2) * 15);
      hub.add(dot);
    }
  }

const drive = unit("07_Motor_core", [0, 40, -10]);
for (const x of [-63, 63]) part(drive, "54675", [x, 92, 65], [0, 0, 0]);
for (const x of [-110, 110])
  part(drive, "32525", [x, 128, 0], [0, 0, 0], black);
for (const side of [-1, 1]) {
  const wheel = unit(
    side < 0 ? "08_Left_drive" : "09_Right_drive",
    [side * 215, -65, -20],
    [0, 0, side * 0.18],
  );
  part(wheel, "41896c01", [side * 105, 55, 20], [0, pi / 2, 0], grey);
  part(wheel, "3706", [side * 70, 55, 20], [0, 0, 0], grey);
}
const tool = unit("10_Attachment", [-50, 65, -80], [-0.13, 0, 0]);
const transmission = unit("11_Transmission", [20, 195, -165], [0.1, 0.08, 0]);
for (const x of [-80, 80]) {
  part(tool, "32524", [x, 155, -125], [0, 0, 0], black);
  part(tool, "32524", [x, 175, -125], [0, 0, 0], yellow);
  part(tool, "6558", [x, 157, -85], [0, 0, pi / 2], blue);
  part(tool, "32523", [x, 195, -145], [pi / 2, 0, 0], black);
}
part(tool, "64179", [0, 185, -95], [pi / 2, 0, 0], grey);
part(transmission, "3706", [0, 207, -100], [0, pi / 2, 0], grey);
part(transmission, "3649", [0, 207, -105], [0, 0, 0], grey);
part(transmission, "3648", [62, 170, -110], [0, 0, 0], black);
for (const x of [-40, 40])
  part(tool, "32525", [x, 150, -210], [0, 0, 0], black);
part(tool, "32525", [0, 150, -300], [0, pi / 2, 0], yellow);
for (const x of [-100, 100])
  part(tool, "6558", [x, 130, -300], [0, 0, pi / 2], blue);
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
