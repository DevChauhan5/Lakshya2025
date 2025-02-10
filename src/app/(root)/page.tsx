import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { OurTeam } from "@/components/sections/OurTeam";
import { Sponsors } from "@/components/sections/Sponsors";
import { Timeline } from "@/components/sections/Timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Events />
      <Sponsors />
      <Gallery />
      <OurTeam />
    </main>
  );
}
