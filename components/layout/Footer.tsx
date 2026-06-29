"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { company } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="bg-[#081C15] text-gray-300">

      {/* Main Footer */}

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">

        {/* Company */}

        <div>

          <Image
            src="/images/logo.png"
            alt={company.name}
            width={170}
            height={60}
            className="mb-6"
          />

          <h3 className="mb-3 text-2xl font-bold text-white">
            {company.name}
          </h3>

          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-yellow-400">
            {company.slogan}
          </p>

          <p className="leading-8 text-gray-400">
            {company.description}
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="mb-6 text-xl font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-4">

            <li>
              <Link href="/" className="transition hover:text-yellow-400">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="transition hover:text-yellow-400">
                About
              </Link>
            </li>

            <li>
              <Link href="/products" className="transition hover:text-yellow-400">
                Solutions
              </Link>
            </li>

            <li>
              <Link href="/services" className="transition hover:text-yellow-400">
                Services
              </Link>
            </li>

            <li>
              <Link href="/logistics" className="transition hover:text-yellow-400">
                Logistics
              </Link>
            </li>

            <li>
              <Link href="/contact" className="transition hover:text-yellow-400">
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-6 text-xl font-semibold text-white">
            Headquarters
          </h3>

          <div className="space-y-6">

            <div className="flex items-start gap-3">

              <MapPin
                className="mt-1 text-yellow-400"
                size={20}
              />

              <p>{company.address}</p>

            </div>

            <div className="flex items-center gap-3">

              <Phone
                className="text-yellow-400"
                size={20}
              />

              <a
                href={`tel:${company.phone}`}
                className="transition hover:text-yellow-400"
              >
                {company.displayPhone}
              </a>

            </div>

            <div className="flex items-center gap-3">

              <Mail
                className="text-yellow-400"
                size={20}
              />

              <a
                href={`mailto:${company.email}`}
                className="transition hover:text-yellow-400"
              >
                {company.email}
              </a>

            </div>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="mb-6 text-xl font-semibold text-white">
            Connect With Us
          </h3>

          <p className="mb-6 leading-7 text-gray-400">
            Follow ACE Global Group for updates,
            partnerships and business opportunities.
          </p>

          <div className="flex gap-4">

            <a
              href={company.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-xl font-bold transition hover:bg-yellow-500 hover:text-black"
            >
              𝕏
            </a>

          </div>

          <p className="mt-8 text-sm text-gray-500">
            LinkedIn Coming Soon
          </p>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-green-900">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {company.name}. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-3 text-white transition hover:bg-yellow-500 hover:text-black"
          >
            <ArrowUp size={18} />
            Back to Top
          </button>

        </div>

      </div>

    </footer>
  );
}