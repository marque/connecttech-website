# Robot visual proof

The rendered robot is an original concept inspired by ConnecTech's supplied photographs. It is not an exact reconstruction, mechanically validated assembly or competition-ready design. The photographs themselves are not included in the website.

The September 20 revision follows the attachment-equipped robot in the original photos 3–6 and the four additional underside/front/cage photos. The striped base is enclosed by a separate open attachment cage. The white hub sits within the black top fairings; four motors, recessed drive wheels, two white ball supports in azure housings, a supported gear train, axle bushes, a keyed input shaft, a rack-and-pinion arm and a yellow side fork are now represented. Electrical plugs/cables connect the hub area to the motor core. The precise hidden mounting and bevel-drive arrangement remain inferred. The hub supplies electrical power; motors drive the mechanical axles and gears.

Official LDraw parts provide the beams, frames, motors, hub, gears, axles and rack. The cable paths, plug shapes and ball-support housings are procedural approximations. Gears stay with the supported attachment during disassembly; the rack withdraws along its length first. These are presentation movements rather than a simulation of a working drivetrain.

## Rebuild

Download the ZIP including dependencies for each official LDraw part below, then merge/extract those archives into a local LDraw library directory. The ZIP pattern is `https://library.ldraw.org/library/official/parts/PART.zip`. Also download `https://library.ldraw.org/library/official/LDConfig.ldr` into the library root. Keep these downloaded inputs outside the deployed source directory.

Parts: `45601`, `32278`, `32525`, `32524`, `32523`, `64179`, `6558`, `2780`, `41896c01`, `54696`, `3648`, `3649`, `3706`, `11954`, `3743`, `3713`, `3707`, `32073`, `32270`.

Run from the repository root:

```sh
npm ci
node scripts/build-robot-model.mjs /absolute/path/to/ldraw/library
node scripts/optimize-robot.mjs
npm run check:robot
```

The first script builds eleven independently movable groups, merges geometry by material, indexes vertices and exports glTF. The second compresses it using Meshopt. Runtime decoding uses the decoder bundled with Three.js. Generated output is `public/models/connectech-concept.glb`, approximately 3.16 MiB, with 673,526 triangles. Preserve the extras on the assembly groups because they contain explosion offsets and rotations.

`public/models/credits.txt` records the accessed source files, authors, licenses and modifications. LDraw geometry is reused under CC BY 4.0, including attribution. 

## Runtime

`src/lib/robot-scene.ts` provides lazy-loaded Three.js rendering, studio reflections, shadows, desktop ambient occlusion, native-scroll poses and resource cleanup. Phone rendering uses a smaller composition and skips the ambient-occlusion pass. The whole robot continues a slow 40-second revolution while the page is visible, including when scrolling stops. Dragging the robot switches to a manual heading and tilt, holds that view after release and exposes Resume spin. Arrow keys offer the same control when the model is focused. Only hits on the robot start a drag; vertical touch scrolling and pinch zoom are retained. Manual viewing continues to respond to the scroll-driven assembly sequence. Pointer capture is released on completion, cancellation, tab hiding and cleanup. The turntable pauses with the motion button and stops while the document is hidden. Reduced-motion preferences disable automatic rotation. Reduced-motion users see an assembled model with section placement changes. The motion button freezes the articulated pose. Section placement still changes discretely while paused to keep the text readable.

`src/lib/robot-motion.ts` defines a reversible staged extraction path: withdraw the rack arm from its guides, lift the attachment cage and then the hub, clear the outer panels, withdraw the wheel axles, then tilt the separated assemblies around their own centres. The chassis lowers slightly and the shadow floor follows its clearance.

`npm run check:robot` uses Node.js 22.18+ (native TypeScript support). The surface check rejects overlapping same-facing, axis-aligned black/yellow faces in the compressed asset. The mesh-BVH check samples 201 poses using the runtime path and checks triangles between all eleven assemblies. Initial shaft/socket contacts may withdraw; new intersections, re-entry after separation and contacts at the fully separated pose fail. This is sampled visual clearance, not continuous collision detection or mechanical validation.

The HTML remains readable before JavaScript loads. A quiet CSS motif covers loading and WebGL failure. `/unearthed` retains the original season site. External campaign and school links are real. ConnecTech Consult invites questions through the user-confirmed public team address `connectech27757@gmail.com`, linked with `mailto:`.

## Review deployment

Use the separately linked `tossww/connectech-bioglow-preview` review project, following the parent website handoff README. Do not deploy this feature branch to the existing live domain or push without user instruction.

## Brand treatment

BIOGLOW uses a cleaned high-resolution version of Steven's latest circular ConnecTech badge. The header and Consult use a simplified chain mark beside live team text; the footer uses the complete badge with CONNECTECH and 27757. See `BRAND-ASSETS.md` for provenance and exact generation prompts. ConnecTech yellow `#f5c518` is the primary interface accent, with charcoal, warm white and restrained BIOGLOW green. The season archive retains the original `/images/logo.png` and its existing styling.
