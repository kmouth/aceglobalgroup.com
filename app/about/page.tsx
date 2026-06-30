import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Stats from "@/components/about/Stats";
import Leadership from "@/components/about/Leadership";
import Timeline from "@/components/about/Timeline";
import Sustainability from "@/components/about/Sustainability";
import GlobalPresence from "@/components/about/GlobalPresence";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <>
    <Navbar />
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <CoreValues />
      <Stats />
      <Leadership />
      <Timeline />
      <Sustainability />
      <GlobalPresence />
      <CTA />
      <Footer />
    </>
  );
}