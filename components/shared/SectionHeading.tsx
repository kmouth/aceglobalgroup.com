interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-green-700">
        {subtitle}
      </p>

      <h2 className="text-4xl font-extrabold text-green-900 md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}