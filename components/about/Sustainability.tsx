"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Leaf,
  Users,
  Globe2,
  Sprout,
} from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description:
      "We are committed to building businesses that embrace responsible resource management, environmental stewardship and sustainable innovation.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "We believe successful businesses should create meaningful opportunities through employment, education, skills development and community engagement.",
  },
  {
    icon: Globe2,
    title: "Responsible Growth",
    description:
      "Our expansion strategy balances commercial success with ethical governance, transparency and long-term resilience.",
  },
  {
    icon: Sprout,
    title: "Future Generations",
    description:
      "Every decision we make today is guided by the impact it will have on tomorrow's communities, industries and global economy.",
  },
];

export default function Sustainability() {
  return (
    <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 py-28 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

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
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Sustainability
          </span>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Building Prosperity That Lasts
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Sustainable growth is not an initiative—it is the foundation of how
            ACE Global Group creates long-term value for businesses,
            communities and future generations.
          </p>
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
                  delay: index * .1,
                  duration: .6,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10 hover:-translate-y-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {pillar.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-300">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}