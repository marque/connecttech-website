type Triple = readonly [number, number, number];

/** Keep the hub clear of the attachment while tightening other movements. */
export const robotSpread = (name: string) =>
  ["06_SPIKE_hub", "10_Attachment", "10_Top_deck"].includes(name) ? 1 : 0.8;

const smooth = (from: number, to: number, progress: number) => {
  const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

/** One reversible extraction path, shared by the renderer and mesh clearance check. */
export function robotUnitPose(
  name: string,
  progress: number,
  explosion: Triple,
  turn: Triple,
) {
  let offset: [number, number, number];
  const tilt = smooth(0.9, 1, progress);
  if (name === "10_Top_deck") {
    const lift = smooth(0.32, 0.5, progress);
    const spread = smooth(0.52, 0.7, progress);
    offset = [explosion[0] * spread, explosion[1] * lift, explosion[2] * spread];
  } else if (name === "11_Rear_castors") {
    const drop = smooth(0.1, 0.3, progress);
    const spread = smooth(0.52, 0.7, progress);
    offset = [0, explosion[1] * drop, explosion[2] * spread];
  } else if (name === "11_Rack_arm") {
    // Slide the rack out of its guides before removing the surrounding cassette.
    const withdraw = smooth(0, 0.18, progress);
    const lift = smooth(0.2, 0.4, progress);
    offset = [
      explosion[0] * lift,
      explosion[1] * lift,
      explosion[2] * withdraw,
    ];
  } else if (name === "06_SPIKE_hub" || name === "10_Attachment") {
    const lift =
      name === "06_SPIKE_hub"
        ? smooth(0.05, 0.25, progress)
        : smooth(0.18, 0.38, progress);
    const spread = smooth(0.5, 0.8, progress);
    offset = [
      explosion[0] * spread,
      explosion[1] * lift,
      explosion[2] * spread,
    ];
  } else if (name.includes("chassis") || name.includes("frame")) {
    // Clear the enclosure before the wheel and motor assemblies move.
    const spread = smooth(0.52, 0.7, progress);
    const lift = smooth(0.72, 0.84, progress);
    offset = [
      explosion[0] * spread,
      explosion[1] * lift,
      explosion[2] * spread,
    ];
  } else if (name === "01_Chassis") {
    offset = [0, explosion[1] * smooth(0.4, 0.6, progress), 0];
  } else if (name === "08_Left_drive" || name === "09_Right_drive") {
    // Pull axles straight out of their sockets, then lower and tilt the wheels.
    offset = [
      explosion[0] * smooth(0.6, 0.78, progress),
      explosion[1] * smooth(0.8, 0.9, progress),
      0,
    ];
  } else {
    const spread = smooth(0.8, 0.9, progress);
    offset = explosion.map((value) => value * spread) as [
      number,
      number,
      number,
    ];
  }
  return {
    offset,
    rotation: turn.map((value) => value * tilt) as [number, number, number],
  };
}
