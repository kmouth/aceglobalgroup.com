import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/services/Hero";
import ServiceCards from "@/components/services/ServiceCards";
import WhyChooseUs from "@/components/services/WhyChooseUs";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ServiceCards />
      </main>
      

      <Footer />
    </>
  );
}