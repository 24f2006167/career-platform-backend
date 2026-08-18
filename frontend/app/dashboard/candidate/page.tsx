"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import API, { apiUrl } from "@/lib/api";

interface RecentSubmissionItem {
  id: string;
  status: string;
  language: string;
  created_at: string | null;
}

interface UserProfile {
  full_name: string;
  username: string;
  nexvora_rating: number;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  streak: number;
  readiness_score: number;
  target_role: string;
  experience_level: string;
  recent_submissions?: RecentSubmissionItem[];
}

const DEFAULT_SKILLS = [
  { name: "DSA", score: 0, color: "#6366f1" },
  { name: "Programming", score: 0, color: "#8b5cf6" },
  { name: "DBMS", score: 0, color: "#06b6d4" },
  { name: "OS", score: 0, color: "#10b981" },
  { name: "Networks", score: 0, color: "#f59e0b" },
  { name: "System Design", score: 0, color: "#ef4444" },
];

const DAILY_GOALS = [
  { id: 1, label: "Solve 1 DSA Problem", done: false, icon: "💻" },
  { id: 2, label: "20 min Learning", done: false, icon: "📚" },
  { id: 3, label: "1 CS Concept Quiz", done: false, icon: "🧠" },
  { id: 4, label: "Review Yesterday's Solution", done: false, icon: "🔍" },
];

const RECOMMENDED = [
  { type: "Problem", title: "Two Sum & Hash Maps", difficulty: "easy", href: "/problems", why: "Foundational Topic" },
  { type: "Project", title: "Design a URL Shortener", difficulty: "intermediate", href: "/projects", why: "Strengthens System Design" },
  { type: "Learn", title: "OS Process Management", difficulty: "concept", href: "/learn", why: "Core CS Concept" },
];

export default function CandidateDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [goals, setGoals] = useState(DAILY_GOALS);
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17) return "Good evening";
    return "Good morning";
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/api/v1/profile/me");
      const data = res.data;
      setProfile(data);

      // Compute dynamic skill scores based on actual user problem solving stats
      const solved = data.problems_solved || 0;
      if (solved > 0) {
        const dsaScore = Math.min(100, Math.round((solved / 10) * 100));
        const progScore = Math.min(100, Math.round((solved / 8) * 100));
        const dbmsScore = Math.min(100, Math.round((data.easy_solved / 5) * 100));
        const osScore = Math.min(100, Math.round((data.medium_solved / 3) * 100));
        const netScore = Math.min(100, Math.round((data.hard_solved / 2) * 100));
        const sysScore = Math.min(100, Math.round((solved / 15) * 100));

        setSkills([
          { name: "DSA", score: dsaScore, color: "#6366f1" },
          { name: "Programming", score: progScore, color: "#8b5cf6" },
          { name: "DBMS", score: dbmsScore, color: "#06b6d4" },
          { name: "OS", score: osScore, color: "#10b981" },
          { name: "Networks", score: netScore, color: "#f59e0b" },
          { name: "System Design", score: sysScore, color: "#ef4444" },
        ]);
      } else {
        setSkills(DEFAULT_SKILLS);
      }
    } catch {
      // For brand new users or offline state, initialize clean zero progress
      setProfile({
        full_name: "Developer",
        username: "user",
        nexvora_rating: 1200,
        problems_solved: 0,
        easy_solved: 0,
        medium_solved: 0,
        hard_solved: 0,
        streak: 0,
        readiness_score: 0,
        target_role: "Software Engineer",
        experience_level: "beginner",
        recent_submissions: [],
      });
      setSkills(DEFAULT_SKILLS);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const weakestSkills = [...skills].sort((a, b) => a.score - b.score).slice(0, 3);
  const readiness = profile?.readiness_score ?? 0;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (readiness / 100) * circumference;

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ fontSize: "15px", fontWeight: "600" }}>Dashboard</h1>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 12px", borderRadius: "999px",
              background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)",
              fontSize: "13px", color: "#fb923c", fontWeight: "600",
            }}>
              🔥 {profile?.streak ?? 0} day streak
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 12px", borderRadius: "999px",
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
              fontSize: "13px", color: "#a5b4fc", fontWeight: "600",
            }}>
              ⭐ {profile?.nexvora_rating ?? 1200}
            </div>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Welcome header */}
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              {greeting}, {profile?.full_name?.split(" ")[0] ?? "there"} 👋
            </h2>
            <p style={{ color: "var(--nex-text-2)", marginTop: "4px", fontSize: "14px" }}>
              {profile?.target_role ? `Target: ${profile.target_role}` : "Set your target role to get a personalized roadmap"}
            </p>
          </div>

          {/* Top row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            {/* SDE Readiness */}
            <div className="stat-card" style={{ gridRow: "span 1", display: "flex", gap: "20px", alignItems: "center" }}>
              <div className="circular-progress">
                <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="60" cy="60" r="54" fill="none" stroke="var(--nex-border)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke="url(#readinessGrad)" strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                  <defs>
                    <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: "absolute", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "900", lineHeight: "1" }}>{readiness}%</div>
                  <div style={{ fontSize: "10px", color: "var(--nex-text-3)", fontWeight: "600" }}>READY</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>SDE Readiness</div>
                <div style={{ fontSize: "13px", color: "var(--nex-text-2)", lineHeight: "1.5" }}>
                  Solve problems & complete tracks<br />to build your readiness score
                </div>
                <Link href="/roadmap" className="btn-primary btn-sm" style={{ display: "inline-flex", marginTop: "12px" }}>
                  View Roadmap
                </Link>
              </div>
            </div>

            {/* Problems Stats */}
            <div className="stat-card">
              <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "14px" }}>
                PROBLEMS SOLVED
              </div>
              <div style={{ fontSize: "40px", fontWeight: "900", letterSpacing: "-0.03em", marginBottom: "16px" }}>
                {profile?.problems_solved ?? 0}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { label: "Easy", val: profile?.easy_solved ?? 0, color: "var(--difficulty-easy)" },
                  { label: "Med", val: profile?.medium_solved ?? 0, color: "var(--difficulty-medium)" },
                  { label: "Hard", val: profile?.hard_solved ?? 0, color: "var(--difficulty-hard)" },
                ].map((d) => (
                  <div key={d.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "800", color: d.color }}>{d.val}</div>
                    <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{d.label}</div>
                  </div>
                ))}
              </div>
              <div className="progress-bar" style={{ marginTop: "16px" }}>
                <div className="progress-fill" style={{ width: `${Math.min(100, ((profile?.problems_solved ?? 0) / 500) * 100)}%` }} />
              </div>
              <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "6px" }}>
                {profile?.problems_solved ?? 0} / 500 problems to Grandmaster
              </div>
            </div>

            {/* Daily Goals */}
            <div className="stat-card">
              <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "14px" }}>
                TODAY&apos;S GOALS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                    onClick={() => setGoals((gs) => gs.map((g) => g.id === goal.id ? { ...g, done: !g.done } : g))}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: "6px",
                      border: `2px solid ${goal.done ? "var(--nex-success)" : "var(--nex-border)"}`,
                      background: goal.done ? "var(--nex-success)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.2s", fontSize: "12px", color: "white",
                    }}>
                      {goal.done ? "✓" : ""}
                    </div>
                    <span style={{
                      fontSize: "13px",
                      color: goal.done ? "var(--nex-text-3)" : "var(--nex-text-1)",
                      textDecoration: goal.done ? "line-through" : "none",
                      transition: "all 0.2s",
                    }}>
                      {goal.icon} {goal.label}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px" }}>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(goals.filter((g) => g.done).length / goals.length) * 100}%` }} />
                </div>
                <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "4px" }}>
                  {goals.filter((g) => g.done).length}/{goals.length} completed
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            {/* Skill Map / Weakness */}
            <div className="stat-card">
              <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "14px" }}>
                SKILL PROFICIENCY
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "500" }}>{skill.name}</span>
                      <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>{skill.score}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: "5px" }}>
                      <div style={{
                        height: "100%", borderRadius: "999px",
                        width: `${skill.score}%`,
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weakest skills + recommendations */}
            <div className="stat-card">
              <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "14px" }}>
                ⚠️ AREAS TO IMPROVE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {weakestSkills.map((s) => (
                  <div key={s.name} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px", background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.15)", borderRadius: "8px",
                  }}>
                    <span style={{ fontSize: "13px" }}>{s.name}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--nex-danger)" }}>{s.score}%</span>
                  </div>
                ))}
              </div>
              <Link href="/roadmap" style={{
                display: "flex", alignItems: "center", gap: "6px", fontSize: "13px",
                color: "var(--nex-primary)", textDecoration: "none", fontWeight: "500",
              }}>
                View personalized plan →
              </Link>
            </div>

            {/* Recommended + Recent Activity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Recommended */}
              <div className="stat-card" style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "12px" }}>
                  🎯 RECOMMENDED FOR YOU
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {RECOMMENDED.map((r) => (
                    <Link key={r.title} href={r.href} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "8px 10px", borderRadius: "8px",
                      background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                      textDecoration: "none", color: "inherit",
                      transition: "all 0.15s",
                    }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: r.type === "Problem" ? "var(--nex-primary)" :
                          r.type === "Project" ? "var(--nex-success)" : "var(--nex-warning)",
                      }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.title}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{r.why}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="stat-card">
                <div style={{ fontSize: "13px", color: "var(--nex-text-3)", fontWeight: "600", marginBottom: "12px" }}>
                  RECENT SUBMISSIONS
                </div>
                {profile?.recent_submissions && profile.recent_submissions.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {profile.recent_submissions.map((a) => (
                      <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12px", minWidth: "20px" }}>
                          {a.status === "accepted" ? "✅" : "❌"}
                        </span>
                        <span style={{ fontSize: "13px", flex: 1, textTransform: "capitalize" }}>
                          {a.status.replace("_", " ")} ({a.language})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", fontStyle: "italic" }}>
                    No submissions yet. Start solving coding problems to track your activity!
                  </div>
                )}
                <Link href="/problems" style={{
                  display: "block", marginTop: "10px", fontSize: "12px",
                  color: "var(--nex-primary)", textDecoration: "none", fontWeight: "600"
                }}>Start Practice →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}