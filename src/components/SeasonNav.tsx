import Link from "next/link";
import styles from "./SeasonNav.module.css";

export default function SeasonNav({
  active,
}: {
  active: "bioglow" | "unearthed";
}) {
  return (
    <nav className={styles.bar} aria-label="Explore our seasons">
      <Link href="/" aria-current={active === "bioglow" ? "page" : undefined}>
        BIOGLOW <span className={styles.year}>26/27</span>
      </Link>
      <Link
        href="/unearthed"
        aria-current={active === "unearthed" ? "page" : undefined}
      >
        UNEARTHED <span className={styles.year}>25/26</span>
      </Link>
    </nav>
  );
}
