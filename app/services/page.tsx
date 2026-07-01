import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/services/Hero";
import ServiceCards from "@/components/services/ServiceCards";
import WhyUs from "@/components/services/WhyUs";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ServiceCards />
        <WhyUs />
      </main>

      <Footer />
    </>
  );
}