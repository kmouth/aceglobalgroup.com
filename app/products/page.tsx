import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/products/Hero";
import ProductCategories from "@/components/products/ProductCategories";
import CTA from "@/components/products/CTA";
import WhyChooseProducts from "@/components/products/WhyChooseProducts";


export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductCategories />
        <CTA />
        <WhyChooseProducts />
      </main>
      <Footer />
    </>
  );
}