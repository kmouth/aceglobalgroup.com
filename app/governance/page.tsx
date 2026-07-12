import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/governance/Hero";
import GovernanceFramework from "@/components/governance/GovernanceFramework";
import LeadershipPrinciples from "@/components/governance/LeadershipPrinciples";
import CorporatePolicies from "@/components/governance/CorporatePolicies";

export default function GovernancePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <GovernanceFramework />
        <LeadershipPrinciples />
        <CorporatePolicies />
      </main>

      <Footer />
    </>
  );
}