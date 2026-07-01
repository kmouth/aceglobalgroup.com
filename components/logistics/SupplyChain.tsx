export default function SupplyChain() {
  const steps = [
    {
      title: "Sourcing",
      description:
        "We connect businesses with trusted producers and suppliers across agriculture, manufacturing and trade.",
    },
    {
      title: "Storage",
      description:
        "Products are securely handled and stored to preserve quality before distribution.",
    },
    {
      title: "Transportation",
      description:
        "Reliable local and international transportation ensures safe and timely delivery.",
    },
    {
      title: "Delivery",
      description:
        "We complete the supply chain by delivering products efficiently to businesses and customers worldwide.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Integrated Supply Chain
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            From Origin to Destination
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We coordinate every stage of the logistics journey, ensuring
            products move efficiently, safely and reliably across local
            and international markets.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => (

            <div
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-xl font-bold text-white">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}