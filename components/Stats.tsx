const stats = [
  { number: "10+", label: "Strategic Partners" },
  { number: "5", label: "Business Divisions" },
  { number: "100%", label: "Commitment to Quality" },
  { number: "24/7", label: "Customer Support" },
];

export default function Stats() {
  return (
    <section className="bg-green-900 py-16 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className="text-5xl font-bold text-yellow-400">
              {stat.number}
            </h3>
            <p className="mt-3 text-green-100">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}