"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  Compass,
  Rocket,
  Landmark,
} from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

const visionItems = [
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Building strategic relationships that connect African opportunities with international markets.",
  },
  {
    icon: Compass,
    title: "Strategic Direction",
    description:
      "Focused on long-term growth through innovation, diversification and responsible leadership.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Continuously investing in ideas, technology and people to shape the future of enterprise.",
  },
  {
    icon: Landmark,
    title: "Lasting Legacy",
    description:
      "Creating businesses that generate sustainable economic value for generations to come.",
  },
];

export default function GlobalVision() {
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
            eyebrow="Our Vision"
            title="Looking Beyond Today's Opportunities"
            description="Our ambition is to build a globally respected enterprise that transforms industries, empowers communities and creates sustainable prosperity."
          />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">

          {visionItems.map((item, index) => {

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
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
              >

                <div className="flex items-start gap-6">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">

                    <Icon size={30} />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">

                      {item.title}

                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">

                      {item.description}

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