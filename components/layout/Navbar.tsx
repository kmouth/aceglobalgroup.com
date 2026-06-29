"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Logistics", href: "/logistics" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white shadow-lg"
          : "bg-white/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}

        <Link href="/" className="group">

          <div className="leading-none">

            <h1 className="text-3xl font-extrabold tracking-wide">

              <span className="text-green-800 transition group-hover:text-green-700">
                ACE
              </span>

              <span className="text-blue-900">
                {" "}GLOBAL
              </span>

            </h1>

            <div className="mt-2 h-[3px] w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-28"></div>

            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-gray-500">

              Building Africa's Future

            </p>

          </div>

        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "relative font-medium transition duration-300 hover:text-green-700",
                pathname === link.href
                  ? "text-green-700"
                  : "text-gray-700"
              )}
            >
              {link.name}

              <span
                className={clsx(
                  "absolute left-0 -bottom-2 h-[2px] bg-yellow-500 transition-all duration-300",
                  pathname === link.href
                    ? "w-full"
                    : "w-0 hover:w-full"
                )}
              />

            </Link>

          ))}

          <Link
            href="/contact"
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-800"
          >
            Contact Us
          </Link>

        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-green-800 md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {isOpen && (

        <div className="border-t bg-white shadow-lg md:hidden">

          <nav className="flex flex-col px-6 py-6">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "border-b py-4 text-lg transition",
                  pathname === link.href
                    ? "font-bold text-green-700"
                    : "text-gray-700"
                )}
              >
                {link.name}
              </Link>

            ))}

            <Link
              href="/contact"
              className="mt-6 rounded-lg bg-green-700 py-4 text-center font-semibold text-white"
            >
              Contact Us
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}