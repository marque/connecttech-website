"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./KickoffGallery.module.css";

const photos = [
  { file: "workshop-82.webp", alt: "ConnecTech and workshop participants celebrating FIRSTLikeAGirl at the FLL kickoff" },
  { file: "workshop-68.webp", alt: "ConnecTech team members leading the FIRSTLikeAGirl workshop" },
  { file: "workshop-88.webp", alt: "Team members presenting in front of the FIRSTLikeAGirl workshop display" },
  { file: "workshop-92.webp", alt: "A ConnecTech workshop facilitator speaking to participants with a megaphone" },
  { file: "workshop-98.webp", alt: "ConnecTech team members engaging with the workshop audience" },
  { file: "photo-booth.webp", alt: "A kickoff participant posing in the FIRSTLikeAGirl and BIOGLOW photo booth" },
];

export default function KickoffGallery() {
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const nextPhoto = () => setIndex((current) => (current + 1) % photos.length);

  return (
    <section className={styles.section} aria-labelledby="kickoff-gallery-title">
      <div className={styles.intro}>
        <p className={styles.label}>SEPTEMBER 27, 2026 / FLL KICKOFF</p>
        <h2 id="kickoff-gallery-title">FIRSTLikeAGirl in action</h2>
        <p>These photos are from the FLL kickoff, where we hosted a workshop about #FIRSTLikeAGirl.</p>
      </div>
      <div className={styles.slideshow}>
        <button type="button" className={styles.photo} onClick={nextPhoto} aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}. Show next photo`}>
          <Image src={`/images/kickoff-2026/${photo.file}`} alt={photo.alt} fill sizes="(max-width: 700px) 88vw, 960px" />
          <span className={styles.next} aria-hidden="true">Next photo →</span>
        </button>
        <p className={styles.counter} aria-live="polite">Photo {index + 1} of {photos.length} · Click the photo to see the next one</p>
      </div>
    </section>
  );
}
