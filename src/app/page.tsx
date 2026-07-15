import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { InteractiveBackground } from "@/components/shared/InteractiveBackground";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { CurrentlyBuilding } from "@/components/home/CurrentlyBuilding";
import { Projects } from "@/components/home/Projects";
import { Experience } from "@/components/home/Experience";
import { HowIWork } from "@/components/home/HowIWork";
import { TechnologiesIUse } from "@/components/home/TechnologiesIUse";
import { DeveloperActivity } from "@/components/home/DeveloperActivity";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <CommandPalette />
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <FeaturedWork />
        <CurrentlyBuilding />
        <Projects />
        <Experience />
        <HowIWork />
        <TechnologiesIUse />
        <DeveloperActivity />
        <Contact />
      </main>

      <Footer />
    </>
  );
}


