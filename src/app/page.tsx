import Link from "next/link";
import Image from "next/image";
import SeasonNav from "@/components/SeasonNav";
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
            src="/images/brand/connectech-badge.png"
            width={58}
            height={58}
            alt=""
            priority
            sizes="(max-width: 700px) 42px, 58px"
          />
          <span>
            Connec<span className={styles.brandAccent}>Tech</span>
            <small>27757 / BAYVIEW GLEN</small>
          </span>
        </Link>
        <SeasonNav active="bioglow" />
        <a href="#consult" className={styles.headerCta}>
          Build with us <span aria-hidden="true">↗</span>
        </a>
      </header>

      <RobotExperience />

      <section
        className={`${styles.chapter} ${styles.hero}`}
        aria-labelledby="hero-title"
        data-chapter="01"
      >
        <div className={styles.copy}>
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
        </div>
        <div className={styles.mobileRobot}>
          <RobotExperience inline label="ConnecTech robot that separates and rebuilds as you scroll" />
        </div>
      </section>

      <section
        id="our-mission"
        className={`${styles.chapter} ${styles.mission}`}
        aria-labelledby="mission-title"
        data-chapter="02"
      >
        <div className={styles.copy}>
          <span className={styles.sectionLabel}>01 / OPENING DOORS</span>
          <h2 id="mission-title" className={styles.campaignBanner}>
            <a href="https://firstlikeagirl.com/boards/" target="_blank" rel="noreferrer">
              <Image
                src="/images/firstlikeagirl-mark.png"
                width={1200}
                height={153}
                alt="Official #FIRSTLikeAGirl campaign mark"
                sizes="(max-width: 700px) 88vw, (max-width: 1200px) 48vw, 600px"
              />
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </h2>
          <p className={styles.sectionLead}>
            #FIRSTLikeAGirl celebrates girls and women in FIRST and encourages
            more girls to see themselves in robotics. ConnecTech is sharing that
            message through two workshops at the FIRST LEGO League Sunday kickoff.
          </p>
          <div className={styles.kickoff}>
            <h3>Join our workshop at the FLL Sunday kickoff</h3>
            <p><time dateTime="2026-09-27">Sunday, September 27, 2026</time> · Kickoff hours: 8:30 AM–4:00 PM</p>
            <p>Workshop sessions: 1:10–2:00 PM or 2:10–3:00 PM</p>
            <p>Bayview Glen School · 85 Moatfield Drive, North York</p>
          </div>
        </div>
        <div className={styles.mobileRobot}>
          <RobotExperience inline label="ConnecTech robot that separates and rebuilds as you scroll" />
        </div>
      </section>

      <section
        id="consult"
        className={`${styles.chapter} ${styles.consult}`}
        aria-labelledby="consult-title"
        data-chapter="03"
      >
        <div className={styles.copy}>
          <span className={styles.sectionLabel}>02 / PASSING IT FORWARD</span>
          <div className={styles.consultBanner}>
            <div className={styles.consultBannerText}>
              <span>FREE GUIDANCE / NEW FLL TEAMS</span>
              <h2 id="consult-title">ConnecTech <em>Consult</em></h2>
            </div>
            <Image
              className={styles.consultMark}
              src="/images/brand/connectech-mark.png"
              width={180}
              height={180}
              alt=""
              sizes="(max-width: 700px) 100px, 160px"
            />
          </div>
          <p className={styles.sectionLead}>
            Starting a FIRST LEGO League team? We share what we have learned
            with new teams, free of charge.
          </p>
          <ul className={styles.consultTopics}>
            <li>
              <span>01</span>
              <div>
                <h3>Build and code</h3>
                <p>Talk through robot design, programming and testing questions.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Work as a team</h3>
                <p>Find ways to plan, share roles and learn from each test.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Develop an idea</h3>
                <p>Shape and present your innovation project with confidence.</p>
              </div>
            </li>
          </ul>
          <a
            className={styles.achievement}
            href="https://www.bayviewglen.ca/the-glen-spring-26-robotics/"
            target="_blank"
            rel="noreferrer"
          >
            Our 2025–26 Ontario Provincial Championship <span aria-hidden="true">↗</span>
            <span className={styles.srOnly}>
              {" "}
              (school report, opens in a new tab)
            </span>
          </a>
          <a
            className={styles.consultAction}
            href="mailto:connectech27757@gmail.com?subject=ConnecTech%20Consult"
          >
            <span>Contact ConnecTech</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.mobileRobot}>
          <RobotExperience inline label="ConnecTech robot that separates and rebuilds as you scroll" />
        </div>
      </section>

      <footer className={styles.footer}>
        <Link
          href="/"
          className={styles.footerBrand}
          aria-label="ConnecTech home"
        >
          <Image
            src="/images/brand/connectech-badge.png"
            width={56}
            height={56}
            alt=""
            sizes="56px"
          />
          <span>
            ConnecTech <span className={styles.brandAccent}>27757</span>
            <small>BAYVIEW GLEN / TORONTO</small>
          </span>
        </Link>
      </footer>
    </main>
  );
}
