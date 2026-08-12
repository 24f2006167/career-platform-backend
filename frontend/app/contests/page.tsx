"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

interface Contest {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  start_time: string;
  end_time: string;
  status: string;
  is_rated: boolean;
  participant_count: number;
  problem_count: number;
}

const DEMO_CONTESTS: Contest[] = [
  { id: "1", title: "Nexvora Weekly Contest #1", description: "Solve 5 problems in 90 minutes. Rated contest — earn or lose Nexvora points!", duration_minutes: 90, start_time: "2026-08-14T10:00:00Z", end_time: "2026-08-14T11:30:00Z", status: "upcoming", is_rated: true, participant_count: 0, problem_count: 5 },
  { id: "2", title: "Beginner Bootcamp #3", description: "Easy-medium problems for beginners. Unrated — focus on learning!", duration_minutes: 120, start_time: "2026-08-13T15:00:00Z", end_time: "2026-08-13T17:00:00Z", status: "upcoming", is_rated: false, participant_count: 0, problem_count: 4 },
];

function formatCountdown(targetTime: string): string {
  const now = new Date();
  const target = new Date(targetTime);
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return "Started";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDateTime(isoStr: string): string {
  if (!isoStr) return "—";
  return new Date(isoStr).toLocaleDateString("en-IN", {
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);
  const [joined, setJoined] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchContests();
  }, []);

  async function fetchContests() {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/contests");
      if (res.ok) {
        const data = await res.json();
        setContests(data.items.length > 0 ? data.items : DEMO_CONTESTS);
      } else throw new Error();
    } catch {
      setContests(DEMO_CONTESTS);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(contestId: string) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to join contests.");
      return;
    }
    setJoining(contestId);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/contests/${contestId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setJoined((s) => new Set([...s, contestId]));
        await fetchContests();
      }
    } catch {
      setJoined((s) => new Set([...s, contestId]));
    } finally {
      setJoining(null);
    }
  }

  const statusColor: Record<string, string> = {
    upcoming: "#a5b4fc",
    active: "#10b981",
    ended: "var(--nex-text-3)",
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Contests</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <Link href="/leaderboard" className="btn-ghost btn-sm">🏆 Leaderboard</Link>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Info banner */}
          <div style={{
            padding: "16px 20px", borderRadius: "12px", marginBottom: "24px",
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
            display: "flex", gap: "16px", alignItems: "center",
          }}>
            <span style={{ fontSize: "28px" }}>⚡</span>
            <div>
              <div style={{ fontWeight: "700", marginBottom: "2px" }}>How Rating Works</div>
              <div style={{ fontSize: "13px", color: "var(--nex-text-2)" }}>
                Solve problems faster for more points. Each rated contest updates your Nexvora Rating using an Elo-based system.
                Higher rank = more points gained (or fewer lost).
              </div>
            </div>
          </div>

          {/* Contest cards */}
          {loading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>Loading contests...</div>
          ) : contests.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>
              No contests scheduled right now. Check back soon!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {contests.map((contest) => (
                <div key={contest.id} className="glass" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    {/* Icon */}
                    <div style={{
                      width: 52, height: 52, borderRadius: "12px", flexShrink: 0,
                      background: contest.status === "active"
                        ? "rgba(16,185,129,0.15)" : "rgba(99,102,241,0.15)",
                      border: `1px solid ${contest.status === "active" ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.3)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "24px",
                    }}>
                      {contest.status === "active" ? "🔴" : contest.status === "ended" ? "✅" : "⏳"}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <h2 style={{ fontSize: "16px", fontWeight: "700" }}>{contest.title}</h2>
                        <span style={{
                          fontSize: "11px", padding: "2px 8px", borderRadius: "999px", fontWeight: "700",
                          background: `${statusColor[contest.status]}20`,
                          border: `1px solid ${statusColor[contest.status]}40`,
                          color: statusColor[contest.status],
                          textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>{contest.status}</span>
                        {contest.is_rated && (
                          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: "rgba(245,158,11,0.15)", color: "var(--nex-warning)", border: "1px solid rgba(245,158,11,0.2)", fontWeight: "600" }}>
                            ⭐ Rated
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: "13px", color: "var(--nex-text-2)", marginBottom: "14px", lineHeight: "1.6" }}>
                        {contest.description}
                      </p>

                      {/* Meta row */}
                      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        {[
                          { icon: "🕐", label: "Duration", value: `${contest.duration_minutes} mins` },
                          { icon: "💻", label: "Problems", value: `${contest.problem_count} problems` },
                          { icon: "👥", label: "Participants", value: `${contest.participant_count}` },
                          { icon: "📅", label: "Starts", value: formatDateTime(contest.start_time) },
                        ].map((meta) => (
                          <div key={meta.label} style={{ fontSize: "13px" }}>
                            <span style={{ color: "var(--nex-text-3)" }}>{meta.icon} {meta.label}: </span>
                            <span style={{ fontWeight: "600" }}>{meta.value}</span>
                          </div>
                        ))}
                        {contest.status === "upcoming" && (
                          <div style={{ fontSize: "13px" }}>
                            <span style={{ color: "var(--nex-text-3)" }}>⏳ Starts in: </span>
                            <span style={{ fontWeight: "700", color: "#a5b4fc" }}>{formatCountdown(contest.start_time)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                      {contest.status !== "ended" && (
                        joined.has(contest.id) ? (
                          <div style={{
                            padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600",
                            background: "rgba(16,185,129,0.1)", color: "var(--nex-success)",
                            border: "1px solid rgba(16,185,129,0.2)",
                          }}>✓ Registered</div>
                        ) : (
                          <button
                            className="btn-primary"
                            onClick={() => handleJoin(contest.id)}
                            disabled={joining === contest.id}
                            style={{ opacity: joining === contest.id ? 0.6 : 1 }}
                          >
                            {joining === contest.id ? "⟳ Joining..." : "Register →"}
                          </button>
                        )
                      )}
                      {contest.status === "ended" && (
                        <Link href={`/contests/${contest.id}`} className="btn-ghost btn-sm">View Results</Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past contests */}
          <div style={{ marginTop: "40px" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "var(--nex-text-2)" }}>Past Contests</div>
            <div style={{
              padding: "40px", textAlign: "center", border: "1px dashed var(--nex-border)",
              borderRadius: "12px", color: "var(--nex-text-3)", fontSize: "14px",
            }}>
              No past contests yet. Be the first to compete! 🏁
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
