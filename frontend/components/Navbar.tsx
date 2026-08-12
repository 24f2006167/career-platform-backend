// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <header className="w-full border-b border-white/10 bg-black/70 backdrop-blur-xl sticky top-0 z-50">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* LOGO */}
//         <Link href="/">
//           <h1 className="text-3xl font-bold tracking-tight">
//             <span className="text-white">Nexvora</span>
//             <span className="text-purple-500">AI</span>
//           </h1>
//         </Link>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
//           <Link href="/" className="hover:text-white transition">
//             Home
//           </Link>

//           <Link href="/roles" className="hover:text-white transition">
//             Roles
//           </Link>

//           <Link href="/practice" className="hover:text-white transition">
//             Practice
//           </Link>

//           <Link href="/companies" className="hover:text-white transition">
//             Companies
//           </Link>

//           <Link href="/dashboard" className="hover:text-white transition">
//             Dashboard
//           </Link>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex items-center gap-4">
//           <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:scale-105 transition">
//             Login
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// }


"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <Link href="/" className="text-2xl font-bold text-slate-900">
        Nexvora AI
      </Link>

      <div className="hidden items-center gap-6 md:flex">
        <Link href="/" className="text-sm font-medium text-slate-700">
          Home
        </Link>

        <Link href="/roles" className="text-sm font-medium text-slate-700">
          Roles
        </Link>

        <Link href="/login" className="text-sm font-medium text-slate-700">
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}