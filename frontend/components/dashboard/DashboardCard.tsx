"use client";

export default function DashboardCard({
  title,
  description,
}: any) {

  return (

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-400">
        {description}
      </p>

    </div>

  );

}