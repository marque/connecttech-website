import Link from "next/link";
import Image from "next/image";
import RobotExperience from "@/components/RobotExperience";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page} id="bioglow">
      <a className={styles.skip} href="#our-mission">
        Skip to our mission
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="ConnecTech home">
          <Image
            className={styles.brandLogo}
            src="/images/logo.png"
            width={58}
            height={60}
            alt=""
            priority
            sizes="58px"
          />
          <span>
            Connec<span className={styles.brandAccent}>Tech</span>
            <small>27757 / BAYVIEW GLEN</small>
          </span>
        </Link>
        <nav className={styles.seasons} aria-label="Explore our seasons">
          <Link href="/" aria-current="page">
            <span className={styles.liveDot} /> BIOGLOW{" "}
            <span className={styles.seasonYear}>26/27</span>
          </Link>
          <Link href="/unearthed">
            UNEARTHED <span className={styles.seasonYear}>25/26</span>{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <a href="#consult" className={styles.headerCta}>
          Build with us <span aria-hidden="true">↗</span>
        </a>
      </header>

      <RobotExperience />
      <div className={styles.sideIndex} aria-hidden="true">
        <span>CONNECTION IS OUR SUPERPOWER</span>
        <i />
        <span>BAYVIEW GLEN / TORONTO</span>
      </div>

      <section
        className={`${styles.chapter} ${styles.hero}`}
        aria-labelledby="hero-title"
        data-chapter="01"
      >
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.liveDot} /> CONNECTECH / A NEW SEASON
          </p>
          <h1 id="hero-title">
            Small bricks.
            <br />
            Bigger
            <br />
            <span className={styles.outline}>possibilities.</span>
          </h1>
          <p className={styles.intro}>
            We are ConnecTech. A team of curious minds building robots, opening
            doors, and making our next move together.
          </p>
          <a href="#our-mission" className={styles.explore}>
            Explore what connects us <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className={styles.heroFooter}>
          <span>BIOGLOW / 2026–27</span>
          <span className={styles.scrollCue}>
            <i /> SCROLL TO DISASSEMBLE
          </span>
          <span>BUILT WITH CURIOSITY.</span>
        </div>
      </section>

      <section
        id="our-mission"
        className={`${styles.chapter} ${styles.mission}`}
        aria-labelledby="mission-title"
        data-chapter="02"
      >
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span>01 / OPENING DOORS</span>
          </p>
          <h2 id="mission-title">
            More minds.
            <br />
            <em>More possible.</em>
          </h2>
          <p>
            Great ideas can come from anyone. We want more girls to see
            themselves in robotics, pick up the tools, and help shape what comes
            next.
          </p>
          <a
            className={styles.hashtag}
            href="https://firstlikeagirl.com/our-story/"
            target="_blank"
            rel="noreferrer"
          >
            #FIRSTLikeAGirl <span aria-hidden="true">↗</span>
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
          <div className={styles.statement}>
            <span aria-hidden="true">＋</span>
            <p>
              Different perspectives.
              <br />
              One extraordinary team.
            </p>
          </div>
        </div>
      </section>

      <section
        id="consult"
        className={`${styles.chapter} ${styles.consult}`}
        aria-labelledby="consult-title"
        data-chapter="03"
      >
        <div className={styles.copy}>
          <p className={styles.eyebrow}>02 / PASSING IT FORWARD</p>
          <h2 id="consult-title">
            Your first build.
            <br />
            <em>Our next connection.</em>
          </h2>
          <p>
            Starting a FIRST LEGO League team? We’ll share what we’ve learned,
            from your first brick to the competition table. Free guidance. A
            team in your corner.
          </p>
          <a
            className={styles.achievement}
            href="https://www.bayviewglen.ca/the-glen-spring-26-robotics/"
            target="_blank"
            rel="noreferrer"
          >
            2025–26 Ontario Provincial Champions ↗
            <span className={styles.srOnly}>
              {" "}
              (school report, opens in a new tab)
            </span>
          </a>
          <div className={styles.consultName}>
            <Image
              className={styles.consultLogo}
              src="/images/logo.png"
              width={44}
              height={46}
              alt=""
              sizes="44px"
            />
            <div>
              ConnecTech Consult<small>FREE GUIDANCE FOR NEW FLL TEAMS</small>
            </div>
          </div>
          <ul className={styles.topics}>
            <li>Build & code</li>
            <li>Teamwork</li>
            <li>Ideas & innovation</li>
          </ul>
          <div className={styles.comingSoon}>
            <span className={styles.liveDot} />
            <strong>Getting ready to connect</strong>
            <span>Details coming soon</span>
          </div>
          <p className={styles.contactNote}>
            Contact details are being confirmed.{" "}
            <span>consult@example.com</span> is a placeholder.
          </p>
        </div>
      </section>

      <section
        className={`${styles.chapter} ${styles.finale}`}
        aria-labelledby="finale-title"
        data-chapter="04"
      >
        <div className={styles.finaleCopy}>
          <p className={styles.eyebrow}>THE NEXT CHAPTER / BIOGLOW 2026–27</p>
          <h2 id="finale-title">
            Watch us
            <br />
            <em>come to life.</em>
          </h2>
          <p>
            A new challenge. A world of possibility.
            <br />
            Our BIOGLOW story is just beginning.
          </p>
          <Link href="/unearthed" className={styles.archiveLink}>
            Explore last season <span>UNEARTHED 25/26 ↗</span>
          </Link>
        </div>
      </section>
      <footer className={styles.footer}>
        <Link
          href="/"
          className={styles.footerBrand}
          aria-label="ConnecTech home"
        >
          <Image
            src="/images/logo.png"
            width={39}
            height={40}
            alt=""
            sizes="39px"
          />
          <span>
            ConnecTech <span className={styles.brandAccent}>27757</span>
            <small>BAYVIEW GLEN / TORONTO</small>
          </span>
        </Link>
        <span className={styles.footerNote}>Photo-inspired robot concept</span>
        <a href="/models/credits.txt" target="_blank" rel="noreferrer">
          3D credits ↗
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </footer>
    </main>
  );
}
