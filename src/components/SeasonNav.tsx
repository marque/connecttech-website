import Link from "next/link";
import styles from "./SeasonNav.module.css";

export default function SeasonNav({
  active,
}: {
  active: "bioglow" | "unearthed";
}) {
  return (
    <nav className={styles.bar} aria-label="Explore our seasons">
      <div className={styles.inner}>
        <span className={styles.label}>OUR SEASONS</span>
        <div className={styles.tabs}>
          <Link
            href="/"
            aria-current={active === "bioglow" ? "page" : undefined}
          >
            <span className={styles.dot} /> BIOGLOW{" "}
            <span className={styles.year}>2026–27</span>
          </Link>
          <Link
            href="/unearthed"
            aria-current={active === "unearthed" ? "page" : undefined}
          >
            UNEARTHED <span className={styles.year}>2025–26</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
