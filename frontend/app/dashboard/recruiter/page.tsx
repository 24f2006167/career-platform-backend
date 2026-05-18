"use client";

import { useRouter } from "next/navigation";

export default function RecruiterDashboard() {

  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isNewUser");

    router.replace("/login");

  };

  return (

    <main className="min-h-screen bg-black text-white p-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[150px] rounded-full" />

      {/* LOGOUT */}
      <div className="flex justify-end">

        <button
          onClick={logout}
          className="rounded-2xl bg-red-500 px-6 py-3 font-bold hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        <h1 className="text-7xl font-black">
          Recruiter Dashboard
        </h1>

        <p className="mt-4 text-gray-400 text-xl">
          Manage hiring and candidates efficiently.
        </p>

        {/* CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">
              Post Jobs
            </h2>
            <p className="mt-3 text-gray-400">
              Create and publish new openings.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">
              Applicants
            </h2>
            <p className="mt-3 text-gray-400">
              View and manage candidates.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">
              Schedule Interviews
            </h2>
            <p className="mt-3 text-gray-400">
              Organize interview rounds.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">
              Candidate Search
            </h2>
            <p className="mt-3 text-gray-400">
              Find skilled professionals.
            </p>
          </div>

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