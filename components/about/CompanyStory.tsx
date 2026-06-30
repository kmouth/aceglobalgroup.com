"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import {
  Building2,
  Globe2,
  Lightbulb,
  Leaf,
} from "lucide-react";

const values = [
  {
    icon: Building2,
    title: "Diversified Enterprise",
    description:
      "Operating across multiple industries with a shared commitment to excellence and sustainable growth.",
  },
  {
    icon: Globe2,
    title: "Global Perspective",
    description:
      "Creating opportunities that connect Africa with international markets and strategic partnerships.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "Leveraging technology and forward-thinking strategies to solve today's challenges.",
  },
  {
    icon: Leaf,
    title: "Sustainable Impact",
    description:
      "Building businesses that generate economic value while strengthening communities and protecting our environment.",
  },
];

export default function CompanyStory() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-20"
>
  <SectionHeader
    eyebrow="Our Story"
    title="Building Businesses That Shape Tomorrow."
    description="ACE Global Group was founded on the belief that businesses should create lasting value beyond financial success..."
  />


        
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Our Story
          </span>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Building Businesses That Shape Tomorrow.
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            ACE Global Group was founded on the belief that businesses
            should create lasting value beyond financial success.
            We exist to develop innovative enterprises that empower
            people, strengthen industries and contribute meaningfully
            to sustainable development.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Through strategic investments, responsible leadership,
            emerging technologies and collaborative partnerships,
            we are laying the foundation for a globally respected
            organization built on integrity, excellence and innovation.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: .6,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}