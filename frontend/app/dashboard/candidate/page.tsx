"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    // NO LOGIN
    if (!token) {

      router.replace("/login");

      return;
    }

    // NO USER DATA
    if (!storedUser) {

      setTimeout(() => {

        const retryUser = localStorage.getItem("user");

        if (retryUser) {

          setUser(JSON.parse(retryUser));

        }

        setLoading(false);

      }, 300);

      return;
    }

    // USER EXISTS
    setUser(JSON.parse(storedUser));

    setLoading(false);

  }, [router]);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("isNewUser");

    router.replace("/login");

  };

  // LOADING
  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Loading...
      </main>
    );

  }

  const isNewUser =
    localStorage.getItem("isNewUser") === "true";

  return (

    <main className="min-h-screen bg-black text-white px-10 py-16 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 blur-[180px] rounded-full" />

      {/* TOP */}
      <div className="relative flex items-start justify-between mb-14">

        <div>

          <h1 className="text-7xl font-black">
            Dashboard
          </h1>

          {/* GREETING */}
          <p className="mt-5 text-3xl text-gray-300">

            {isNewUser
              ? "Welcome"
              : "Welcome back"}

            {" "}

            <span className="text-purple-400 font-bold">

              {user?.name || "User"}

            </span>

            {isNewUser ? " 🎉" : " 👋"}

          </p>

          {/* SUB MESSAGE */}
          <p className="mt-3 text-lg text-gray-400">

            {isNewUser
              ? "Your account has been created successfully."
              : "Ready to continue your preparation journey?"}

          </p>

          {/* ROLE */}
          <p className="mt-4 text-lg text-gray-400">

            Role:{" "}

            <span className="capitalize text-pink-400 font-semibold">

              {user?.role || "Candidate"}

            </span>

          </p>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="rounded-2xl bg-red-500 px-7 py-3 text-lg font-bold hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      {/* CARDS */}
      <div className="relative grid gap-8 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-bold">
            Practice Questions
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Solve AI-generated interview questions.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-bold">
            Mock Interviews
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Practice real interview rounds.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-bold">
            Track Progress
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Monitor your preparation journey.
          </p>

        </div>

      </div>

    </main>
  );
}