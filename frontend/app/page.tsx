import Link from "next/link";
export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold tracking-tight">
              Nexvora AI
          </h1>

          <div className="hidden gap-8 md:flex">
            <a href="#" className="text-gray-300 hover:text-white">
              Roles
            </a>

            <a href="#" className="text-gray-300 hover:text-white">
              Practice
            </a>

            <a href="#" className="text-gray-300 hover:text-white">
              Companies
            </a>

            <a href="#" className="text-gray-300 hover:text-white">
              Dashboard
            </a>
          </div>

          <Link href="/login">
            <button className="rounded-xl bg-white px-5 py-2 font-medium text-black transition hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* GRADIENT BACKGROUND */}
        <div className="absolute inset-0 -z-10">

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/30 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-3xl" />

        </div>

        <div className="max-w-5xl">

          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            🚀 AI Powered Career Preparation Platform
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Crack Your Dream
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {" "}Tech Career
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
            Practice role-based interview questions, improve your skills,
            and prepare for real company hiring rounds with AI-driven guidance.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link href="/signup">
            <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105">
              Start Practicing
            </button>
          </Link>

          <Link href="/roles">
            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg backdrop-blur-xl transition hover:bg-white/10">
              Explore Roles
            </button>
          </Link>

          </div>

        </div>
      </section>

      {/* ROLE SECTION */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <h2 className="text-4xl font-bold">
              Explore Career Roles
            </h2>

            <p className="mt-4 text-gray-400">
              Practice skills required by top companies.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {/* CARD 1 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-500/50">

              <div className="mb-5 text-5xl">💻</div>

              <h3 className="text-2xl font-bold">
                Frontend Developer
              </h3>

              <p className="mt-3 text-gray-400">
                React, Next.js, TypeScript, Tailwind CSS
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
                  ₹12-25 LPA
                </span>

                <button className="text-purple-400 transition hover:text-purple-300">
                  Practice →
                </button>

              </div>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-500/50">

              <div className="mb-5 text-5xl">🤖</div>

              <h3 className="text-2xl font-bold">
                AI Engineer
              </h3>

              <p className="mt-3 text-gray-400">
                Python, ML, Deep Learning, GenAI, LLMs
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                  ₹18-40 LPA
                </span>

                <button className="text-blue-400 transition hover:text-blue-300">
                  Practice →
                </button>

              </div>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-pink-500/50">

              <div className="mb-5 text-5xl">☁️</div>

              <h3 className="text-2xl font-bold">
                Cloud Engineer
              </h3>

              <p className="mt-3 text-gray-400">
                AWS, Docker, Kubernetes, DevOps, CI/CD
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full bg-pink-500/20 px-4 py-2 text-sm text-pink-300">
                  ₹15-35 LPA
                </span>

                <button className="text-pink-400 transition hover:text-pink-300">
                  Practice →
                </button>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* COMPANY SECTION */}
<section className="px-6 pb-28">

  <div className="mx-auto max-w-7xl">

    <div className="mb-14 text-center">

      <h2 className="text-4xl font-bold">
        Prepare For Top Companies
      </h2>

      <p className="mt-4 text-gray-400">
        Practice interview rounds inspired by real hiring patterns.
      </p>

    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* COMPANY CARD */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">

        <div className="mb-6 text-5xl">🟦</div>

        <h3 className="text-2xl font-bold">
          Google
        </h3>

        <p className="mt-3 text-gray-400">
          DSA • System Design • React • Backend
        </p>

        <button className="mt-6 text-blue-400 hover:text-blue-300">
          Start Practice →
        </button>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">

        <div className="mb-6 text-5xl">🟩</div>

        <h3 className="text-2xl font-bold">
          Microsoft
        </h3>

        <p className="mt-3 text-gray-400">
          Full Stack • Azure • Problem Solving
        </p>

        <button className="mt-6 text-green-400 hover:text-green-300">
          Start Practice →
        </button>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">

        <div className="mb-6 text-5xl">🟧</div>

        <h3 className="text-2xl font-bold">
          Amazon
        </h3>

        <p className="mt-3 text-gray-400">
          Leadership Principles • DSA • APIs
        </p>

        <button className="mt-6 text-orange-400 hover:text-orange-300">
          Start Practice →
        </button>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">

        <div className="mb-6 text-5xl">🧠</div>

        <h3 className="text-2xl font-bold">
          OpenAI
        </h3>

        <p className="mt-3 text-gray-400">
          GenAI • LLMs • Deep Learning • Python
        </p>

        <button className="mt-6 text-pink-400 hover:text-pink-300">
          Start Practice →
        </button>

      </div>

    </div>

  </div>

</section>


{/* AI INTERVIEW SECTION */}
<section className="px-6 pb-32">

  <div className="mx-auto grid max-w-7xl items-center gap-14 rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl lg:grid-cols-2">

    {/* LEFT CONTENT */}
    <div>

      <div className="mb-5 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
        🤖 AI Interview Assistant
      </div>

      <h2 className="text-5xl font-bold leading-tight">
        Practice Real
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {" "}AI Mock Interviews
        </span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-400">
        Simulate real technical interviews with AI-generated
        questions, instant feedback, and personalized preparation paths.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">

        <button className="rounded-2xl bg-white px-7 py-4 font-semibold text-black transition hover:scale-105">
          Start AI Interview
        </button>

        <button className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 transition hover:bg-white/10">
          View Demo
        </button>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="relative">

      <div className="rounded-[32px] border border-white/10 bg-black/40 p-8">

        <div className="mb-6 flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <div className="space-y-6">

          <div className="rounded-2xl bg-purple-500/10 p-5">
            <p className="text-purple-300">
              AI Interviewer
            </p>

            <p className="mt-2 text-gray-300">
              Explain the difference between Server Components and Client Components in Next.js.
            </p>
          </div>

          <div className="ml-auto max-w-[85%] rounded-2xl bg-white/10 p-5">
            <p className="text-gray-300">
              Server Components render on the server while Client Components run in the browser...
            </p>
          </div>

          <div className="rounded-2xl bg-blue-500/10 p-5">
            <p className="text-blue-300">
              AI Feedback
            </p>

            <p className="mt-2 text-gray-300">
              Great answer. You explained rendering flow correctly.
              Try adding hydration details for a stronger response.
            </p>
          </div>

        </div>

      </div>

      {/* GLOW */}
      <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />

    </div>

  </div>

</section>

{/* STATS SECTION */}
<section className="px-6 pb-28">

  <div className="mx-auto max-w-7xl">

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* STAT 1 */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-8 backdrop-blur-xl">

        <h3 className="text-5xl font-bold text-purple-400">
          50K+
        </h3>

        <p className="mt-4 text-lg text-gray-300">
          Active Learners
        </p>

      </div>

      {/* STAT 2 */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-8 backdrop-blur-xl">

        <h3 className="text-5xl font-bold text-blue-400">
          120+
        </h3>

        <p className="mt-4 text-lg text-gray-300">
          Career Roles
        </p>

      </div>

      {/* STAT 3 */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-transparent p-8 backdrop-blur-xl">

        <h3 className="text-5xl font-bold text-pink-400">
          300+
        </h3>

        <p className="mt-4 text-lg text-gray-300">
          Company Interview Sets
        </p>

      </div>

      {/* STAT 4 */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-transparent p-8 backdrop-blur-xl">

        <h3 className="text-5xl font-bold text-green-400">
          92%
        </h3>

        <p className="mt-4 text-lg text-gray-300">
          Success Improvement
        </p>

      </div>

    </div>

  </div>

</section>

{/* FOOTER */}
<footer className="border-t border-white/10 px-6 py-14">

  <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">

    {/* BRAND */}
    <div>

      <h2 className="text-3xl font-bold">
        Nexvora AI
      </h2>

      <p className="mt-4 leading-7 text-gray-400">
        AI-powered platform for skill mastery, interview preparation, and career growth.
      </p>

    </div>

    {/* PLATFORM */}
    <div>

      <h3 className="mb-5 text-lg font-semibold">
        Platform
      </h3>

      <div className="space-y-3 text-gray-400">

        <p>Career Roles</p>
        <p>Practice Tests</p>
        <p>AI Interviews</p>
        <p>Leaderboard</p>

      </div>

    </div>

    {/* RESOURCES */}
    <div>

      <h3 className="mb-5 text-lg font-semibold">
        Resources
      </h3>

      <div className="space-y-3 text-gray-400">

        <p>Roadmaps</p>
        <p>Company Questions</p>
        <p>AI Notes</p>
        <p>Mock Interviews</p>

      </div>

    </div>

    {/* CONTACT */}
    <div>

      <h3 className="mb-5 text-lg font-semibold">
        Contact
      </h3>

      <div className="space-y-3 text-gray-400">

        <p>support@nexvora.ai</p>
        <p>LinkedIn</p>
        <p>Twitter</p>
        <p>GitHub</p>

      </div>

    </div>

  </div>

  {/* BOTTOM */}
  <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-center text-gray-500">

    © 2026 Nexvora AI. All rights reserved.

  </div>

</footer>

    </main>
  );
}