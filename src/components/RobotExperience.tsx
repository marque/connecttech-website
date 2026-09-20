"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./RobotExperience.module.css";

export default function RobotExperience() {
  const mount = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);
  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);
  useEffect(() => {
    if (!mount.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("@/lib/robot-scene")
      .then(async ({ createRobotScene }) => {
        if (disposed || !mount.current) return;
        cleanup = await createRobotScene(
          mount.current,
          () => pauseRef.current,
          (ok) => {
            if (!disposed) setStatus(ok ? "ready" : "fallback");
          },
        );
        if (disposed) cleanup();
      })
      .catch(() => {
        if (!disposed) setStatus("fallback");
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <>
      <div
        className={`${styles.stage} ${status === "fallback" ? styles.staticStage : ""}`}
        aria-hidden="true"
      >
        <div
          ref={mount}
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
          <i /> <span>CONCEPT / 001</span>
        </span>
        {status === "ready" && (
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Resume 3D motion" : "Pause 3D motion"}
            title={paused ? "Resume 3D motion" : "Pause 3D motion"}
          >
            {paused ? "▶" : "Ⅱ"}
            <span>{paused ? "RESUME" : "PAUSE"} MOTION</span>
          </button>
        )}
      </div>
    </>
  );
}
