"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const solutions = [
  {
    title: "Agricultural Production",
    description:
      "High-quality crop production and sustainable farming practices that support food security and economic development.",
    image: "/images/agriculture.jpg",
    href: "/products",
  },
  {
    title: "Aquaculture",
    description:
      "Modern fish farming solutions delivering premium aquatic products through sustainable production methods.",
    image: "/images/aquaculture.jpg",
    href: "/products",
  },
  {
    title: "Logistics & Distribution",
    description:
      "Reliable transportation, warehousing and supply chain services connecting businesses efficiently.",
    image: "/images/logistics.jpg",
    href: "/logistics",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-24">
      <Container>

        <SectionTitle
          eyebrow="Our Solutions"
          title="Integrated Business Solutions"
          subtitle="Delivering innovative services that drive sustainable growth across agriculture, logistics and international trade."
          center
        />

        <div className="grid gap-8 lg:grid-cols-3">

          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all hover:shadow-2xl"
            >

              <div className="relative h-64 overflow-hidden">

                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-8">

                <h3 className="mb-4 text-2xl font-bold text-green-900">
                  {solution.title}
                </h3>

                <p className="mb-8 leading-8 text-gray-600">
                  {solution.description}
                </p>

                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 font-semibold text-green-700 transition-all group-hover:gap-4"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </Container>
    </section>
  );
}