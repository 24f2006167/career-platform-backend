
// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function SignupPage() {

//   // FORM STATE
//   const [formData, setFormData] =
//     useState({
//       name: "",
//       email: "",
//       password: "",
//       role: "candidate",
//     });

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   // HANDLE INPUT
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement
//     >
//   ) => {

//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });

//   };

//   // HANDLE SIGNUP
//   const handleSignup = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setError("");

//     try {

//       setLoading(true);

//       // CLEAR OLD SESSION
//       await fetch(
//         "http://localhost:8000/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       // CLEAR OLD STORAGE
//       localStorage.clear();

//       // SIGNUP REQUEST
//       const response = await fetch(
//         "http://localhost:8000/signup",
//         {
//           method: "POST",

//           credentials: "include",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           body: JSON.stringify(
//             formData
//           ),
//         }
//       );

//       const data =
//         await response.json();

//       console.log(
//         "SIGNUP RESPONSE:",
//         data
//       );

//       // ERROR
//       if (!response.ok) {

//         setError(
//           data.detail ||
//           "Signup failed"
//         );

//         return;

//       }

//       // SAVE USER
//       localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//       );

//       // NEW USER FLAG
//       localStorage.setItem(
//         "isNewUser",
//         "true"
//       );

//       // REDIRECT
//       setTimeout(() => {

//         // ADMIN
//         if (
//           data.user.role ===
//           "admin"
//         ) {

//           window.location.href =
//             "/dashboard/admin";

//         }

//         // RECRUITER
//         else if (
//           data.user.role ===
//           "recruiter"
//         ) {

//           window.location.href =
//             "/dashboard/recruiter";

//         }

//         // CANDIDATE
//         else {

//           window.location.href =
//             "/dashboard/candidate";

//         }

//       }, 300);

//     } catch (error) {

//       console.log(
//         "SIGNUP ERROR:",
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
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[150px] rounded-full" />

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10">

//         {/* HEADER */}
//         <div className="mb-8 text-center">

//           <h1 className="text-5xl font-black">
//             Create Account
//           </h1>

//           <p className="mt-3 text-gray-400">
//             Start your AI-powered career journey.
//           </p>

//         </div>

//         {/* ERROR */}
//         {error && (

//           <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm">

//             {error}

//           </div>

//         )}

//         {/* FORM */}
//         <form
//           onSubmit={handleSignup}
//           className="space-y-6"
//         >

//           {/* NAME */}
//           <div>

//             <label className="mb-2 block text-sm text-gray-300">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               required
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//             />

//           </div>

//           {/* EMAIL */}
//           <div>

//             <label className="mb-2 block text-sm text-gray-300">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               required
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//             />

//           </div>

//           {/* PASSWORD */}
//           <div>

//             <label className="mb-2 block text-sm text-gray-300">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               required
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//             />

//           </div>

//           {/* ROLE */}
//           <div>

//             <label className="mb-3 block text-sm text-gray-300">
//               Select Role
//             </label>

//             <div className="grid grid-cols-2 gap-4">

//               {/* CANDIDATE */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     role: "candidate",
//                   })
//                 }
//                 className={`rounded-2xl border px-5 py-4 font-semibold transition-all duration-300

//                 ${
//                   formData.role ===
//                   "candidate"
//                     ? "border-pink-500 bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20"
//                     : "border-white/10 bg-black/30 text-gray-400 hover:border-pink-500/40"
//                 }`}
//               >

//                 Candidate

//               </button>

//               {/* RECRUITER */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     role: "recruiter",
//                   })
//                 }
//                 className={`rounded-2xl border px-5 py-4 font-semibold transition-all duration-300

//                 ${
//                   formData.role ===
//                   "recruiter"
//                     ? "border-purple-500 bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20"
//                     : "border-white/10 bg-black/30 text-gray-400 hover:border-purple-500/40"
//                 }`}
//               >

//                 Recruiter

//               </button>

//             </div>

//             {/* ROLE DESCRIPTION */}
//             <p className="mt-3 text-sm text-gray-500">

//               {formData.role ===
//               "candidate"
//                 ? "Practice interviews and track your growth."
//                 : "Hire and manage talented candidates."}

//             </p>

//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-white py-4 text-black font-bold transition hover:scale-[1.02] disabled:opacity-50"
//           >

//             {loading
//               ? "Creating Account..."
//               : "Signup"}

//           </button>

//         </form>

//         {/* LOGIN */}
//         <p className="mt-8 text-center text-gray-500">

//           Already have an account?{" "}

//           <Link
//             href="/login"
//             className="text-pink-400 hover:text-pink-300"
//           >

//             Login

//           </Link>

//         </p>

//       </div>

//     </main>

//   );

// }

"use client";

import Link from "next/link";
import { useState } from "react";

import API from "@/lib/api";

export default function SignupPage() {

  // FORM STATE
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "candidate",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // HANDLE SIGNUP
  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      // CLEAR OLD SESSION
      await API.post(
        "/logout"
      );

      // CLEAR OLD STORAGE
      localStorage.clear();

      // SIGNUP REQUEST
      const response =
        await API.post(
          "/signup",
          formData
        );

      const data =
        response.data;

      console.log(
        "SIGNUP RESPONSE:",
        data
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // NEW USER FLAG
      localStorage.setItem(
        "isNewUser",
        "true"
      );

      // REDIRECT
      setTimeout(() => {

        // ADMIN
        if (
          data.user.role ===
          "admin"
        ) {

          window.location.href =
            "/dashboard/admin";

        }

        // RECRUITER
        else if (
          data.user.role ===
          "recruiter"
        ) {

          window.location.href =
            "/dashboard/recruiter";

        }

        // CANDIDATE
        else {

          window.location.href =
            "/dashboard/candidate";

        }

      }, 300);

    } catch (error: any) {

      console.log(
        "SIGNUP ERROR:",
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[150px] rounded-full" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black">
            Create Account
          </h1>

          <p className="mt-3 text-gray-400">
            Start your AI-powered career journey.
          </p>

        </div>

        {/* ERROR */}
        {error && (

          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm">

            {error}

          </div>

        )}

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >

          {/* NAME */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
            />

          </div>

          {/* ROLE */}
          <div>

            <label className="mb-3 block text-sm text-gray-300">
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-4">

              {/* CANDIDATE */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "candidate",
                  })
                }
                className={`rounded-2xl border px-5 py-4 font-semibold transition-all duration-300

                ${
                  formData.role ===
                  "candidate"
                    ? "border-pink-500 bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20"
                    : "border-white/10 bg-black/30 text-gray-400 hover:border-pink-500/40"
                }`}
              >

                Candidate

              </button>

              {/* RECRUITER */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "recruiter",
                  })
                }
                className={`rounded-2xl border px-5 py-4 font-semibold transition-all duration-300

                ${
                  formData.role ===
                  "recruiter"
                    ? "border-purple-500 bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/20"
                    : "border-white/10 bg-black/30 text-gray-400 hover:border-purple-500/40"
                }`}
              >

                Recruiter

              </button>

            </div>

            {/* ROLE DESCRIPTION */}
            <p className="mt-3 text-sm text-gray-500">

              {formData.role ===
              "candidate"
                ? "Practice interviews and track your growth."
                : "Hire and manage talented candidates."}

            </p>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 text-black font-bold transition hover:scale-[1.02] disabled:opacity-50"
          >

            {loading
              ? "Creating Account..."
              : "Signup"}

          </button>

        </form>

        {/* LOGIN */}
        <p className="mt-8 text-center text-gray-500">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-pink-400 hover:text-pink-300"
          >

            Login

          </Link>

        </p>

      </div>

    </main>

  );

}