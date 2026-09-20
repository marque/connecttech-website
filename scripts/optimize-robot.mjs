import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, meshopt } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptDecoder } from "meshoptimizer";
import fs from "node:fs";
await MeshoptEncoder.ready;
await MeshoptDecoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    "meshopt.encoder": MeshoptEncoder,
    "meshopt.decoder": MeshoptDecoder,
  });
const file = "public/models/connectech-concept.glb";
const doc = await io.read(file);
await doc.transform(
  dedup(),
  prune(),
  meshopt({
    encoder: MeshoptEncoder,
    level: "high",
    quantizePosition: 14,
    quantizeNormal: 10,
  }),
);
await io.write(file, doc);
console.log(
  "Optimized model:",
  (fs.statSync(file).size / 1024 / 1024).toFixed(2),
  "MB",
);
