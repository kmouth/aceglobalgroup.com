import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/publications/Hero";
import FeaturedPublication from "@/components/publications/FeaturedPublication";
import PublicationLibrary from "@/components/publications/PublicationLibrary";
import PublicationCategories from "@/components/publications/PublicationCategories";
import DownloadGuide from "@/components/publications/DownloadGuide";
import CTA from "@/components/publications/CTA";

export default function PublicationsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedPublication />
        <PublicationLibrary />
        <PublicationCategories />
        <DownloadGuide />
        <CTA />
      </main>

      <Footer />
    </>
  );
}