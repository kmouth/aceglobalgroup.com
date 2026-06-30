import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import BusinessSectors from "@/components/home/BusinessSectors";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Sustainability from "@/components/home/Sustainability";
import GlobalVision from "@/components/home/GlobalVision"


import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutPreview />
        <BusinessSectors />
        <WhyChooseUs />
        <Sustainability />
        <GlobalVision />
         <CTA />
      </main>

      <Footer />
    </>
  );
}