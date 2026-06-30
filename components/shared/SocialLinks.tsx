import { company } from "@/lib/company";

export default function SocialLinks() {
  return (
    <div className="flex gap-4">

      <a
        href={company.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white transition hover:bg-yellow-500 hover:text-black"
      >
        𝕏
      </a>

    </div>
  );
}