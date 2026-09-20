// Reject overlapping, equally oriented black/yellow planar faces in the exported asset.
// These surfaces compete in the depth buffer and visibly flicker as the camera moves.
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
await MeshoptDecoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.decoder": MeshoptDecoder });
const doc = await io.read(
  process.argv[2] || "public/models/connectech-concept.glb",
);
const buckets = new Map();
function area(poly) {
  return (
    Math.abs(
      poly.reduce((sum, p, i) => {
        const q = poly[(i + 1) % poly.length];
        return sum + p[0] * q[1] - p[1] * q[0];
      }, 0),
    ) / 2
  );
}
function cross(a, b, p) {
  return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
}
function intersection(subject, clip) {
  const orientation = Math.sign(cross(clip[0], clip[1], clip[2]));
  let out = subject;
  for (let i = 0; i < 3; i++) {
    const a = clip[i],
      b = clip[(i + 1) % 3],
      input = out;
    out = [];
    if (!input.length) break;
    for (let j = 0; j < input.length; j++) {
      const p = input[j],
        q = input[(j + 1) % input.length],
        dp = cross(a, b, p) * orientation,
        dq = cross(a, b, q) * orientation;
      if (dp >= 0) out.push(p);
      if (dp >= 0 !== dq >= 0) {
        const t = dp / (dp - dq);
        out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
      }
    }
  }
  return out.length >= 3 ? area(out) : 0;
}
function triangle(node, pos, indices, i) {
  const m = node.getWorldMatrix(),
    pts = [];
  for (let c = 0; c < 3; c++) {
    const v = pos.getElement(indices ? indices.getScalar(i + c) : i + c, []);
    pts.push([
      m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12],
      m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13],
      m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14],
    ]);
  }
  return pts;
}
for (const node of doc.getRoot().listNodes()) {
  if (!node.getMesh()) continue;
  let parent = node,
    assembly = node.getName();
  while (parent) {
    if (parent.getExtras().explosion) assembly = parent.getName();
    parent = parent.getParentNode();
  }
  for (const primitive of node.getMesh().listPrimitives()) {
    const rgb = primitive.getMaterial()?.getBaseColorFactor();
    if (!rgb) continue;
    const color = rgb.slice(0, 3).every((v) => v < 0.03)
      ? "black"
      : rgb[0] > 0.3 && rgb[1] > 0.2 && rgb[2] < 0.04
        ? "yellow"
        : null;
    if (!color) continue;
    const pos = primitive.getAttribute("POSITION"),
      idx = primitive.getIndices(),
      count = idx ? idx.getCount() : pos.getCount();
    for (let i = 0; i < count; i += 3) {
      const t = triangle(node, pos, idx, i),
        u = t[1].map((v, k) => v - t[0][k]),
        v = t[2].map((v, k) => v - t[0][k]);
      const n = [
          u[1] * v[2] - u[2] * v[1],
          u[2] * v[0] - u[0] * v[2],
          u[0] * v[1] - u[1] * v[0],
        ],
        length = Math.hypot(...n);
      if (length < 1e-5) continue;
      const axis = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs)));
      if (Math.abs(n[axis]) / length < 0.999999) continue;
      const key = `${axis}/${Math.sign(n[axis])}/${Math.round(t[0][axis] * 10)}`,
        poly = t.map((p) => p.filter((_, k) => k !== axis));
      const item = {
        color,
        assembly,
        poly,
        bounds: [
          Math.min(...poly.map((p) => p[0])),
          Math.min(...poly.map((p) => p[1])),
          Math.max(...poly.map((p) => p[0])),
          Math.max(...poly.map((p) => p[1])),
        ],
      };
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(item);
    }
  }
}
const reports = [];
for (const [plane, triangles] of buckets) {
  const blacks = triangles.filter((t) => t.color === "black"),
    yellows = triangles.filter((t) => t.color === "yellow");
  for (const a of blacks)
    for (const b of yellows) {
      if (
        a.bounds[2] <= b.bounds[0] ||
        b.bounds[2] <= a.bounds[0] ||
        a.bounds[3] <= b.bounds[1] ||
        b.bounds[3] <= a.bounds[1]
      )
        continue;
      const overlap = intersection(a.poly, b.poly);
      if (overlap > 0.05)
        reports.push({
          plane,
          black: a.assembly,
          yellow: b.assembly,
          area: Number(overlap.toFixed(2)),
        });
    }
}
const grouped = {};
for (const r of reports) {
  const key = `${r.black} / ${r.yellow} @ ${r.plane}`;
  grouped[key] = (grouped[key] || 0) + 1;
}
console.log(
  JSON.stringify(
    { overlappingTriangles: reports.length, groups: grouped },
    null,
    2,
  ),
);
if (reports.length) process.exitCode = 1;
