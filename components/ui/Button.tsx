import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-green-700 text-white hover:bg-green-800"
      : "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white";

  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 ${styles}`}
    >
      {children}
    </Link>
  );
}