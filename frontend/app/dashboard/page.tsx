"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.replace("/dashboard/candidate");
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      const role = (user.role || "candidate").toLowerCase();

      if (role === "admin") {
        router.replace("/dashboard/admin");
      } else if (role === "recruiter") {
        router.replace("/dashboard/recruiter");
      } else {
        router.replace("/dashboard/candidate");
      }
    } catch {
      router.replace("/dashboard/candidate");
    }
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-white">
      Redirecting to your AI dashboard...
    </div>
  );
}