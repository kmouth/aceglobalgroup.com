"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Tractor,
  Fish,
  Truck,
  Factory,
  Globe,
  ArrowRight,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const divisions = [
  {
    title: "Agriculture",
    description:
      "Sustainable crop cultivation and modern farming solutions that contribute to food security and economic growth.",
    image: "/images/agriculture.jpg",
    href: "/services",
    icon: Tractor,
  },
  {
    title: "Aquaculture",
    description:
      "Innovative fish farming and aquatic production focused on quality, sustainability and nutrition.",
    image: "/images/aquaculture.jpg",
    href: "/services",
    icon: Fish,
  },
  {
    title: "Logistics",
    description:
      "Reliable transportation, warehousing and supply chain solutions connecting businesses across Nigeria.",
    image: "/images/logistics.jpg",
    href: "/logistics",
    icon: Truck,
  },
  {
    title: "Processing",
    description:
      "Adding value through efficient processing, packaging and quality assurance of agricultural products.",
    image: "/images/processing.jpg",
    href: "/products",
    icon: Factory,
  },
  {
    title: "Global Trade",
    description:
      "Building international partnerships and delivering premium African products to global markets.",
    image: "/images/global-trade.jpg",
    href: "/contact",
    icon: Globe,
  },
];

export default function BusinessDivisions() {
  return (
    <section className="bg-white py-24">
      <Container>

        <SectionTitle
          eyebrow="Our Business"
          title="Integrated Business Divisions"
          subtitle="ACE Global Group delivers value across multiple industries through innovation, operational excellence and sustainable growth."
          center
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {divisions.map((division, index) => {
            const Icon = division.icon;

            return (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-2xl"
              >

                <div className="relative h-64 overflow-hidden">

                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                <div className="p-8">

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">

                    <Icon
                      size={28}
                      className="text-green-700"
                    />

                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-green-900">
                    {division.title}
                  </h3>

                  <p className="leading-8 text-gray-600">
                    {division.description}
                  </p>

                  <Link
                    href={division.href}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-green-700 transition group-hover:gap-4"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </Link>

                </div>

              </motion.div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}