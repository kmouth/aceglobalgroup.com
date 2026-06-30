interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${
        center ? "mx-auto text-center" : "text-left"
      }`}
    >
      <span className="inline-block text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
        {eyebrow}
      </span>

      <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      <p className="mt-8 text-lg leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}