"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (
          parsed.email === "laptop18122022@gmail.com" ||
          parsed.role === "admin" ||
          parsed.role?.name === "admin"
        ) {
          const timer = setTimeout(() => {
            setAuthorized(true);
          }, 0);
          return () => clearTimeout(timer);
        }
      }
      // Non-admin user attempting to access admin route
      router.push("/dashboard/candidate");
    } catch {
      router.push("/dashboard/candidate");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#060810", color: "#a5b4fc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>🛡️ Checking Administrator Authorization...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
