// "use client";

// import { useRouter } from "next/navigation";

// export default function RecruiterDashboard() {

//   const router = useRouter();

  

//   return (

//     <main className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

//       {/* BACKGROUND */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[150px] rounded-full" />

//       {/* CONTENT */}
//       <div className="relative z-10">

//         <h1 className="text-7xl font-black">
//           Recruiter Dashboard
//         </h1>

//         <p className="mt-4 text-gray-400 text-xl">
//           Manage hiring and candidates efficiently.
//         </p>

//         {/* CARDS */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Post Jobs
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Create and publish new openings.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Applicants
//             </h2>
//             <p className="mt-3 text-gray-400">
//               View and manage candidates.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Schedule Interviews
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Organize interview rounds.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Candidate Search
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Find skilled professionals.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
//             <h2 className="text-3xl font-bold">
//               Hiring Analytics
//             </h2>
//             <p className="mt-3 text-gray-400">
//               Track recruitment performance.
//             </p>
//           </div>

//         </div>

//       </div>

//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function RecruiterDashboard() {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // VALIDATE USER
  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      // NO USER
      if (!storedUser) {

        window.location.href =
          "/login";

        return;

      }

      const parsedUser =
        JSON.parse(storedUser);

      // ROLE PROTECTION
      if (
        parsedUser.role !==
        "recruiter"
      ) {

        window.location.href =
          `/dashboard/${parsedUser.role}`;

        return;

      }

      setUser(parsedUser);

    } catch (error) {

      console.log(
        "Recruiter Dashboard Error:",
        error
      );

      localStorage.clear();

      window.location.href =
        "/login";

      return;

    } finally {

      setLoading(false);

    }

  }, []);

  // LOADING
  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center text-xl">

        Loading Recruiter Dashboard...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[150px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10">

        <h1 className="text-7xl font-black">

          Recruiter Dashboard

        </h1>

        <p className="mt-4 text-gray-400 text-xl">

          Welcome back{" "}

          <span className="text-blue-400 font-bold">

            {user?.name}

          </span>

          👋

        </p>

        <p className="mt-2 text-gray-500">

          Manage hiring and candidates efficiently.

        </p>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">

              Post Jobs

            </h2>

            <p className="mt-3 text-gray-400">

              Create and publish new openings.

            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">

              Applicants

            </h2>

            <p className="mt-3 text-gray-400">

              View and manage candidates.

            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">

              Schedule Interviews

            </h2>

            <p className="mt-3 text-gray-400">

              Organize interview rounds.

            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">

              Candidate Search

            </h2>

            <p className="mt-3 text-gray-400">

              Find skilled professionals.

            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h2 className="text-3xl font-bold">

              Hiring Analytics

            </h2>

            <p className="mt-3 text-gray-400">

              Track recruitment performance.

            </p>

          </div>

        </div>

      </div>

    </main>
  );

}