
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Brand */}
        <Link href="/" className="group">
          <div className="leading-none">
            <h1 className="text-2xl font-extrabold tracking-wide">
              <span
                className={clsx(
                  "transition",
                  scrolled ? "text-emerald-700" : "text-white"
                )}
              >
                ACE
              </span>

              <span
                className={clsx(
                  scrolled ? "text-slate-900" : "text-white"
                )}
              >
                {" "}
                GLOBAL
              </span>
            </h1>

            <div className="mt-2 h-[3px] w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:w-28" />

            <p
              className={clsx(
                "mt-2 text-[11px] uppercase tracking-[0.35em]",
                scrolled ? "text-slate-500" : "text-white/80"
              )}
            >
              Building Africa's Future
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 xl:gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "relative font-medium transition duration-300 hover:text-green-700",
                pathname === link.href
                  ? "text-green-700"
                  : scrolled
                    ? "text-gray-700"
                    : "text-white"
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

          {/* Payment Button */}
          <Link
            href="/payment"
            className={clsx(
              "rounded-xl px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1",
              pathname === "/payment"
                ? "bg-yellow-500 text-slate-900"
                : "bg-yellow-500 text-slate-900 hover:bg-yellow-400"
            )}
          >
            Make a Payment
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "md:hidden",
            scrolled ? "text-green-800" : "text-white"
          )}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
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
              href="/payment"
              className="mt-6 rounded-xl bg-yellow-500 py-4 text-center font-bold text-slate-900 transition hover:bg-yellow-400"
            >
              Make a Payment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}