"use client";

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  BadgeCheck,
  Headphones,
} from "lucide-react";

const stats = [
  {
    number: "10+",
    label: "Strategic Partners",
    icon: Users,
  },
  {
    number: "5",
    label: "Business Divisions",
    icon: Building2,
  },
  {
    number: "100%",
    label: "Commitment to Quality",
    icon: BadgeCheck,
  },
  {
    number: "24/7",
    label: "Customer Support",
    icon: Headphones,
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-lg transition-all"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Icon
                    size={34}
                    className="text-green-700"
                  />
                </div>

                <h2 className="text-5xl font-extrabold text-green-800">
                  {stat.number}
                </h2>

                <p className="mt-4 text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}