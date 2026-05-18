// "use client";

// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {

//   const router = useRouter();



//   return (

//     <main className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

//       {/* BACKGROUND */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-500/20 blur-[150px] rounded-full" />


//       {/* CONTENT */}
//       <div className="relative z-10">

//         <h1 className="text-7xl font-black">
//           Admin Dashboard
//         </h1>

//         <p className="mt-4 text-gray-400 text-xl">
//           Control and monitor the entire platform.
//         </p>

//         {/* CARDS */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Manage Users
//             </h2>
//             <p className="mt-3 text-gray-400">
//               View all registered accounts.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Recruiter Approvals
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Verify recruiter accounts.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Analytics
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Monitor platform growth.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Reports
//             </h2>
//             <p className="mt-3 text-gray-400">
//               View system reports and logs.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Moderation
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Ban or delete suspicious users.
//             </p>
//           </div>

//         </div>

//       </div>

//     </main>
//   );
// }
"use client";

export default function AdminDashboard() {

  return (

    <main className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-500/20 blur-[150px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10">

        <h1 className="text-7xl font-black">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-gray-400 text-xl">
          Control and monitor the entire platform.
        </p>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">
              Manage Users
            </h2>

            <p className="mt-3 text-gray-400">
              View all registered accounts.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">
              Recruiter Approvals
            </h2>

            <p className="mt-3 text-gray-400">
              Verify recruiter accounts.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">
              Analytics
            </h2>

            <p className="mt-3 text-gray-400">
              Monitor platform growth.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">
              Reports
            </h2>

            <p className="mt-3 text-gray-400">
              View system reports and logs.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">
              Moderation
            </h2>

            <p className="mt-3 text-gray-400">
              Ban or delete suspicious users.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}