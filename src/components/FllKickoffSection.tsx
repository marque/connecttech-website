import Image from "next/image";
import kickoff from "./FllKickoffSection.module.css";

const photos = [
 { number: 14, alt: "FLL kickoff participants gathered in the auditorium" },
 { number: 19, alt: "ConnecTech sharing robot demonstrations at the kickoff" },
 { number: 27, alt: "A team member presenting the robot engineering process" },
 { number: 32, alt: "Workshop facilitators presenting with a LEGO robot" },
 { number: 44, alt: "Participants enjoying the FIRSTLikeAGirl photo booth" },
 { number: 50, alt: "ConnecTech celebrating outside Bayview Glen School" },
];
export default function FllKickoffSection() {
 return (
  <section className={kickoff.panel} aria-labelledby="kickoff-title">
   <h2 id="kickoff-title">FLL Kickoff</h2>
   <p>This season our school, Bayview Glen hosted the annual First Lego League Kickoff! Many members of our team got a chance to attend as well as lead sessions, which was a very exciting opportunity that allowed us to share our expertise with others and learn more in the process. Overall we as a team really enjoyed this opportunity to share, learn and collaborate with other FLL members.</p>
   <div className={kickoff.photos}>{photos.map(photo => <a key={photo.number} href={`/images/fll-kickoff/kickoff-${photo.number}.webp`} target="_blank" rel="noreferrer" aria-label={`${photo.alt} (opens full photo)`}><Image src={`/images/fll-kickoff/kickoff-${photo.number}.webp`} width={1800} height={1200} alt={photo.alt} sizes="(max-width: 700px) 88vw, (max-width: 1000px) 42vw, 28vw" /></a>)}</div>
  </section>
 );
}
