interface CompanyCardProps {
  name: string;
  description: string;
}

export default function CompanyCard({
  name,
  description,
}: CompanyCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">
        {name}
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}