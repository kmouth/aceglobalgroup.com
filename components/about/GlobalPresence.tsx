"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import {
  Globe2,
  Handshake,
  GitBranch,
  Compass,
} from "lucide-react";

const highlights = [
  {
    icon: Globe2,
    title: "Global Outlook",
    description:
      "We approach every opportunity with an international perspective while remaining deeply committed to Africa's growth and development.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "We believe meaningful collaboration creates stronger businesses, sustainable investments and long-term shared success.",
  },
  {
    icon: GitBranch,
    title: "Connected Opportunities",
    description:
      "By connecting industries, people and ideas, we unlock opportunities that create value across borders.",
  },
  {
    icon: Compass,
    title: "Future Expansion",
    description:
      "As ACE Global Group grows, we will continue building relationships that strengthen our presence in regional and international markets.",
  },
];

export default function GlobalPresence() {
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
  eyebrow="Global Presence"
  title="Rooted in Africa. Connected to the World."
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Global Presence
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Rooted in Africa. Connected to the World.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are building an organisation that values international
            collaboration, strategic partnerships and responsible expansion,
            creating opportunities that extend beyond borders.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
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