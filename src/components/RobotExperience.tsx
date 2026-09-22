"use client";
import { useEffect, useRef, useState } from "react";
import type { RobotSceneHandle } from "@/lib/robot-scene";
import styles from "./RobotExperience.module.css";

export default function RobotExperience({
  inline = false,
  label = "Explore the robot",
}: {
  inline?: boolean;
  label?: string;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const scene = useRef<RobotSceneHandle | null>(null);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);
  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);
  useEffect(() => {
    if (!stage.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearby(entry.isIntersecting),
      { rootMargin: inline ? "240px 0px" : "0px" },
    );
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [inline]);
  useEffect(() => {
    if (!nearby || !mount.current) return;
    setStatus("loading");
    let disposed = false;
    let handle: RobotSceneHandle | undefined;
    import("@/lib/robot-scene")
      .then(async ({ createRobotScene }) => {
        if (disposed || !mount.current) return;
        handle = await createRobotScene(
          mount.current,
          () => pauseRef.current,
          (ok) => {
            if (!disposed) setStatus(ok ? "ready" : "fallback");
          },
          (isManual) => {
            if (!disposed) setManual(isManual);
          },
          inline ? { scrollLinked: true } : undefined,
        );
        if (disposed) handle.dispose();
        else scene.current = handle;
      })
      .catch(() => {
        if (!disposed) setStatus("fallback");
      });
    return () => {
      disposed = true;
      handle?.dispose();
      scene.current = null;
    };
  }, [inline, nearby]);
  return (
    <div className={inline ? styles.inlineExperience : styles.desktopExperience}>
      <div
        ref={stage}
        className={`${styles.stage} ${inline ? styles.inlineStage : ""} ${status === "fallback" ? styles.staticStage : ""}`}
      >
        <div
          ref={mount}
          role="group"
          aria-label={`${label}. Drag left or right to rotate, or use the left and right arrow keys when focused.`}
          tabIndex={status === "ready" ? 0 : -1}
          onKeyDown={(event) => {
            const arrows: Record<string, number> = {
              ArrowLeft: -24, ArrowRight: 24,
            };
            const movement = arrows[event.key];
            if (movement) {
              event.preventDefault();
              scene.current?.rotateBy(movement);
            }
          }}
          onKeyUp={(event) => {
            if (["ArrowLeft", "ArrowRight"].includes(event.key))
              scene.current?.endInteraction();
          }}
          onBlur={() => scene.current?.endInteraction()}
          className={`${styles.canvas} ${status === "ready" ? styles.loaded : ""}`}
        />
        {status !== "ready" && (
          <div className={styles.loading}>
            <span className={styles.loadingOrb} />
            <span>
              {status === "loading"
                ? "ASSEMBLING THE POSSIBILITIES"
                : "CONNECTION. CURIOSITY. POSSIBILITY."}
            </span>
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <span className={styles.sceneLabel}>
          <i /> <span>{manual ? "RELEASE TO SPIN" : inline ? "SCROLL TO SEPARATE / REBUILD" : "DRAG ANYWHERE TO ROTATE"}</span>
        </span>
        {status === "ready" && (
          <button
            onClick={() => {
              pauseRef.current = !paused;
              setPaused(!paused);
            }}
            aria-pressed={paused}
            aria-label={paused ? "Resume 3D motion" : "Pause 3D motion"}
            title={paused ? "Resume 3D motion" : "Pause 3D motion"}
          >
            {paused ? "▶" : "Ⅱ"}
            <span>{paused ? "RESUME MOTION" : "PAUSE MOTION"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
