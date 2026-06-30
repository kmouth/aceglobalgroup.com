export default function ServiceCards() {
  const services = [
    {
      title: "Agriculture",
      description:
        "Commercial farming, commodity sourcing and sustainable agricultural development.",
    },
    {
      title: "Logistics",
      description:
        "Reliable transportation, warehousing and supply chain management solutions.",
    },
    {
      title: "Manufacturing",
      description:
        "Value-added processing and production that meets international standards.",
    },
    {
      title: "International Trade",
      description:
        "Import, export and strategic partnerships connecting African markets to the world.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Our Services
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            What We Do
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            ACE Global Group provides integrated business solutions across
            agriculture, logistics, manufacturing and international trade.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 p-8 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}