import Link from "next/link";

interface RoleCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function RoleCard({
  title,
  description,
  href = "/roles",
}: RoleCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </Link>
  );
}