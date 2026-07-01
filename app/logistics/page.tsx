import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/logistics/Hero";
import LogisticsServices from "@/components/logistics/LogisticsServices";
import SupplyChain from "@/components/logistics/SupplyChain";
import Industries from "@/components/logistics/Industries";
import WhyChooseLogistics from "@/components/logistics/WhyChooseLogistics";
import CTA from "@/components/logistics/CTA";

export default function LogisticsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <LogisticsServices />
        <SupplyChain />
        <Industries />
        <WhyChooseLogistics />
        <CTA />
      </main>

      <Footer />
    </>
  );
}