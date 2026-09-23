// Tests the exported triangles along the same reversible path used by the browser.
// Initial assembly contacts may withdraw, but must not re-enter after separation.
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
import * as THREE from "three";
import { MeshBVH } from "three-mesh-bvh";
import { robotSpread, robotUnitPose } from "../src/lib/robot-motion.ts";
import assert from "node:assert/strict";

await MeshoptDecoder.ready;
const doc = await new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.decoder": MeshoptDecoder })
  .read(process.argv[2] || "public/models/connectech-concept.glb");
const units = [];
for (const node of doc
  .getRoot()
  .listNodes()
  .filter((n) => n.getExtras().explosion)) {
  const positions = [],
    indices = [],
    point = new THREE.Vector3();
  node.traverse((child) => {
    const matrix = new THREE.Matrix4().fromArray(child.getWorldMatrix());
    for (const primitive of child.getMesh()?.listPrimitives() || []) {
      const attribute = primitive.getAttribute("POSITION"),
        index = primitive.getIndices();
      const start = positions.length / 3;
      for (let i = 0; i < attribute.getCount(); i++) {
        point.fromArray(attribute.getElement(i, [])).applyMatrix4(matrix);
        positions.push(point.x, point.y, point.z);
      }
      for (let i = 0; i < (index?.getCount() || attribute.getCount()); i++) {
        indices.push(start + (index ? index.getScalar(i) : i));
      }
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setIndex(indices);
  geometry.computeBoundingBox();
  geometry.boundsTree = new MeshBVH(geometry);
  const anchor = geometry.boundingBox.getCenter(new THREE.Vector3());
  units.push({
    name: node.getName(),
    ...node.getExtras(),
    geometry,
    anchor,
    matrix: new THREE.Matrix4(),
    bounds: new THREE.Box3(),
  });
}
const pairStates = new Map(),
  relative = new THREE.Matrix4();
assert.equal(units.length, 11, "All eleven moving assemblies must be checked.");
assert.equal(new Set(units.map((unit) => unit.name)).size, 11);
const steps = 200;
for (let step = 0; step <= steps; step++) {
  const progress = step / steps;
  for (const unit of units) {
    const { offset, rotation } = robotUnitPose(
      unit.name,
      progress,
      unit.explosion,
      unit.turn,
    );
    unit.matrix
      .compose(
        unit.anchor.clone().add(new THREE.Vector3(...offset).multiplyScalar(robotSpread(unit.name))),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
        new THREE.Vector3(1, 1, 1),
      )
      .multiply(
        new THREE.Matrix4().makeTranslation(
          ...unit.anchor.clone().negate().toArray(),
        ),
      );
    unit.bounds.copy(unit.geometry.boundingBox).applyMatrix4(unit.matrix);
  }
  for (let a = 0; a < units.length; a++)
    for (let b = a + 1; b < units.length; b++) {
      const left = units[a],
        right = units[b],
        key = `${left.name} / ${right.name}`;
      let intersects = false;
      if (left.bounds.intersectsBox(right.bounds)) {
        relative.copy(left.matrix).invert().multiply(right.matrix);
        intersects = left.geometry.boundsTree.intersectsGeometry(
          right.geometry,
          relative,
        );
      }
      if (step === 0)
        pairStates.set(key, {
          initial: intersects,
          separated: !intersects,
          hits: [],
          failures: [],
        });
      const state = pairStates.get(key);
      if (intersects) {
        state.hits.push(progress);
        if (state.separated || step === steps) state.failures.push(progress);
      } else state.separated = true;
    }
}
const ranges = (values) => (values.length ? [values[0], values.at(-1)] : []);
const report = [...pairStates]
  .filter(([, s]) => s.hits.length)
  .map(([pair, s]) => ({
    pair,
    initiallyTouching: s.initial,
    contactRange: ranges(s.hits),
    unexpectedContactRange: ranges(s.failures),
    unexpectedSamples: s.failures.length,
  }));
const failures = report.reduce((n, s) => n + s.unexpectedSamples, 0);
console.log(
  JSON.stringify(
    {
      assemblies: units.length,
      sampledPoses: steps + 1,
      unexpectedContacts: failures,
      pairs: report,
    },
    null,
    2,
  ),
);
if (failures) process.exitCode = 1;
