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
  return (
    <section className={styles.section} aria-labelledby="kickoff-gallery-title">
      <div className={styles.intro}>
        <p className={styles.label}>SEPTEMBER 27, 2026 / FLL KICKOFF</p>
        <h2 id="kickoff-gallery-title">FIRSTLikeAGirl in action</h2>
        <p>These photos are from the FLL kickoff, where we hosted a workshop about #FIRSTLikeAGirl.</p>
      </div>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <a key={photo.file} href={`/images/kickoff-2026/${photo.file}`} target="_blank" rel="noreferrer" aria-label={`${photo.alt} (opens full photo in a new tab)`} className={styles.photo}>
            <Image src={`/images/kickoff-2026/${photo.file}`} alt={photo.alt} width={1800} height={photo.file === "photo-booth.webp" ? 2410 : 1200} sizes="(max-width: 700px) 88vw, (max-width: 1100px) 44vw, 28vw" />
          </a>
        ))}
      </div>
    </section>
  );
}
