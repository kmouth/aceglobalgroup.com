"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Leaf,
  Handshake,
  TrendingUp,
  Users,
  Globe2,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We build trust through transparency, accountability and ethical business practices.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "Our operations promote responsible agriculture and long-term environmental stewardship.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    text: "We collaborate with businesses, communities and global partners for mutual growth.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    text: "Technology and continuous improvement drive every solution we deliver.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    text: "Our clients remain at the heart of every decision and every service we provide.",
  },
  {
    icon: Globe2,
    title: "Global Outlook",
    text: "Connecting African opportunities with international markets through quality and reliability.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-green-50 py-24">

      <Container>

        <SectionTitle
          eyebrow="Why Choose ACE Global Group"
          title="Built on Excellence, Driven by Purpose"
          subtitle="Everything we do is guided by innovation, integrity and a commitment to sustainable growth."
          center
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Icon
                    size={32}
                    className="text-green-700"
                  />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-green-900">
                  {feature.title}
                </h3>

                <p className="leading-8 text-gray-600">
                  {feature.text}
                </p>

              </motion.div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}