"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

export default function About() {
  return (
    <section className="bg-gray-50 py-24">

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-2xl"
          >
            <Image
              src="/images/about.jpg"
              alt="ACE Global Group"
              width={900}
              height={700}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <SectionTitle
              eyebrow="Who We Are"
              title="Building Sustainable Growth Across Agriculture, Logistics & Global Trade"
              subtitle="Creating value through innovation, integrity and operational excellence."
            />

            <p className="mb-6 text-lg leading-8 text-gray-600">
              ACE GLOBAL GROUP is a diversified enterprise committed to
              transforming Africa's agricultural and logistics sectors through
              innovation, strategic partnerships and sustainable business
              practices.
            </p>

            <p className="mb-6 text-lg leading-8 text-gray-600">
              Our operations span agriculture, aquaculture, food processing,
              logistics and international trade, enabling us to connect
              producers, businesses and consumers with dependable solutions
              that strengthen food security and economic growth.
            </p>

            <p className="mb-10 text-lg leading-8 text-gray-600">
              Guided by excellence, integrity and long-term impact, we are
              building a trusted African brand capable of serving local and
              international markets while creating opportunities for people,
              businesses and communities.
            </p>

            <div className="flex flex-wrap gap-5">

              <Button href="/about">
                Learn More
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Contact Us
              </Button>

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}