
// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import API from "@/services/api";

// export default function SignupPage() {

//   const router = useRouter();

//   // REDIRECT IF LOGGED IN
//   useEffect(() => {

//     const token = localStorage.getItem("token");

//     if (token) {

//       router.replace("/");

//     }

//   }, [router]);

//   // FORM STATE
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "candidate",
//   });

//   const [loading, setLoading] = useState(false);

//   // HANDLE INPUT
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement
//     >
//   ) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//   };

//   // HANDLE SIGNUP
//   const handleSignup = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       // API REQUEST
//       const response = await API.post(
//         "/signup",
//         formData
//       );

//       // SAVE TOKEN
//       localStorage.setItem(
//         "token",
//         response.data.access_token
//       );

//       // SAVE USER
//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.data.user)
//       );

//       // NEW USER
//       localStorage.setItem(
//         "isNewUser",
//         "true"
//       );

//       alert("Signup successful!");

//       // ROLE BASED REDIRECT
//       const role = response.data.user.role;

//       if (role === "candidate") {

//         router.push(
//           "/dashboard/candidate"
//         );

//       }

//       else if (role === "recruiter") {

//         router.push(
//           "/dashboard/recruiter"
//         );

//       }

//       else if (role === "admin") {

//         router.push(
//           "/dashboard/admin"
//         );

//       }

//       else {

//         router.push("/");

//       }

//     } catch (error: any) {

//       console.log(error);

//       const errorMessage =
//         error?.response?.data?.detail ||
//         error?.response?.data?.message ||
//         "Signup failed";

//       alert(errorMessage);

//       // EMAIL ALREADY EXISTS
//       if (
//         errorMessage ===
//         "Email already registered"
//       ) {

//         setTimeout(() => {

//           router.push("/login");

//         }, 1000);

//       }

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//     <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

//       {/* BACKGROUND */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[150px] rounded-full" />

//       {/* CARD */}
//       <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

//         {/* HEADER */}
//         <div className="mb-8 text-center">

//           <h1 className="text-5xl font-black">
//             Create Account
//           </h1>

//           <p className="mt-3 text-gray-400">
//             Start your AI-powered career journey.
//           </p>

//         </div>

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
//               placeholder="Enter your full name"
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//               required
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
//               placeholder="Enter your email"
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//               required
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
//               placeholder="Create password"
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//               required
//             />

//           </div>

//           {/* ROLE */}
//           <div>

//             <label className="mb-2 block text-sm text-gray-300">
//               Select Role
//             </label>

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
//             >

//               <option value="candidate">
//                 Candidate
//               </option>

//               <option value="recruiter">
//                 Recruiter
//               </option>

//             </select>

//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
//           >

//             {loading
//               ? "Creating Account..."
//               : "Create Account"}

//           </button>

//         </form>

//         {/* FOOTER */}
//         <p className="mt-8 text-center text-gray-400">

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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function SignupPage() {

  const router = useRouter();

  // REDIRECT IF LOGGED IN
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      router.replace("/");

    }

  }, [router]);

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE SIGNUP
  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      // API REQUEST
      const response = await API.post(
        "/signup",
        formData
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // NEW USER
      localStorage.setItem(
        "isNewUser",
        "true"
      );

      alert("Signup successful!");

      // REDIRECT TO CANDIDATE DASHBOARD
      router.push(
        "/dashboard/candidate"
      );

    } catch (error: any) {

      console.log(error);

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Signup failed";

      alert(errorMessage);

      // EMAIL EXISTS
      if (
        errorMessage ===
        "Email already registered"
      ) {

        setTimeout(() => {

          router.push("/login");

        }, 1000);

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[150px] rounded-full" />

      {/* CARD */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black">
            Candidate Signup
          </h1>

          <p className="mt-3 text-gray-400">
            Start your AI-powered career preparation journey.
          </p>

        </div>

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
              placeholder="Enter your full name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
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
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
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
              placeholder="Create password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-pink-500"
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >

            {loading
              ? "Creating Account..."
              : "Create Candidate Account"}

          </button>

        </form>

        {/* RECRUITER SECTION */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">

          <p className="text-gray-400">
            Hiring for your company?
          </p>

          <Link
            href="/recruiter/signup"
            className="mt-4 inline-block rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600 transition"
          >
            Recruiter Signup
          </Link>

        </div>

        {/* LOGIN */}
        <p className="mt-8 text-center text-gray-400">

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