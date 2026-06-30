"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Wheat,
  Fish,
  Truck,
  Factory,
  Globe2,
  BriefcaseBusiness,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const sectors = [
  {
    icon: Wheat,
    title: "Agriculture",
    description:
      "Modern farming solutions focused on food security, productivity and sustainable agricultural development.",
  },
  {
    icon: Fish,
    title: "Aquaculture",
    description:
      "Responsible fish farming and aquatic food production designed to meet growing regional and global demand.",
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    description:
      "Reliable transportation, distribution and supply chain solutions connecting businesses and markets.",
  },
  {
    icon: Factory,
    title: "Manufacturing & Processing",
    description:
      "Value-added processing that transforms raw materials into premium products for local and international markets.",
  },
  {
    icon: Globe2,
    title: "International Trade",
    description:
      "Building strategic trade relationships that connect African opportunities with global markets.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Investment & Partnerships",
    description:
      "Creating long-term value through strategic investments, collaboration and sustainable business partnerships.",
  },
];

export default function BusinessSectors() {
  return (
    <section className="bg-slate-50 py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            eyebrow="Our Businesses"
            title="Diversified Industries. One Shared Vision."
            description="ACE Global Group operates across high-impact industries, delivering innovative solutions that create sustainable economic value and strengthen communities."
          />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;

            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {sector.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {sector.description}
                </p>

                <Link
                  href="/services"
                  className="mt-8 inline-flex items-center font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Learn More

                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}