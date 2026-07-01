export default function LogisticsServices() {
  const services = [
    {
      title: "Transportation",
      description:
        "Reliable road transportation connecting producers, warehouses and customers across Africa.",
    },
    {
      title: "Warehousing",
      description:
        "Secure storage facilities designed to preserve product quality before distribution.",
    },
    {
      title: "Supply Chain Management",
      description:
        "End-to-end planning and coordination that keeps goods moving efficiently.",
    },
    {
      title: "Import & Export",
      description:
        "Professional handling of international shipments and customs documentation.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Our Logistics Services
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            End-to-End Logistics Solutions
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We provide dependable logistics solutions that help businesses
            move products safely, efficiently and on schedule.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {services.map((service) => (

            <div
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
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