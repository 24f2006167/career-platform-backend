// import { ReactNode } from "react";

// interface DashboardCardProps {
//   title: string;
//   value: string | number;
//   icon?: ReactNode;
//   description?: string;
// }

// export default function DashboardCard({
//   title,
//   value,
//   icon,
//   description,
// }: DashboardCardProps) {
//   return (
//     <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-sm text-gray-400">
//             {title}
//           </p>

//           <h3 className="mt-3 text-4xl font-bold">
//             {value}
//           </h3>

//           {description && (
//             <p className="mt-3 text-sm text-gray-400">
//               {description}
//             </p>
//           )}
//         </div>

//         {icon && (
//           <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-2xl">
//             {icon}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight">
            {value}
          </h3>

          {description && (
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-2xl transition group-hover:border-purple-400/30 group-hover:bg-purple-500/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}