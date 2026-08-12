"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { careerRoadmaps } from "@/services/roleRoadmaps";

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();

  const roleId = params.roleId as string;
  const role = careerRoadmaps.find((item) => item.id === roleId);

  if (!role) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8">
          <h1 className="text-3xl font-black">Role not found</h1>
          <p className="mt-3 text-gray-400">
            This career roadmap does not exist.
          </p>

          <Link
            href="/roles"
            className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-bold text-black"
          >
            Back to Roles
          </Link>
        </div>
      </main>
    );
  }

  const handleSelectRole = () => {
    localStorage.setItem("selectedCareerRole", role.id);
    localStorage.setItem("selectedRoleId", role.id);
    router.push("/dashboard/candidate");
    router.refresh();
  };

  const totalConcepts = role.skills.reduce(
    (total, skill) => total + skill.concepts.length,
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-10 top-10 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/roles">
          <h1 className="bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-black text-transparent">
            Nexvora AI
          </h1>
        </Link>

        <Link
          href="/dashboard/candidate"
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 transition hover:bg-white/10"
        >
          Dashboard
        </Link>
      </nav>

      <section className="mx-auto mt-12 max-w-7xl rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-white/[0.08] via-purple-500/10 to-blue-500/10 p-8 shadow-[0_0_70px_rgba(168,85,247,0.18)]">
        <p className="text-sm font-semibold text-purple-300">
          AI Career Roadmap
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          {role.title}
        </h1>

        <p className="mt-5 max-w-3xl text-gray-400">
          {role.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handleSelectRole}
            className="rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-purple-200"
          >
            Select This Role
          </button>

          <Link
            href="/roles"
            className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-6 py-3 font-bold text-purple-200 transition hover:bg-purple-500/20"
          >
            Back to Roles
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-gray-400">Total Skills</p>
          <h2 className="mt-3 text-4xl font-black">{role.skills.length}</h2>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-gray-400">Total Concepts</p>
          <h2 className="mt-3 text-4xl font-black">{totalConcepts}</h2>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm text-gray-400">Learning Mode</p>
          <h2 className="mt-3 text-4xl font-black">AI</h2>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl space-y-6">
        {role.skills.map((skill, skillIndex) => (
          <div
            key={skill.id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-purple-300">
                  Skill {skillIndex + 1}
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {skill.title}
                </h2>

                <p className="mt-2 max-w-3xl text-gray-400">
                  {skill.description}
                </p>
              </div>

              <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                {skill.concepts.length} concepts
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skill.concepts.map((concept, conceptIndex) => {
                const aiLearningUrl = `/ai-learning?role=${encodeURIComponent(
                  role.title
                )}&skill=${encodeURIComponent(
                  skill.title
                )}&skill_id=${encodeURIComponent(
                  skill.id
                )}&concept=${encodeURIComponent(
                  concept.title
                )}&type=${encodeURIComponent(concept.type)}`;

                const difficulty =
                  concept.difficulty.charAt(0).toUpperCase() +
                  concept.difficulty.slice(1);

                return (
                  <div
                    key={concept.id}
                    className="rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-purple-400/40 hover:bg-purple-500/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-purple-300">
                        Concept {conceptIndex + 1}
                      </p>

                      <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200">
                        {difficulty}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-black">
                      {concept.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-400">
                      {difficulty} level concept in {skill.title}.
                    </p>

                    <Link
                      href={aiLearningUrl}
                      className="mt-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-purple-200"
                    >
                      Start Learning
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}