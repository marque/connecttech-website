"use client";
import { useEffect, useRef, useState } from "react";
import type { RobotSceneHandle } from "@/lib/robot-scene";
import styles from "./RobotExperience.module.css";

export default function RobotExperience() {
  const mount = useRef<HTMLDivElement>(null);
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
    if (!mount.current) return;
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
  }, []);
  return (
    <>
      <div
        className={`${styles.stage} ${status === "fallback" ? styles.staticStage : ""}`}
      >
        <div
          ref={mount}
          role="group"
          aria-label="3D robot. Drag left or right to rotate, or use the left and right arrow keys when focused."
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
          <i /> <span>{manual ? "DRAG TO ROTATE · RELEASE TO SPIN" : "DRAG ROBOT TO ROTATE"}</span>
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
    </>
  );
}
