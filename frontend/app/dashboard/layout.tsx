"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    // NO TOKEN
    if (!token) {

      router.replace("/login");

      return;

    }

    // NO USER
    if (!storedUser) {

      localStorage.clear();

      router.replace("/login");

      return;

    }

    try {

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

    } catch {

      localStorage.clear();

      router.replace("/login");

    }

    setLoading(false);

  }, [router]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <Sidebar user={user} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar user={user} />

        {/* CONTENT */}
        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );

}