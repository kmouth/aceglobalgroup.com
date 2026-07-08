"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Briefcase,
  Globe2,
  Handshake,
  Landmark,
  Users,
} from "lucide-react";

const partners = [
  {
    icon: Landmark,
    title: "Government Institutions",
    subtitle: "Driving national development through strategic collaboration.",
  },
  {
    icon: Handshake,
    title: "Financial Institutions",
    subtitle: "Building sustainable investment and financing partnerships.",
  },
  {
    icon: Globe2,
    title: "International Partners",
    subtitle: "Creating global opportunities across emerging markets.",
  },
  {
    icon: Building2,
    title: "Corporate Enterprises",
    subtitle: "Providing innovative business and logistics solutions.",
  },
  {
    icon: Briefcase,
    title: "Private Investors",
    subtitle: "Unlocking long-term value through strategic investments.",
  },
  {
    icon: Users,
    title: "Development Agencies",
    subtitle: "Working together to create lasting economic impact.",
  },
];

export default function PartnerShowcase() {
  return (
    <section className="bg-slate-100 py-32">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-600">
            STRATEGIC ECOSYSTEM
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Built For Partnership
          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">
            ACE Global Group is building an ecosystem where governments,
            financial institutions, development organisations, investors
            and corporate partners collaborate to accelerate sustainable
            growth across Africa.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {partners.map((partner, index) => {

            const Icon = partner.icon;

            return (

              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-2xl"
              >

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon
                    size={36}
                    className="text-emerald-700 transition group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {partner.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {partner.subtitle}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}