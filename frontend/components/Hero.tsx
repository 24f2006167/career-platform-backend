// import Link from "next/link";
// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden py-32 px-6">
      
//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/20 blur-[140px] rounded-full" />

//       <div className="relative max-w-5xl mx-auto text-center">
        
//         <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
//           <span className="text-sm text-gray-300">
//             🚀 AI Powered Career Preparation Platform
//           </span>
//         </div>

//         <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
//           <span className="text-white">Crack Your Dream</span>
//           <br />
//           <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             Tech Career
//           </span>
//         </h1>

//         <p className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
//           Practice real interview questions, prepare for top tech companies,
//           improve coding skills, and track your growth with AI-powered guidance.
//         </p>

//         <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">

//   <Link href="/signup">
//     <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition">
//       Start Practicing
//     </button>
//   </Link>

//   <Link href="/roles">
//     <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
//       Explore Roles
//     </button>
//   </Link>

// </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-400">
          AI Career Preparation Platform
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Prepare, verify, and grow your career skills with AI.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Search career roles, follow skill roadmaps, track progress, and get ready for interviews.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/roles"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore Roles
          </Link>

          <Link
            href="/signup"
            className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}