"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Award, Compass, Users } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Visionary Leadership",
    description:
      "We lead with clarity, long-term thinking and a commitment to creating sustainable opportunities across every sector we serve.",
  },
  {
    icon: Users,
    title: "People-Centred Culture",
    description:
      "Our greatest strength is our people. We foster collaboration, inclusion and continuous development across our organisation.",
  },
  {
    icon: Award,
    title: "Excellence in Execution",
    description:
      "Every project, partnership and investment is guided by discipline, accountability and world-class standards.",
  },
];

export default function Leadership() {
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
  eyebrow="Leadership"
  title="Leadership That Inspires Confidence"
  description="..."
/>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
            Leadership
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Leadership That Inspires Confidence
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            At ACE Global Group, leadership is more than a title. It is a
            responsibility to inspire innovation, uphold integrity and create
            lasting value for our stakeholders, employees, partners and the
            communities we serve.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {principles.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
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