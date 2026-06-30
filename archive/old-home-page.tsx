import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


import Image from "next/image";
import Link from "next/link";

import { company } from "@/lib/company";

import {
  ArrowRight,
  Target,
  Eye,
  Leaf,
  Handshake,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-28">

        {/* Hero */}

        <section className="relative h-[450px]">

          <Image
            src="/images/about.jpg"
            alt="About ACE Global Group"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-center text-white">

              <p className="mb-4 uppercase tracking-[0.35em] text-yellow-400">

                ABOUT US

              </p>

              <h1 className="text-5xl font-extrabold md:text-7xl">

                {company.name}

              </h1>

              <p className="mt-6 text-xl">

                {company.slogan}

              </p>

            </div>

          </div>

        </section>

        {/* Company Overview */}

        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>

              <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-green-700">

                Who We Are

              </p>

              <h2 className="mb-8 text-5xl font-bold text-green-900">

                Driving Sustainable Growth Across Africa

              </h2>

              <p className="mb-6 leading-9 text-gray-700">

                {company.description}

              </p>

              <p className="leading-9 text-gray-700">

                Through innovation, integrity and strategic partnerships,
                we create value across agriculture, aquaculture,
                logistics, processing and international trade.

              </p>

            </div>

            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/about.jpg"
                alt="ACE Global Group"
                fill
                className="object-cover"
              />

            </div>

          </div>

        </section>

        {/* Mission & Vision */}

        <section className="bg-green-50 py-24">

          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">

            <div className="rounded-3xl bg-white p-10 shadow-xl">

              <Target
                size={48}
                className="mb-6 text-green-700"
              />

              <h3 className="mb-6 text-3xl font-bold">

                Our Mission

              </h3>

              <p className="leading-9 text-gray-700">

                To deliver innovative, sustainable and reliable
                solutions that empower businesses, strengthen
                communities and contribute to Africa's economic
                development.

              </p>

            </div>

            <div className="rounded-3xl bg-white p-10 shadow-xl">

              <Eye
                size={48}
                className="mb-6 text-green-700"
              />

              <h3 className="mb-6 text-3xl font-bold">

                Our Vision

              </h3>

              <p className="leading-9 text-gray-700">

                To become one of Africa's leading diversified
                enterprises recognised globally for excellence,
                innovation and sustainable business practices.

              </p>

            </div>

          </div>

        </section>

        {/* Core Values */}

        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">

            <p className="uppercase tracking-[0.3em] text-green-700">

              Our Values

            </p>

            <h2 className="mt-4 text-5xl font-bold">

              What Defines Us

            </h2>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              "Integrity",
              "Innovation",
              "Sustainability",
              "Partnership",
            ].map((value) => (
              <div
                key={value}
                className="rounded-3xl bg-white p-8 text-center shadow-lg"
              >
                <Leaf
                  className="mx-auto mb-6 text-green-700"
                  size={40}
                />

                <h3 className="text-2xl font-bold">

                  {value}

                </h3>

              </div>
            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="bg-green-900 py-24 text-center text-white">

          <Handshake
            size={60}
            className="mx-auto mb-8 text-yellow-400"
          />

          <h2 className="text-5xl font-bold">

            Let's Build the Future Together

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9">

            We welcome partnerships, investments and collaborations
            that contribute to sustainable growth and long-term success.

          </p>

          <Link
            href="/contact"
            className="mt-12 inline-flex items-center gap-3 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400"
          >
            Become a Partner

            <ArrowRight size={20} />

          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}