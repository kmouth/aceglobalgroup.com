import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/investors/Hero";
import InvestmentHighlights from "@/components/investors/InvestmentHighlights";
import WhyInvest from "@/components/investors/WhyInvest";
import BusinessPortfolio from "@/components/investors/BusinessPortfolio";
import CapitalProjects from "@/components/investors/CapitalProjects";
import InvestmentProcess from "@/components/investors/InvestmentProcess";
import FAQs from "@/components/investors/FAQs";
import CTA from "@/components/investors/CTA";

export default function InvestorsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <InvestmentHighlights />
        <WhyInvest />
        <BusinessPortfolio />
        <CapitalProjects />
        <InvestmentProcess />
        <FAQs />
        <CTA />
      </main>

      <Footer />
    </>
  );
}