"use client";

import { motion } from "framer-motion";
import {
  Users,
  Globe2,
  Leaf,
  Truck,
} from "lucide-react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

const impact = [
  {
    icon: Users,
    number: "100+",
    title: "Business Relationships",
  },
  {
    icon: Globe2,
    number: "5",
    title: "Core Business Divisions",
  },
  {
    icon: Truck,
    number: "24/7",
    title: "Operational Support",
  },
  {
    icon: Leaf,
    number: "100%",
    title: "Commitment to Sustainability",
  },
];

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 py-24 text-white">

      <Container>

        <SectionTitle
          eyebrow="Our Impact"
          title="Building Africa's Future Together"
          subtitle="ACE Global Group is committed to sustainable development, innovation and creating long-term value across every sector we serve."
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {impact.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-lg"
              >

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-green-900">

                  <Icon size={30} />

                </div>

                <h2 className="text-5xl font-extrabold">

                  {item.number}

                </h2>

                <p className="mt-4 text-lg text-green-100">

                  {item.title}

                </p>

              </motion.div>
            );
          })}

        </div>

        <div className="mt-20 text-center">

          <h2 className="mb-6 text-4xl font-bold">

            Let's Build the Future Together

          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl leading-9 text-green-100">

            Whether you're seeking a reliable business partner,
            premium agricultural products, logistics expertise or
            investment opportunities, ACE Global Group is ready
            to help you succeed.

          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <Button href="/contact">

              Become a Partner

            </Button>

            <Button
              href="/services"
              variant="secondary"
            >

              Explore Solutions

            </Button>

          </div>

        </div>

      </Container>

    </section>
  );
}