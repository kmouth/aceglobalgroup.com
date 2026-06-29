type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-yellow-700">
      {children}
    </span>
  );
}