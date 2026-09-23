import Image from "next/image";
import Link from "next/link";
import SeasonNav from "./SeasonNav";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({
  active,
}: {
  active: "bioglow" | "unearthed";
}) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="ConnecTech home">
        <Image
          src="/images/brand/connectech-badge.png"
          width={52}
          height={52}
          alt=""
          priority
          sizes="(max-width: 700px) 38px, 52px"
        />
        <span>Connec<span>Tech</span></span>
      </Link>
      <SeasonNav active={active} />
    </header>
  );
}
