"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Flag,
  Lightbulb,
  Building2,
  Globe2,
  Rocket,
} from "lucide-react";

const roadmap = [
  {
    icon: Flag,
    title: "The Foundation",
    description:
      "Establishing ACE Global Group with a commitment to integrity, innovation and long-term value creation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Growth",
    description:
      "Developing solutions and expanding into industries that solve real-world challenges while creating sustainable opportunities.",
  },
  {
    icon: Building2,
    title: "Strategic Expansion",
    description:
      "Strengthening our portfolio through partnerships, investments and diversified business operations across key sectors.",
  },
  {
    icon: Globe2,
    title: "Regional & Global Presence",
    description:
      "Building meaningful relationships that connect African opportunities with global markets and international collaboration.",
  },
  {
    icon: Rocket,
    title: "The Future",
    description:
      "Continuing to build a globally respected enterprise driven by innovation, responsible leadership and sustainable impact.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-20"
        >
            <SectionHeader
  eyebrow="Our Journey"
  title="A Vision Built for the Future"
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Our Journey
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            A Vision Built for the Future
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every great organisation begins with a vision. Our roadmap reflects
            our commitment to responsible growth, meaningful innovation and
            creating lasting value for generations to come.
          </p>
        </motion.div>

        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-emerald-200 md:block" />

          <div className="space-y-12">
            {roadmap.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: .6,
                  }}
                  className="relative flex items-start gap-8"
                >
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                    <Icon size={28} />
                  </div>

                  <div className="flex-1 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}