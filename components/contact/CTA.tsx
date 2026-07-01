import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-emerald-900 py-24 text-white">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-black">
          Let's Build Something Great Together
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-emerald-100">
          Partner with ACE Global Group to unlock opportunities in
          agriculture, logistics, manufacturing and sustainable business.
        </p>

        <Link
          href="/about"
          className="mt-10 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-yellow-400"
        >
          Learn More About Us
        </Link>

      </div>

    </section>
  );
}