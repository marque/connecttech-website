import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import SeasonNav from "@/components/SeasonNav";
import styles from "./page.module.css";

const kickoffRegistration =
  "https://docs.google.com/forms/d/e/1FAIpQLScMPqE1lw1kiJOfk57a5hwf0D9uxwM9BbRRx8pWn6GvHUWykA/viewform";
const kickoffProgram =
  "https://drive.google.com/file/d/1KtDkH65OZyGhHEnbr2iO9iiMK196pZGH/view";
const schoolRecap = "https://www.bayviewglen.ca/the-glen-spring-26-robotics/";

const teammates = [
  {
    name: "Emma",
    role: "Chief Brick Clicker",
    color: "#d59cd6",
    hat: "#833d7c",
  },
  { name: "Grace", role: "Gear Whisperer", color: "#c6de94", hat: "#2c5535" },
  {
    name: "Jacob",
    role: "Director of Stud-ies",
    color: "#f0e973",
    hat: "#a74c29",
  },
  { name: "Kevin", role: "Axle Alchemist", color: "#abd9e6", hat: "#24677d" },
  {
    name: "Neel",
    role: "Master of the Missing Piece",
    color: "#e9b69a",
    hat: "#8f432f",
  },
  {
    name: "Salima",
    role: "Snap-Fit Scientist",
    color: "#bdb6e8",
    hat: "#5d518c",
  },
  {
    name: "Tessa",
    role: "Captain of Creative Chaos",
    color: "#b4decc",
    hat: "#387c62",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function BrickGarden() {
  return (
    <div
      className={styles.garden}
      role="img"
      aria-label="A playful garden of flowers and leaves growing from building bricks"
    >
      <div className={styles.gardenLabel}>
        <span /> IDEAS ARE GROWING HERE
      </div>
      <svg
        className={styles.gardenArt}
        viewBox="0 0 560 490"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="280"
          cy="230"
          r="173"
          stroke="#719777"
          strokeDasharray="3 9"
        />
        <circle cx="280" cy="230" r="124" stroke="#527559" />
        <path d="M72 376H491" stroke="#719777" />
        <g className={styles.stem}>
          <path
            d="M276 336V142M276 268L205 208M276 223L340 178"
            stroke="#C6DE94"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M264 257C216 270 178 244 182 202C229 188 267 212 264 257Z"
            fill="#70A334"
          />
          <path
            d="M289 212C287 171 318 145 355 151C367 192 334 221 289 212Z"
            fill="#C6DE94"
          />
          <path
            d="M194 213L248 250M300 204L341 166"
            stroke="#2C5535"
            strokeWidth="3"
          />
          <g transform="translate(276 122)">
            <rect
              x="-23"
              y="-63"
              width="46"
              height="126"
              rx="23"
              fill="#F0E973"
            />
            <rect
              x="-63"
              y="-23"
              width="126"
              height="46"
              rx="23"
              fill="#F0E973"
            />
            <circle r="27" fill="#D59CD6" stroke="#183D2B" strokeWidth="7" />
            <circle r="9" fill="#183D2B" />
          </g>
        </g>
        <g transform="translate(366 260)">
          <path d="M0 72V0" stroke="#C6DE94" strokeWidth="9" />
          <path d="M4 37C27 13 50 18 51 29C44 50 20 54 4 45" fill="#70A334" />
          <path
            d="M0 0C-46 10-39-37-19-32C-36-58 9-66 10-38C34-61 62-23 33-10C64 9 19 35 8 7C-10 33-43 11-21-5"
            fill="#D59CD6"
          />
          <circle cx="7" cy="-13" r="13" fill="#F0E973" />
        </g>
        <g transform="translate(181 300)">
          <path d="M0 42V-4" stroke="#C6DE94" strokeWidth="8" />
          <path d="M-4 20C-41 26-49 1-39-10C-12-13 0 2-4 20" fill="#C6DE94" />
          <circle cy="-18" r="26" fill="#EAA77E" />
          <circle cy="-18" r="11" fill="#183D2B" />
        </g>
        <path d="M147 342L358 342L404 367L193 367Z" fill="#F7F29D" />
        <path d="M147 342V396L193 423V367Z" fill="#ACA73E" />
        <path d="M193 367H404V423H193Z" fill="#F0E973" />
        <g fill="#F0E973" stroke="#ADA947" strokeWidth="2">
          <ellipse cx="185" cy="338" rx="18" ry="9" />
          <ellipse cx="243" cy="338" rx="18" ry="9" />
          <ellipse cx="301" cy="338" rx="18" ry="9" />
          <ellipse cx="359" cy="350" rx="18" ry="9" />
        </g>
        <path d="M305 400L399 400L430 419L336 419Z" fill="#E8C4E9" />
        <path d="M305 400V435L336 454V419Z" fill="#976598" />
        <path d="M336 419H430V454H336Z" fill="#D59CD6" />
        <ellipse cx="331" cy="397" rx="15" ry="7" fill="#D59CD6" />
        <ellipse cx="380" cy="397" rx="15" ry="7" fill="#D59CD6" />
        <g transform="translate(402 111) rotate(20)">
          <ellipse cx="-7" cy="-15" rx="12" ry="18" fill="#DCECCB" />
          <ellipse cx="12" cy="-15" rx="12" ry="18" fill="#C6DE94" />
          <rect x="-18" y="-5" width="45" height="25" rx="12" fill="#F0E973" />
          <path d="M0-4V19M11-3V18" stroke="#183D2B" strokeWidth="6" />
          <circle cx="22" cy="4" r="3" fill="#183D2B" />
        </g>
        <path
          d="M107 155V174M97 164H116M431 303V322M422 312H441"
          stroke="#F0E973"
          strokeWidth="2"
        />
        <circle cx="126" cy="284" r="4" fill="#D59CD6" />
        <circle cx="429" cy="220" r="4" fill="#C6DE94" />
      </svg>
      <div className={styles.gardenBottom}>
        <span>DISCOVER. BUILD. BELONG.</span>
        <span>01 / A NEW CHAPTER</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <SeasonNav active="bioglow" />
        <div className={styles.navbar}>
          <Link href="/" className={styles.brand} aria-label="ConnecTech home">
            <Image
              src="/images/logo.png"
              width={48}
              height={48}
              alt=""
              priority
            />
            <span>
              ConnecTech<small>TEAM #27757 · BAYVIEW GLEN</small>
            </span>
          </Link>
          <nav className={styles.links} aria-label="Main navigation">
            <a href="#season">Our season</a>
            <a href="#team">The team</a>
            <a href="#community">Giving back</a>
            <a href="#kickoff" className={styles.navCta}>
              Meet us at kickoff <Arrow />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section
          className={`${styles.wrap} ${styles.hero}`}
          aria-labelledby="hero-heading"
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.statusDot} /> BIOGLOW™ / 2026–27
            </p>
            <h1 id="hero-heading">
              Small bricks.
              <br />
              Big <span>possibilities.</span>
            </h1>
            <p className={styles.intro}>
              Seven curious minds. One connected team. We’re exploring
              biodiversity, building robots, and finding our own way to make a
              difference.
            </p>
            <div className={styles.actions}>
              <a className={styles.button} href="#season">
                Explore our new season <Arrow />
              </a>
              <a className={styles.textLink} href="#team">
                Meet the team <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.heroNote}>
              <span className={styles.tinyBrick} aria-hidden="true" /> Our next
              big idea is under construction. Stay curious.
            </p>
          </div>
          <BrickGarden />
        </section>
        <div className={styles.values} aria-label="Our values">
          <span>Curiosity in every question.</span>
          <span>Teamwork in every build.</span>
          <span>Community in everything.</span>
        </div>
        <section
          id="kickoff"
          className={`${styles.wrap} ${styles.kickoff}`}
          aria-labelledby="kickoff-heading"
        >
          <div className={styles.dateBlock}>
            <span>SUNDAY / SEPTEMBER</span>
            <strong>27</strong>
            <span>2026 · NORTH YORK</span>
          </div>
          <div className={styles.kickoffCopy}>
            <p className={styles.eyebrow}>LET’S START SOMETHING TOGETHER</p>
            <h2 id="kickoff-heading">See you at Bayview Glen.</h2>
            <p>
              Join the FIRST LEGO League Challenge Kickoff Celebration &amp;
              Conference. A day of ideas, robot workshops, and meeting the
              people who make this community glow.
            </p>
            <div className={styles.eventFacts}>
              <span>
                <strong>8:30 AM–4 PM</strong>
                <small>Check-in 8:30 · Opening 9:00</small>
              </span>
              <span>
                <strong>85 Moatfield Drive</strong>
                <small>North York · Bring your own lunch</small>
              </span>
            </div>
            <div className={styles.actions}>
              <a
                className={styles.button}
                href={kickoffRegistration}
                target="_blank"
                rel="noreferrer"
              >
                Register with the organizers <Arrow />
              </a>
              <a
                className={styles.textLink}
                href={kickoffProgram}
                target="_blank"
                rel="noreferrer"
              >
                View the program <Arrow />
              </a>
            </div>
            <p className={styles.fineprint}>
              Workshop times and topics may change. See the organizers’ program
              for current details.
            </p>
          </div>
        </section>
        <section
          id="season"
          className={styles.season}
          aria-labelledby="season-heading"
        >
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>01 / THE SEASON AHEAD</p>
                <h2 id="season-heading">
                  Great ideas take
                  <br />
                  time to grow.
                </h2>
              </div>
              <p>
                BIOGLOW invites us to explore biodiversity and the connections
                that keep ecosystems thriving. Our season has started. Our story
                is just taking shape.
              </p>
            </div>
            <div className={styles.projectGrid}>
              <article className={styles.projectCard}>
                <span className={styles.cardNumber}>01</span>
                <div className={styles.projectIcon} aria-hidden="true">
                  ✳
                </div>
                <p className={styles.pill}>RESEARCH IN PROGRESS</p>
                <h3>A question worth exploring.</h3>
                <p>
                  We’re asking questions, learning from experts, and exploring
                  the living world around us. Our innovation project reveal is
                  coming soon.
                </p>
                <span className={styles.cardFoot}>
                  INNOVATION PROJECT <span aria-hidden="true">↗</span>
                </span>
              </article>
              <article className={`${styles.projectCard} ${styles.robotCard}`}>
                <span className={styles.cardNumber}>02</span>
                <div className={styles.robotFace} aria-hidden="true">
                  <i />
                  <i />
                </div>
                <p className={styles.pill}>BUILD. TEST. REPEAT.</p>
                <h3>Big plans. Many small pieces.</h3>
                <p>
                  A fresh challenge means new missions and plenty of ideas to
                  test. Meet our robot, follow our experiments, and see what we
                  learn as the season unfolds.
                </p>
                <span className={styles.cardFoot}>
                  ROBOT DESIGN &amp; GAME <span>COMING SOON</span>
                </span>
              </article>
            </div>
            <a
              className={styles.textLink}
              href="https://www.firstinspires.org/programs/fll/game-and-season"
              target="_blank"
              rel="noreferrer"
            >
              Explore the official BIOGLOW season <Arrow />
            </a>
          </div>
        </section>
        <section
          id="community"
          className={`${styles.wrap} ${styles.community}`}
          aria-labelledby="community-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>02 / CORE VALUES IN ACTION</p>
              <h2 id="community-heading">
                We grow further
                <br />
                when we grow together.
              </h2>
            </div>
            <p>
              What we learn matters. What we share matters, too. We’re putting
              teamwork, inclusion, and impact into practice beyond the
              competition table.
            </p>
          </div>
          <div className={styles.communityGrid}>
            <article className={styles.consult}>
              <div className={styles.communityTop}>
                <span className={styles.eyebrow}>CONNECTECH CONSULT</span>
                <span className={styles.pill}>COMING SOON</span>
              </div>
              <h3>
                Your first season.
                <br />A few helping hands.
              </h3>
              <p>
                New to FIRST LEGO League? We’re preparing free, friendly email
                guidance for new teams, sharing lessons from our own FLL
                journey.
              </p>
              <ul className={styles.topicList}>
                <li>Finding your feet as a team</li>
                <li>Building, coding, and learning from tests</li>
                <li>Exploring an innovation project</li>
                <li>Sharing your story with confidence</li>
              </ul>
              <div className={styles.emailPlaceholder}>
                <span>CONSULTATION EMAIL</span>
                <strong>consult@example.com</strong>
                <small>Placeholder address. Requests are not open yet.</small>
              </div>
              <p className={styles.consultNote}>
                Community service, powered by our Core Values. Guidance from one
                team to another.
              </p>
            </article>
            <article className={styles.girls}>
              <div className={styles.communityTop}>
                <span className={styles.eyebrow}>
                  MORE VOICES. MORE POSSIBILITIES.
                </span>
                <span className={styles.spark} aria-hidden="true">
                  ✳
                </span>
              </div>
              <p className={styles.support}>WE SUPPORT</p>
              <h3>
                #FIRST
                <br />
                LikeAGirl
              </h3>
              <p>
                There’s a place for every girl in STEM. We’re celebrating girls
                who build, code, lead, and inspire the next person to give it a
                try.
              </p>
              <p>
                Find us at kickoff as we help bring #FIRSTLikeAGirl to life with
                buttons, signs, and plenty of team spirit.
              </p>
              <a
                className={styles.button}
                href="https://firstlikeagirl.com/our-story/"
                target="_blank"
                rel="noreferrer"
              >
                Meet the movement <Arrow />
              </a>
              <a
                className={styles.textLink}
                href="https://firstlikeagirl.com/make-your-own/"
                target="_blank"
                rel="noreferrer"
              >
                Make your own campaign materials <Arrow />
              </a>
            </article>
          </div>
        </section>
        <section
          className={styles.achievements}
          aria-labelledby="achievements-heading"
        >
          <div className={styles.wrap}>
            <div className={styles.achievementIntro}>
              <p className={styles.eyebrow}>
                OUR ACHIEVEMENTS / OUR NEXT CHAPTER
              </p>
              <h2 id="achievements-heading">
                Proud of our roots.
                <br />
                Ready to give back.
              </h2>
              <p>
                We’re building on ConnecTech’s journey at Bayview Glen, with new
                teammates and a shared love of learning.
              </p>
              <a
                className={styles.textLink}
                href={schoolRecap}
                target="_blank"
                rel="noreferrer"
              >
                Read Bayview Glen’s 2026 recap <Arrow />
              </a>
            </div>
            <div className={styles.award}>
              <span aria-hidden="true">✳</span>
              <p>2025–26 / CONNECTECH</p>
              <h3>
                Ontario
                <br />
                Provincial Champions
              </h3>
              <small>
                Recognized in Bayview Glen’s May 2026 season report.
              </small>
            </div>
            <div className={styles.award}>
              <span aria-hidden="true">↗</span>
              <p>2026 / HOUSTON</p>
              <h3>
                From Bayview Glen
                <br />
                to the world stage.
              </h3>
              <small>
                ConnecTech represented Canada at the FIRST World Festival.
              </small>
            </div>
          </div>
        </section>
        <section
          id="team"
          className={`${styles.wrap} ${styles.team}`}
          aria-labelledby="team-heading"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>03 / MEET CONNECTECH</p>
              <h2 id="team-heading">
                Seven minds.
                <br />A million ways to connect.
              </h2>
            </div>
            <p>
              Meet our 2026–27 team. Portraits are coming soon. In the meantime,
              enjoy our brick alter egos and nicknames, just for fun.
            </p>
          </div>
          <div className={styles.roster}>
            {teammates.map((person, index) => (
              <article
                className={styles.person}
                key={person.name}
                style={
                  {
                    "--portrait-color": person.color,
                    "--hat-color": person.hat,
                  } as CSSProperties
                }
              >
                <div className={styles.portrait} aria-hidden="true">
                  <span className={styles.personNumber}>0{index + 1}</span>
                  <div className={styles.minifig}>
                    <div className={styles.hat} />
                    <div className={styles.head}>
                      <i />
                      <i />
                      <b />
                    </div>
                    <div className={styles.torso}>
                      <span>CT</span>
                    </div>
                  </div>
                  <span className={styles.portraitLabel}>
                    PHOTO COMING SOON
                  </span>
                </div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
          <p className={styles.teamNote}>
            ConnecTech #27757 · FIRST LEGO League Challenge · Bayview Glen
            School
          </p>
        </section>
        <section
          className={`${styles.wrap} ${styles.archive}`}
          aria-labelledby="archive-heading"
        >
          <div>
            <p className={styles.eyebrow}>BEFORE BIOGLOW, WE DUG DEEP.</p>
            <h2 id="archive-heading">Explore our UNEARTHED season.</h2>
            <p>
              Discover GridLock, our archaeology innovation project, and revisit
              the robots, people, and moments of 2025–26.
            </p>
          </div>
          <Link href="/unearthed" className={styles.button}>
            Visit the season archive <Arrow />
          </Link>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerTop}>
            <div>
              <strong>
                ConnecTech<span> #27757</span>
              </strong>
              <p>Small bricks. Big possibilities.</p>
            </div>
            <a href="#main" className={styles.textLink}>
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className={styles.footerBottom}>
            <span>Bayview Glen School · Toronto, Canada</span>
            <span>FIRST LEGO League Challenge · BIOGLOW™ 2026–27</span>
            <Link href="/unearthed">
              2025–26 archive <Arrow />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
