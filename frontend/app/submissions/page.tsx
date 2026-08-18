"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

interface Submission {
  id: string;
  problem_title: string;
  problem_slug: string;
  language: string;
  status: string;
  runtime_ms: number | null;
  memory_kb: number | null;
  test_cases_passed: number | null;
  total_test_cases: number | null;
  score: number | null;
  created_at: string;
}

const DEMO_SUBMISSIONS: Submission[] = [
  { id: "1", problem_title: "Two Sum", problem_slug: "two-sum", language: "python", status: "accepted", runtime_ms: 92, memory_kb: 14200, test_cases_passed: 5, total_test_cases: 5, score: 100, created_at: new Date().toISOString() },
];

const STATUS_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  accepted: { icon: "✅", color: "#10b981", label: "Accepted" },
  wrong_answer: { icon: "❌", color: "#ef4444", label: "Wrong Answer" },
  time_limit_exceeded: { icon: "⏱️", color: "#f59e0b", label: "Time Limit" },
  runtime_error: { icon: "💥", color: "#f97316", label: "Runtime Error" },
  compilation_error: { icon: "🔧", color: "#f97316", label: "Compile Error" },
  pending: { icon: "⏳", color: "var(--nex-text-3)", label: "Pending" },
  memory_limit_exceeded: { icon: "🧠", color: "#f59e0b", label: "Memory Limit" },
};

const LANG_BADGES: Record<string, string> = {
  python: "#3b82f6",
  javascript: "#f59e0b",
  cpp: "#8b5cf6",
  java: "#ef4444",
};

function formatTime(isoStr: string): string {
  const d = new Date(isoStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, accepted: 0, rate: "0%" });

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) { setSubmissions(DEMO_SUBMISSIONS); setLoading(false); return; }
      const res = await fetch("http://127.0.0.1:8000/api/v1/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const subs = data.items || [];
        setSubmissions(subs.length > 0 ? subs : DEMO_SUBMISSIONS);
        const accepted = subs.filter((s: Submission) => s.status === "accepted").length;
        setStats({ total: subs.length, accepted, rate: subs.length > 0 ? `${Math.round((accepted / subs.length) * 100)}%` : "—" });
      } else throw new Error();
    } catch {
      setSubmissions(DEMO_SUBMISSIONS);
      setStats({ total: 1, accepted: 1, rate: "100%" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubmissions();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchSubmissions]);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>My Submissions</h1>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Submissions", value: stats.total, icon: "📤", color: "#6366f1" },
              { label: "Accepted", value: stats.accepted, icon: "✅", color: "#10b981" },
              { label: "Acceptance Rate", value: stats.rate, icon: "📊", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "10px", flexShrink: 0,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "800", color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "2px" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Submissions table */}
          <div style={{ border: "1px solid var(--nex-border)", borderRadius: "14px", overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 80px 100px 80px 100px 80px",
              padding: "10px 16px", background: "var(--nex-bg-2)", borderBottom: "1px solid var(--nex-border)",
              fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              <div>Problem</div>
              <div>Lang</div>
              <div>Status</div>
              <div>Runtime</div>
              <div>Score</div>
              <div>When</div>
            </div>

            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>💻</div>
                <div style={{ fontWeight: "600", marginBottom: "8px" }}>No submissions yet</div>
                <p style={{ color: "var(--nex-text-3)", fontSize: "14px", marginBottom: "20px" }}>
                  Go solve your first problem!
                </p>
                <Link href="/problems" className="btn-primary">Browse Problems →</Link>
              </div>
            ) : (
              submissions.map((sub) => {
                const status = STATUS_CONFIG[sub.status] || STATUS_CONFIG["pending"];
                return (
                  <div
                    key={sub.id}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 80px 100px 80px 100px 80px",
                      padding: "13px 16px", borderBottom: "1px solid var(--nex-border)",
                      alignItems: "center", transition: "background 0.15s", cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--nex-surface)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Problem */}
                    <Link href={`/problems/${sub.problem_slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: "var(--nex-primary)" }}>{sub.problem_title}</div>
                    </Link>

                    {/* Language */}
                    <div>
                      <span style={{
                        fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px",
                        background: `${LANG_BADGES[sub.language] || "#6366f1"}20`,
                        color: LANG_BADGES[sub.language] || "#6366f1",
                        border: `1px solid ${LANG_BADGES[sub.language] || "#6366f1"}30`,
                      }}>{sub.language}</span>
                    </div>

                    {/* Status */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span>{status.icon}</span>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: status.color }}>{status.label}</span>
                    </div>

                    {/* Runtime */}
                    <div style={{ fontSize: "13px", color: "var(--nex-text-2)" }}>
                      {sub.runtime_ms ? `${sub.runtime_ms}ms` : "—"}
                    </div>

                    {/* Score */}
                    <div>
                      {sub.test_cases_passed != null ? (
                        <span style={{ fontSize: "13px", fontWeight: "600", color: sub.status === "accepted" ? "var(--nex-success)" : "var(--nex-text-2)" }}>
                          {sub.test_cases_passed}/{sub.total_test_cases}
                        </span>
                      ) : "—"}
                    </div>

                    {/* Time */}
                    <div style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>
                      {sub.created_at ? formatTime(sub.created_at) : "—"}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
