import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import RobotExperience from "@/components/RobotExperience";
import styles from "./page.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className={styles.page} id="bioglow">
      <a className={styles.skip} href="#introduction">Skip to content</a>
      <SiteHeader active="bioglow" />

      <section id="introduction" className={`${styles.chapter} ${styles.hero}`} aria-labelledby="hero-title" data-chapter="01">
        <div className={styles.heroContent}>
          <div className={`${styles.mobileRobot} ${styles.heroRobot}`}>
            <RobotExperience inline hero label="ConnecTech robot that separates and rebuilds as you scroll" />
          </div>
          <div className={styles.copy}>
            <h1 id="hero-title">Meet <span>ConnecTech.</span></h1>
            <p className={styles.lead}>
              We are Bayview Glen&apos;s FIRST LEGO League team 27757 in Toronto.
              We design, build and program robots together.
            </p>
          </div>
        </div>
      </section>

      <section id="first-like-a-girl" className={`${styles.chapter} ${styles.mission}`} aria-labelledby="mission-title" data-chapter="02">
        <div className={styles.copy}>
          <h2 id="mission-title" className={styles.campaignTitle}><span>#FIRST</span><span>Like</span><span>A</span><span>Girl</span></h2>
          <p className={styles.lead}>
            #FIRSTLikeAGirl celebrates girls and women in FIRST and encourages more girls
            to see themselves in robotics. ConnecTech is sharing that message through
            two workshops at the FIRST LEGO League Sunday kickoff.
          </p>
          <div className={styles.kickoff}>
            <h3>Join our workshop at the FLL Sunday kickoff</h3>
            <p><time dateTime="2026-09-27">Sunday, September 27, 2026</time> · Kickoff hours: 8:30 AM–4:00 PM</p>
            <p>Workshop sessions: 1:10–2:00 PM or 2:10–3:00 PM</p>
            <p>Bayview Glen School · 85 Moatfield Drive, North York</p>
          </div>
        </div>
        <a className={styles.campaignVisual} href="https://firstlikeagirl.com/boards/" target="_blank" rel="noreferrer" aria-label="See official FIRST Like a Girl event artwork (opens in a new tab)">
          <span className={styles.campaignBoard}>
            <Image src="/images/firstlikeagirl-mark.png" width={1200} height={153} alt="Official #FIRSTLikeAGirl campaign mark" sizes="(max-width: 700px) 88vw, 42vw" />
          </span>
        </a>
      </section>

      <section id="consult" className={`${styles.chapter} ${styles.consult}`} aria-labelledby="consult-title" data-chapter="03">
        <div className={styles.copy}>
          <h2 id="consult-title">ConnecTech Consult</h2>
          <p className={styles.lead}>
            Starting a FIRST LEGO League team? We share what we have learned
            with new teams, free of charge.
          </p>
          <ul className={styles.topics}>
            <li><strong>Build and code</strong><span>Questions about your robot and programs</span></li>
            <li><strong>Work as a team</strong><span>Ways to plan, test and learn together</span></li>
            <li><strong>Develop an idea</strong><span>Support for the innovation project</span></li>
          </ul>
          <a className={styles.achievement} href="https://www.bayviewglen.ca/the-glen-spring-26-robotics/" target="_blank" rel="noreferrer">
            Our 2025–26 Ontario Provincial Championship <ArrowIcon />
            <span className={styles.srOnly}> (school report, opens in a new tab)</span>
          </a>
          <a className={styles.consultAction} href="#stay-tuned">Contact ConnecTech <ArrowIcon /></a>
        </div>
        <div className={styles.consultVisual} aria-hidden="true">
          <div className={styles.consultVisualTrack} />
          <div className={`${styles.consultCard} ${styles.consultCardBuild}`}>
            <span className={styles.consultIcon}>
              <svg viewBox="0 0 64 64" fill="none"><path d="m32 8 22 12v24L32 56 10 44V20L32 8Z"/><path d="m10 20 22 12 22-12M32 32v24M22 26l22-12"/></svg>
            </span>
            <span>Build and code</span>
          </div>
          <div className={`${styles.consultCard} ${styles.consultCardTeam}`}>
            <span className={styles.consultIcon}>
              <svg viewBox="0 0 64 64" fill="none"><circle cx="22" cy="21" r="8"/><circle cx="43" cy="23" r="7"/><path d="M6 52c0-10 6-17 16-17s16 7 16 17M38 38c9-2 20 4 20 14"/></svg>
            </span>
            <span>Work as a team</span>
          </div>
          <div className={`${styles.consultCard} ${styles.consultCardIdea}`}>
            <span className={styles.consultIcon}>
              <svg viewBox="0 0 64 64" fill="none"><path d="M22 41c0-5-8-10-8-20a18 18 0 0 1 36 0c0 10-8 15-8 20H22ZM23 48h18M26 55h12M32 9v13m-8-4 8 8 8-8"/></svg>
            </span>
            <span>Develop an idea</span>
          </div>
        </div>
      </section>

      <section id="stay-tuned" className={`${styles.chapter} ${styles.finale}`} aria-labelledby="finale-title" data-chapter="04">
        <div className={styles.copy}>
          <h2 id="finale-title">Watch us <span>come to life.</span></h2>
          <p className={styles.lead}>Stay tuned for our BIOGLOW season. Follow along or send us a question.</p>
          <div className={styles.contactLinks}>
            <a href="mailto:connectech27757@gmail.com?subject=ConnecTech%20Consult">
              <MailIcon /><span><strong>Email us</strong><small>connectech27757@gmail.com</small></span><ArrowIcon />
            </a>
            <a href="https://www.instagram.com/connectech27757/" target="_blank" rel="noreferrer">
              <InstagramIcon /><span><strong>Instagram</strong><small>@connectech27757</small></span><ArrowIcon />
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/">ConnecTech 27757</Link>
        <span>Bayview Glen, Toronto</span>
      </footer>
    </main>
  );
}
