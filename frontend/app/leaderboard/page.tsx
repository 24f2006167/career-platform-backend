"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

interface LeaderboardEntry {
  rank: number;
  username: string;
  full_name: string;
  profile_image: string | null;
  nexvora_rating: number;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  streak: number;
  target_role: string | null;
  level: number;
}

const DEMO_USERS: LeaderboardEntry[] = [
  { rank: 1, username: "algo_master", full_name: "Arjun Sharma", profile_image: null, nexvora_rating: 2456, problems_solved: 847, easy_solved: 280, medium_solved: 420, hard_solved: 147, streak: 142, target_role: "Senior SDE", level: 24 },
  { rank: 2, username: "coder_riya", full_name: "Riya Gupta", profile_image: null, nexvora_rating: 2289, problems_solved: 712, easy_solved: 240, medium_solved: 361, hard_solved: 111, streak: 89, target_role: "Backend Engineer", level: 21 },
  { rank: 3, username: "neo_ninja", full_name: "Rohan Verma", profile_image: null, nexvora_rating: 2144, problems_solved: 634, easy_solved: 210, medium_solved: 312, hard_solved: 112, streak: 67, target_role: "Full Stack", level: 19 },
  { rank: 4, username: "devops_king", full_name: "Amit Kumar", profile_image: null, nexvora_rating: 2001, problems_solved: 589, easy_solved: 200, medium_solved: 289, hard_solved: 100, streak: 55, target_role: "DevOps", level: 17 },
  { rank: 5, username: "ml_queen", full_name: "Priya Singh", profile_image: null, nexvora_rating: 1899, problems_solved: 501, easy_solved: 180, medium_solved: 245, hard_solved: 76, streak: 44, target_role: "Data Engineer", level: 15 },
  { rank: 6, username: "bitwise_boss", full_name: "Karan Mehta", profile_image: null, nexvora_rating: 1756, problems_solved: 445, easy_solved: 160, medium_solved: 220, hard_solved: 65, streak: 38, target_role: "SDE", level: 13 },
  { rank: 7, username: "shitanshu", full_name: "Shitanshu", profile_image: null, nexvora_rating: 1200, problems_solved: 0, easy_solved: 0, medium_solved: 0, hard_solved: 0, streak: 0, target_role: "Software Engineer", level: 1 },
];

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function getRatingColor(rating: number): string {
  if (rating >= 2400) return "#f59e0b";  // Grandmaster — gold
  if (rating >= 2000) return "#8b5cf6";  // Master — purple
  if (rating >= 1600) return "#6366f1";  // Expert — indigo
  if (rating >= 1300) return "#06b6d4";  // Specialist — cyan
  return "var(--nex-text-2)";            // Pupil — grey
}

function getRatingTitle(rating: number): string {
  if (rating >= 2400) return "Grandmaster";
  if (rating >= 2000) return "Master";
  if (rating >= 1600) return "Expert";
  if (rating >= 1300) return "Specialist";
  return "Pupil";
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://127.0.0.1:8000/api/v1/leaderboard", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.items);
      } else throw new Error();
    } catch {
      setUsers(DEMO_USERS);
      setMyRank(7);
    } finally {
      setLoading(false);
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch("http://127.0.0.1:8000/api/v1/leaderboard/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const d = await res.json();
        setMyRank(d.rank);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaderboard();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchLeaderboard]);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Leaderboard</h1>
          {myRank && (
            <div style={{
              marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "999px",
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
              fontSize: "13px", color: "#a5b4fc", fontWeight: "600",
            }}>
              Your Rank: #{myRank}
            </div>
          )}
        </div>

        <div style={{ padding: "24px" }}>
          {/* Top 3 podium */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "32px", justifyContent: "center", alignItems: "flex-end" }}>
            {[users[1], users[0], users[2]].filter(Boolean).map((user, i) => {
              const heights = [160, 200, 140];
              const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
              return (
                <div key={user.username} style={{
                  flex: 1, maxWidth: "200px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${getRatingColor(user.nexvora_rating)}, #6366f1)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", fontWeight: "900", color: "white", marginBottom: "8px",
                    boxShadow: `0 0 20px ${getRatingColor(user.nexvora_rating)}40`,
                  }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "2px" }}>{user.username}</div>
                  <div style={{ fontSize: "12px", color: getRatingColor(user.nexvora_rating), fontWeight: "600", marginBottom: "8px" }}>
                    ⭐ {user.nexvora_rating.toLocaleString()}
                  </div>
                  <div style={{
                    width: "100%", height: `${heights[i]}px`,
                    background: actualRank === 1
                      ? "linear-gradient(to top, rgba(245,158,11,0.3), rgba(245,158,11,0.1))"
                      : actualRank === 2
                        ? "linear-gradient(to top, rgba(148,163,184,0.3), rgba(148,163,184,0.1))"
                        : "linear-gradient(to top, rgba(251,146,60,0.3), rgba(251,146,60,0.1))",
                    border: `1px solid ${actualRank === 1 ? "rgba(245,158,11,0.4)" : actualRank === 2 ? "rgba(148,163,184,0.3)" : "rgba(251,146,60,0.3)"}`,
                    borderBottom: "none",
                    borderRadius: "8px 8px 0 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "32px",
                  }}>{MEDAL[actualRank]}</div>
                </div>
              );
            })}
          </div>

          {/* Full leaderboard table */}
          <div style={{ border: "1px solid var(--nex-border)", borderRadius: "14px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "60px 1fr 120px 80px 100px 80px 80px",
              padding: "10px 16px", background: "var(--nex-bg-2)",
              borderBottom: "1px solid var(--nex-border)",
              fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              <div>Rank</div>
              <div>User</div>
              <div>Rating</div>
              <div>Solved</div>
              <div>Breakdown</div>
              <div>Streak</div>
              <div>Level</div>
            </div>

            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>Loading rankings...</div>
            ) : (
              users.map((user) => (
                <div
                  key={user.username}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 120px 80px 100px 80px 80px",
                    padding: "13px 16px",
                    borderBottom: "1px solid var(--nex-border)",
                    alignItems: "center",
                    background: user.username === "shitanshu" ? "rgba(99,102,241,0.05)" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--nex-surface)")}
                  onMouseLeave={e => (e.currentTarget.style.background = user.username === "shitanshu" ? "rgba(99,102,241,0.05)" : "transparent")}
                >
                  {/* Rank */}
                  <div style={{ fontWeight: "700", fontSize: "14px", color: user.rank <= 3 ? getRatingColor(user.nexvora_rating) : "var(--nex-text-2)" }}>
                    {MEDAL[user.rank] || `#${user.rank}`}
                  </div>

                  {/* User */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, ${getRatingColor(user.nexvora_rating)}, #6366f1)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: "700", color: "white",
                    }}>{user.username[0].toUpperCase()}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>{user.username}</div>
                      <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{user.target_role || "—"}</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: getRatingColor(user.nexvora_rating) }}>
                      {user.nexvora_rating.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--nex-text-3)", fontWeight: "600" }}>{getRatingTitle(user.nexvora_rating)}</div>
                  </div>

                  {/* Total solved */}
                  <div style={{ fontSize: "14px", fontWeight: "700" }}>{user.problems_solved}</div>

                  {/* Breakdown */}
                  <div style={{ display: "flex", gap: "6px", fontSize: "12px", fontWeight: "600" }}>
                    <span style={{ color: "var(--difficulty-easy)" }}>{user.easy_solved}</span>
                    <span style={{ color: "var(--nex-text-3)" }}>/</span>
                    <span style={{ color: "var(--difficulty-medium)" }}>{user.medium_solved}</span>
                    <span style={{ color: "var(--nex-text-3)" }}>/</span>
                    <span style={{ color: "var(--difficulty-hard)" }}>{user.hard_solved}</span>
                  </div>

                  {/* Streak */}
                  <div style={{ fontSize: "13px", color: user.streak > 30 ? "#f97316" : "var(--nex-text-2)", fontWeight: user.streak > 30 ? "700" : "400" }}>
                    🔥 {user.streak}
                  </div>

                  {/* Level */}
                  <div style={{ fontSize: "13px", color: "var(--nex-text-2)", fontWeight: "600" }}>Lv.{user.level}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
