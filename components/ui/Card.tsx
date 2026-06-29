type CardProps = {
  children: React.ReactNode;
};

export default function Card({
  children,
}: CardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {children}
    </div>
  );
}