
// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardPage() {

//   const [loading, setLoading] =
//     useState(true);

//   const [user, setUser] =
//     useState<any>(null);

//   const [isNewUser, setIsNewUser] =
//     useState(false);

//   // LOAD USER
//   useEffect(() => {

//     const storedUser =
//       localStorage.getItem("user");

//     // NO USER
//     if (!storedUser) {

//       window.location.href =
//         "/login";

//       return;

//     }

//     try {

//       const parsedUser =
//         JSON.parse(storedUser);

//       setUser(parsedUser);

//       setIsNewUser(
//         localStorage.getItem(
//           "isNewUser"
//         ) === "true"
//       );

//     } catch (error) {

//       console.log(
//         "User Parse Error:",
//         error
//       );

//       window.location.href =
//         "/login";

//       return;

//     }

//     setLoading(false);

//   }, []);

//   // LOADING
//   if (loading) {

//     return (

//       <main className="min-h-screen bg-black text-white flex items-center justify-center text-xl">

//         Loading Dashboard...

//       </main>

//     );

//   }

//   return (

//     <main className="min-h-screen bg-black text-white px-10 py-16 relative overflow-hidden">

//       {/* BACKGROUND */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 blur-[180px] rounded-full" />

//       {/* CONTENT */}
//       <div className="relative">

//         {/* HEADER */}
//         <div className="mb-14">

//           <h1 className="text-7xl font-black">

//             Dashboard

//           </h1>

//           {/* GREETING */}
//           <p className="mt-5 text-3xl text-gray-300">

//             {isNewUser
//               ? "Welcome"
//               : "Welcome back"}

//             {" "}

//             <span className="text-purple-400 font-bold">

//               {user?.name || "User"}

//             </span>

//             {isNewUser
//               ? " 🎉"
//               : " 👋"}

//           </p>

//           {/* MESSAGE */}
//           <p className="mt-3 text-lg text-gray-400">

//             {isNewUser
//               ? "Your account has been created successfully."
//               : "Ready to continue your preparation journey?"}

//           </p>

//           {/* ROLE */}
//           <p className="mt-4 text-lg text-gray-400">

//             Role:{" "}

//             <span className="capitalize text-pink-400 font-semibold">

//               {user?.role || "Candidate"}

//             </span>

//           </p>

//         </div>

//         {/* CARDS */}
//         <div className="grid gap-8 md:grid-cols-3">

//           {/* CARD 1 */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

//             <h2 className="text-3xl font-bold">

//               Practice Questions

//             </h2>

//             <p className="mt-4 text-gray-400 text-lg">

//               Solve AI-generated interview questions.

//             </p>

//           </div>

//           {/* CARD 2 */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

//             <h2 className="text-3xl font-bold">

//               Mock Interviews

//             </h2>

//             <p className="mt-4 text-gray-400 text-lg">

//               Practice real interview rounds.

//             </p>

//           </div>

//           {/* CARD 3 */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

//             <h2 className="text-3xl font-bold">

//               Track Progress

//             </h2>

//             <p className="mt-4 text-gray-400 text-lg">

//               Monitor your preparation journey.

//             </p>

//           </div>

//         </div>

//       </div>

//     </main>

//   );

// }

"use client";

import { useEffect, useState } from "react";

export default function CandidateDashboardPage() {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [isNewUser, setIsNewUser] =
    useState(false);

  // LOAD USER
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
        "candidate"
      ) {

        window.location.href =
          `/dashboard/${parsedUser.role}`;

        return;

      }

      setUser(parsedUser);

      setIsNewUser(
        localStorage.getItem(
          "isNewUser"
        ) === "true"
      );

    } catch (error) {

      console.log(
        "Dashboard Error:",
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

        Loading Dashboard...

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white px-10 py-16 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 blur-[180px] rounded-full" />

      {/* CONTENT */}
      <div className="relative">

        {/* HEADER */}
        <div className="mb-14">

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

            {isNewUser
              ? " 🎉"
              : " 👋"}

          </p>

          {/* MESSAGE */}
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

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold">

              Practice Questions

            </h2>

            <p className="mt-4 text-gray-400 text-lg">

              Solve AI-generated interview questions.

            </p>

          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold">

              Mock Interviews

            </h2>

            <p className="mt-4 text-gray-400 text-lg">

              Practice real interview rounds.

            </p>

          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="text-3xl font-bold">

              Track Progress

            </h2>

            <p className="mt-4 text-gray-400 text-lg">

              Monitor your preparation journey.

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}