export default function RolesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold">
            Explore Career Roles
          </h1>

          <p className="mt-5 text-lg text-gray-400">
            Select a role and start preparing with AI-powered practice.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {/* ROLE CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-purple-500/40 transition">

            <div className="text-5xl mb-5">
              💻
            </div>

            <h2 className="text-2xl font-bold">
              Frontend Developer
            </h2>

            <p className="mt-4 text-gray-400">
              React, Next.js, Tailwind CSS, TypeScript
            </p>

            <button className="mt-8 rounded-xl bg-purple-500 px-6 py-3 font-semibold hover:bg-purple-400 transition">
              Start Practice
            </button>

          </div>

          {/* ROLE CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-blue-500/40 transition">

            <div className="text-5xl mb-5">
              🤖
            </div>

            <h2 className="text-2xl font-bold">
              AI Engineer
            </h2>

            <p className="mt-4 text-gray-400">
              Python, Machine Learning, Deep Learning, LLMs
            </p>

            <button className="mt-8 rounded-xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-400 transition">
              Start Practice
            </button>

          </div>

          {/* ROLE CARD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-pink-500/40 transition">

            <div className="text-5xl mb-5">
              ☁️
            </div>

            <h2 className="text-2xl font-bold">
              Cloud Engineer
            </h2>

            <p className="mt-4 text-gray-400">
              AWS, Docker, Kubernetes, DevOps
            </p>

            <button className="mt-8 rounded-xl bg-pink-500 px-6 py-3 font-semibold hover:bg-pink-400 transition">
              Start Practice
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}