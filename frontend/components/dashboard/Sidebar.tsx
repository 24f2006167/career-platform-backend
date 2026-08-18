"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  {
    label: "MAIN",
    items: [
      { icon: "⊞", label: "Dashboard", href: "/dashboard/candidate" },
      { icon: "🗺️", label: "Roadmap", href: "/roadmap" },
      { icon: "📚", label: "Learn", href: "/learn" },
    ],
  },
  {
    label: "PRACTICE",
    items: [
      { icon: "💻", label: "Problems", href: "/problems" },
      { icon: "📋", label: "Submissions", href: "/submissions" },
      { icon: "🏆", label: "Contests", href: "/contests" },
      { icon: "📊", label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    label: "CAREER",
    items: [
      { icon: "🎤", label: "Mock Interview", href: "/interviews" },
      { icon: "🏗️", label: "Projects", href: "/projects" },
      { icon: "📄", label: "Resume Analyzer", href: "/resume" },
      { icon: "💬", label: "Discussions", href: "/discussions" },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { icon: "⚡", label: "Admin Console", href: "/dashboard/admin" },
      { icon: "👥", label: "User Management", href: "/dashboard/admin/users" },
      { icon: "🎯", label: "Job Roles", href: "/dashboard/admin/roles" },
      { icon: "🧠", label: "AI Skills", href: "/dashboard/admin/skills" },
      { icon: "🛠️", label: "System Health", href: "/dashboard/admin/system-health" },
    ],
  },
];

interface SidebarUser {
  email?: string;
  full_name?: string;
  username?: string;
  role?: string | { name?: string };
}

interface SidebarProps {
  user?: SidebarUser;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("Candidate");

  useEffect(() => {
    let name = "Candidate";
    let admin = false;
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.full_name || parsed.username) {
          name = parsed.full_name || parsed.username;
        }
        if (
          parsed.email === "laptop18122022@gmail.com" ||
          parsed.role === "admin" ||
          parsed.role?.name === "admin"
        ) {
          admin = true;
        }
      }
    } catch {
      // Fallback to defaults
    }
    if (user?.full_name || user?.username) {
      name = user.full_name || user.username || name;
    }
    const timer = setTimeout(() => {
      setDisplayName(name);
      setIsAdmin(admin);
    }, 0);
    return () => clearTimeout(timer);
  }, [user]);

  const userRoleName = typeof user?.role === "object" ? user?.role?.name : user?.role;
  const userIsAdmin =
    isAdmin ||
    userRoleName === "admin" ||
    user?.email === "laptop18122022@gmail.com";

  const visibleSections = NAV_SECTIONS.filter((sec) => {
    if (sec.label === "ADMIN") {
      return userIsAdmin;
    }
    return true;
  });

  return (
    <div className="sidebar">
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--nex-border)" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "bold", color: "white", flexShrink: 0,
          }}>N</div>
          <span style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "-0.02em" }}>Nexvora</span>
        </Link>
      </div>

      {/* User card */}
      <div style={{ padding: "16px", borderBottom: "1px solid var(--nex-border)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 12px", borderRadius: "10px",
          background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
          cursor: "pointer", transition: "all 0.15s",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700", color: "white", flexShrink: 0,
          }}>
            {displayName[0]?.toUpperCase() || "C"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {displayName}
            </div>
            <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>
              {userIsAdmin ? "🛡️ Administrator" : "🔥 0 day streak"}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: "11px", color: "var(--nex-text-3)" }}>⚙</div>
        </div>
      </div>

      {/* Rating pill */}
      <div style={{ padding: "10px 16px" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 12px", borderRadius: "8px",
          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)",
        }}>
          <span style={{ fontSize: "12px", color: "#a5b4fc" }}>⭐ Nexvora Rating</span>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#a5b4fc" }}>1200</span>
        </div>
      </div>

      {/* Nav sections */}
      <div style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
        {visibleSections.map((section) => (
          <div key={section.label} style={{ marginBottom: "8px" }}>
            <div style={{
              padding: "8px 24px 4px",
              fontSize: "10px", fontWeight: "700",
              color: "var(--nex-text-3)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {section.label}
            </div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item${isActive ? " active" : ""}`}
                >
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.label === "Problems" && (
                    <span style={{
                      marginLeft: "auto", fontSize: "11px", padding: "2px 7px",
                      borderRadius: "999px", background: "rgba(99,102,241,0.15)",
                      color: "var(--nex-primary)", fontWeight: "600"
                    }}>5</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: "16px", borderTop: "1px solid var(--nex-border)" }}>
        <Link
          href="/login"
          onClick={() => {
            try {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              localStorage.removeItem("access_token");
            } catch {}
          }}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontSize: "13px", color: "var(--nex-text-3)", textDecoration: "none",
            padding: "8px 12px", borderRadius: "8px",
            transition: "all 0.15s",
          }}
        >
          <span>↩</span> Sign out
        </Link>
      </div>
    </div>
  );
}