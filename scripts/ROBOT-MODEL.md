# Robot visual proof

The rendered robot is an original concept inspired by ConnecTech's supplied photographs. It is not an exact reconstruction, mechanically validated assembly or competition-ready design. The photographs themselves are not included in the website.

## Rebuild

Download the ZIP including dependencies for each official LDraw part below, then merge/extract those archives into a local LDraw library directory. The ZIP pattern is `https://library.ldraw.org/library/official/parts/PART.zip`. Also download `https://library.ldraw.org/library/official/LDConfig.ldr` into the library root. Keep these downloaded inputs outside the deployed source directory.

Parts: `45601`, `32278`, `32525`, `32524`, `32523`, `64179`, `6558`, `2780`, `41896c01`, `54675`, `54696`, `3648`, `3649`, `3706`, `32526`.

Run from the repository root:

```sh
npm ci
node scripts/build-robot-model.mjs /absolute/path/to/ldraw/library
node scripts/optimize-robot.mjs
```

The first script builds eleven independently movable groups, merges geometry by material, indexes vertices and exports glTF. The second compresses it using Meshopt. Runtime decoding uses the decoder bundled with Three.js. Generated output is `public/models/connectech-concept.glb`, approximately 1.6 MB, with 413,520 triangles. Preserve the extras on the assembly groups because they contain explosion offsets and rotations.

`public/models/credits.txt` records the accessed source files, authors, licenses and modifications. LDraw geometry is reused under CC BY 4.0, including attribution. 

## Runtime

`src/lib/robot-scene.ts` provides lazy-loaded Three.js rendering, studio reflections, shadows, desktop ambient occlusion, native-scroll poses and resource cleanup. Phone rendering uses a smaller composition and skips the ambient-occlusion pass. Rendering stops when the pose is still or the document is hidden. Reduced-motion users see an assembled model with section placement changes. The motion button freezes the current pose, including during scrolling.

The HTML remains readable before JavaScript loads. A quiet CSS motif covers loading and WebGL failure. `/unearthed` retains the original season site. External campaign and school links are real; the consultation email is visibly a placeholder with no send action.

## Review deployment

Use the separately linked `tossww/connectech-bioglow-preview` review project, following the parent website handoff README. Do not deploy this feature branch to the existing live domain or push without user instruction.
