"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { logoutUser } from "@/services/auth";

interface TopbarProps {
  user: User;
}

export default function Topbar({ user }: TopbarProps) {
  const router = useRouter();
  const role = (user.role || "candidate").toLowerCase();

  const handleLogout = () => {
    logoutUser();
    router.replace("/login");
  };

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "recruiter"
      ? "/dashboard/recruiter"
      : "/dashboard/candidate";

  const badgeText =
    role === "admin"
      ? "Admin Control Center"
      : role === "recruiter"
      ? "Recruiter Workspace"
      : "AI Career Dashboard";

  const welcomeTitle =
    role === "admin"
      ? "Manage Nexvora AI Platform"
      : role === "recruiter"
      ? "Manage Hiring Workspace"
      : `Welcome, ${user.full_name || user.username || "User"}`;

  const actionLinks =
    role === "admin"
      ? [
          { name: "Dashboard", href: dashboardPath },
          { name: "Job Roles", href: "/dashboard/admin/roles" },
          { name: "Users", href: "/dashboard/admin/users" },
          { name: "Skills", href: "/dashboard/admin/skills" },
          { name: "Categories", href: "/dashboard/admin/categories" },
        ]
      : role === "recruiter"
      ? [
          { name: "Dashboard", href: dashboardPath },
          { name: "Candidates", href: "/dashboard/recruiter/candidates" },
          { name: "Jobs", href: "/dashboard/recruiter/jobs" },
        ]
      : [
          { name: "Dashboard", href: dashboardPath },
          { name: "Choose Role", href: "/select-role" },
          { name: "Learning Studio", href: "/ai-learning" },
        ];

  return (
    <header className="sticky top-0 z-30 border-b border-purple-500/20 bg-black/75 px-4 py-4 text-white shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-2xl sm:px-6">
      <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="min-w-0">
          <p className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
            {badgeText}
          </p>

          <h1 className="mt-2 max-w-[520px] truncate text-xl font-black tracking-tight sm:text-2xl">
            {welcomeTitle}
          </h1>
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-end">
          <nav className="flex max-w-full flex-wrap gap-2">
            {actionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:border-purple-400/50 hover:bg-purple-500/20"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="max-w-[240px] truncate text-sm font-semibold">
                {user.email}
              </p>

              <p className="text-xs capitalize text-gray-400">
                {role === "admin"
                  ? "Platform Admin"
                  : role === "recruiter"
                  ? "Recruiter"
                  : "Candidate"}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-lg font-bold uppercase shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              {(user.full_name || user.username || "U").charAt(0)}
            </div>

            <button
              onClick={handleLogout}
              className="shrink-0 rounded-2xl border border-white/10 bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105 hover:bg-white/90"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}