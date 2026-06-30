"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Handshake,
  Leaf,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const features = [
  {
    icon: Globe2,
    title: "Global Perspective",
    description:
      "We combine local expertise with an international outlook to build businesses that compete on a global stage.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Long-term relationships are at the heart of everything we do, creating sustainable value for businesses and communities.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth",
    description:
      "Our investments are driven by innovation, responsible leadership and a commitment to future generations.",
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-white py-32">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeader
            eyebrow="Who We Are"
            title="A Vision Built for Sustainable Growth"
            description="ACE Global Group is a diversified enterprise committed to creating lasting value through innovation, strategic partnerships and responsible investments across key industries."
          />
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-lg leading-9 text-slate-600">

              We believe that great businesses are built with vision,
              integrity and collaboration. From agriculture and logistics
              to manufacturing and international partnerships, ACE Global
              Group is creating opportunities that strengthen economies,
              empower communities and deliver sustainable impact.

            </p>

            <p className="mt-8 text-lg leading-9 text-slate-600">

              Every project we undertake is guided by our commitment to
              excellence, innovation and long-term value creation.

            </p>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-700"
            >
              Learn More About ACE

              <ArrowRight className="ml-3 h-5 w-5" />

            </Link>

          </motion.div>

          {/* Right Side */}

          <div className="grid gap-6">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                  }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:bg-white hover:shadow-xl"
                >

                  <div className="flex items-start gap-5">

                    <div className="rounded-2xl bg-emerald-100 p-4">

                      <Icon className="h-7 w-7 text-emerald-600" />

                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-slate-900">

                        {feature.title}

                      </h3>

                      <p className="mt-3 leading-8 text-slate-600">

                        {feature.description}

                      </p>

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </Container>
    </section>
  );
}