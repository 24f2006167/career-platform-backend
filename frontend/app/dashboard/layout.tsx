"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getCurrentUser } from "@/services/auth";
import { User } from "@/types/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const getDashboardPath = (role?: string) => {
    const cleanRole = (role || "candidate").toLowerCase();

    if (cleanRole === "admin") return "/dashboard/admin";
    if (cleanRole === "recruiter") return "/dashboard/recruiter";

    return "/dashboard/candidate";
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const currentUser = await getCurrentUser();

        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));

        if (pathname === "/dashboard") {
          router.replace(getDashboardPath(currentUser.role));
        }
      } catch (error) {
        console.error("Dashboard auth check failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.replace("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [router, pathname]);

  if (checkingAuth) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative rounded-3xl border border-white/10 bg-white/5 px-8 py-6 shadow-2xl backdrop-blur-xl">
          Checking AI authentication...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#08090e] text-white">
      {children}
    </div>
  );
}