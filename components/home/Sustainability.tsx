"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Trees,
  Users,
  Recycle,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description:
      "We embrace sustainable practices that protect natural resources while supporting long-term economic growth.",
  },
  {
    icon: Trees,
    title: "Sustainable Development",
    description:
      "Every project is designed to create value today while preserving opportunities for future generations.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description:
      "We believe businesses grow stronger when communities prosper through employment, education and opportunity.",
  },
  {
    icon: Recycle,
    title: "Responsible Operations",
    description:
      "Efficiency, accountability and responsible resource management remain central to our operational philosophy.",
  },
];

export default function Sustainability() {
  return (
    <section className="bg-emerald-950 py-32 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            eyebrow="Sustainability"
            title="Building Prosperity That Lasts"
            description="Sustainability is embedded in our strategy, guiding every investment, partnership and business decision we make."
          />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                <div className="flex items-start gap-6">
                  <div className="rounded-2xl bg-emerald-600 p-4">
                    <Icon size={30} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-200">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}