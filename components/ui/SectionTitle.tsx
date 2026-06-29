type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionTitleProps) {
  return (
    <div
      className={`mb-16 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-extrabold text-green-900 md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}