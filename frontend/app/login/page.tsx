// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function LoginPage() {

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   // LOGIN
//   const handleLogin = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setError("");

//     try {

//       setLoading(true);

//       // FORM DATA
//       const formData =
//         new URLSearchParams();

//       formData.append(
//         "username",
//         email
//       );

//       formData.append(
//         "password",
//         password
//       );

//       // API REQUEST
//       const response = await fetch(
//         // "http://127.0.0.1:8000/login",
//         "http://localhost:8000/login",
//         {
//           method: "POST",

//           credentials: "include",

//           headers: {
//             "Content-Type":
//               "application/x-www-form-urlencoded",
//           },

//           body: formData.toString(),
//         }
//       );

//       const data =
//         await response.json();

//       console.log(
//         "LOGIN RESPONSE:",
//         data
//       );

//       // ERROR
//       if (!response.ok) {

//         setError(
//           data.detail ||
//           "Login failed"
//         );

//         return;

//       }

//       // SAVE USER
//       localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//       );

//       // OLD USER
//       localStorage.setItem(
//         "isNewUser",
//         "false"
//       );

//       // REDIRECT
//       if (
//         data.user.role === "admin"
//       ) {

//         window.location.href =
//           "/dashboard/admin";

//       } else if (
//         data.user.role === "recruiter"
//       ) {

//         window.location.href =
//           "/dashboard/recruiter";

//       } else {

//         window.location.href =
//           "/dashboard/candidate";

//       }

//     } catch (error) {

//       console.log(
//         "LOGIN ERROR:",
//         error
//       );

//       setError(
//         "Server connection error"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

//       {/* BACKGROUND */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/20 blur-[160px] rounded-full" />

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10">

//         <h1 className="text-5xl font-black text-center">
//           Welcome Back
//         </h1>

//         <p className="mt-4 text-center text-gray-400">
//           Continue your AI-powered career journey.
//         </p>

//         {/* ERROR */}
//         {error && (

//           <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm">

//             {error}

//           </div>

//         )}

//         {/* FORM */}
//         <form
//           onSubmit={handleLogin}
//           className="mt-8 space-y-6"
//         >

//           {/* EMAIL */}
//           <div>

//             <label className="text-gray-400">
//               Email
//             </label>

//             <input
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(
//                   e.target.value
//                 )
//               }
//               required
//               className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-purple-500"
//             />

//           </div>

//           {/* PASSWORD */}
//           <div>

//             <label className="text-gray-400">
//               Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(
//                   e.target.value
//                 )
//               }
//               required
//               className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-purple-500"
//             />

//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-white py-4 text-black font-bold transition hover:scale-[1.02] disabled:opacity-50"
//           >

//             {loading
//               ? "Logging in..."
//               : "Login"}

//           </button>

//         </form>

//         {/* SIGNUP */}
//         <p className="mt-8 text-center text-gray-500">

//           Don’t have an account?{" "}

//           <Link
//             href="/signup"
//             className="text-purple-400 hover:text-purple-300"
//           >
//             Signup
//           </Link>

//         </p>

//       </div>

//     </main>

//   );

// }

"use client";

import { useState } from "react";
import Link from "next/link";

import API from "@/lib/api";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // LOGIN
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      // FORM DATA
      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      // API REQUEST
      const response =
        await API.post(
          "/login",
          formData,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
          }
        );

      const data =
        response.data;

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // OLD USER
      localStorage.setItem(
        "isNewUser",
        "false"
      );

      // REDIRECT
      if (
        data.user.role ===
        "admin"
      ) {

        window.location.href =
          "/dashboard/admin";

      }

      else if (
        data.user.role ===
        "recruiter"
      ) {

        window.location.href =
          "/dashboard/recruiter";

      }

      else {

        window.location.href =
          "/dashboard/candidate";

      }

    } catch (error: any) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      setError(
        error?.response?.data?.detail ||
        "Server connection error"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/20 blur-[160px] rounded-full" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10">

        <h1 className="text-5xl font-black text-center">
          Welcome Back
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Continue your AI-powered career journey.
        </p>

        {/* ERROR */}
        {error && (

          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm">

            {error}

          </div>

        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="text-gray-400">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-gray-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-purple-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 text-black font-bold transition hover:scale-[1.02] disabled:opacity-50"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        {/* SIGNUP */}
        <p className="mt-8 text-center text-gray-500">

          Don’t have an account?{" "}

          <Link
            href="/signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Signup
          </Link>

        </p>

      </div>

    </main>

  );

}