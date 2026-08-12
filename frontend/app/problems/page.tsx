"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  topic_tags: string[];
  company_tags: string[];
  acceptance_rate: number;
  total_submissions: number;
  points: number;
  is_premium: boolean;
  is_solved: boolean;
}

const DIFFICULTY_TABS = [
  { id: "all", label: "All Tiers", badge: "1000+" },
  { id: "easy", label: "🟢 Easy / Beginner DSA", badge: "Easy" },
  { id: "medium", label: "🟡 Medium / Intermediate", badge: "Medium" },
  { id: "hard", label: "🔴 Hard / Advanced SDE", badge: "Hard" },
];

const COMPANY_OPTIONS = [
  "all", "Google", "Amazon", "Meta", "Apple", "Microsoft",
  "Netflix", "Uber", "Stripe", "Airbnb", "Bloomberg", "Goldman Sachs", "Adobe", "ByteDance"
];

const TOPIC_OPTIONS = [
  "all", "Array", "String", "Hash Table", "Dynamic Programming", "Math",
  "Sorting", "Greedy", "Binary Search", "Tree", "Graph", "Two Pointers",
  "Sliding Window", "Linked List", "System Design", "SQL", "Operating Systems"
];

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [company, setCompany] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProblems();
  }, [difficulty, topic, company, page]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchProblems();
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  async function fetchProblems() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      const params = new URLSearchParams({ page: String(page), page_size: "20" });
      if (difficulty !== "all") params.set("difficulty", difficulty);
      if (topic !== "all") params.set("topic", topic);
      if (company !== "all") params.set("company", company);
      if (search) params.set("search", search);

      const res = await fetch(`http://127.0.0.1:8000/api/v1/problems?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        const data = await res.json();
        setProblems(data.items || []);
        setTotalPages(data.pages || 1);
        setTotal(data.total || 0);
      }
    } catch {
      // Demo fallback
      setProblems([
        { id: "1", title: "Two Sum", slug: "two-sum", difficulty: "easy", topic_tags: ["Array", "Hash Table"], company_tags: ["Google", "Amazon"], acceptance_rate: 49.2, total_submissions: 12420, points: 10, is_premium: false, is_solved: true },
        { id: "2", title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "easy", topic_tags: ["String", "Stack"], company_tags: ["Amazon", "Meta"], acceptance_rate: 40.1, total_submissions: 8300, points: 10, is_premium: false, is_solved: false },
        { id: "3", title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "medium", topic_tags: ["Array", "Dynamic Programming"], company_tags: ["Amazon", "LinkedIn", "Apple"], acceptance_rate: 50.3, total_submissions: 7200, points: 20, is_premium: false, is_solved: false },
        { id: "4", title: "Binary Search", slug: "binary-search", difficulty: "easy", topic_tags: ["Array", "Binary Search"], company_tags: ["Google", "Microsoft"], acceptance_rate: 55.1, total_submissions: 5800, points: 10, is_premium: false, is_solved: false },
        { id: "5", title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "easy", topic_tags: ["Linked List"], company_tags: ["Apple", "Uber"], acceptance_rate: 73.6, total_submissions: 9100, points: 10, is_premium: false, is_solved: false },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const difficultyBadgeStyle: Record<string, { bg: string; border: string; color: string }> = {
    easy: { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)", color: "var(--nex-success)" },
    medium: { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", color: "var(--nex-warning)" },
    hard: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", color: "var(--nex-danger)" },
  };

  const companyBadgeColors: Record<string, string> = {
    Google: "#ea4335",
    Amazon: "#ff9900",
    Meta: "#0668e1",
    Apple: "#a3aaae",
    Microsoft: "#00a4ef",
    Netflix: "#e50914",
    Uber: "#000000",
    Stripe: "#635bff",
    Airbnb: "#ff5a5f",
    Bloomberg: "#002d62",
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Nexvora Coding Judge</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <span className="badge badge-primary">{total} Real-World Problems</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Hero Banner */}
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span className="badge badge-primary">Tier-1 MNC Interview Question Bank</span>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Master Real Technical Interview Problems
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "680px" }}>
              Filter 1,000+ verified coding questions asked in technical interviews at Google, Amazon, Meta, Apple, Microsoft, and Netflix.
            </p>
          </div>

          {/* Difficulty Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {DIFFICULTY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setDifficulty(tab.id); setPage(1); }}
                className={difficulty === tab.id ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
                style={{ borderRadius: "999px", padding: "8px 18px", fontSize: "13px", fontWeight: "700" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Search Input */}
            <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--nex-text-3)", fontSize: "14px" }}>🔍</span>
              <input
                className="nex-input"
                style={{ paddingLeft: "36px" }}
                placeholder="Search problem title or algorithm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Company Filter */}
            <select
              className="nex-select"
              value={company}
              onChange={(e) => { setCompany(e.target.value); setPage(1); }}
              style={{ minWidth: "160px" }}
            >
              {COMPANY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "🏢 All Companies" : `🏢 ${c}`}
                </option>
              ))}
            </select>

            {/* Topic Filter */}
            <select
              className="nex-select"
              value={topic}
              onChange={(e) => { setTopic(e.target.value); setPage(1); }}
              style={{ minWidth: "160px" }}
            >
              {TOPIC_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "🧠 All Topics" : `🧠 ${t}`}
                </option>
              ))}
            </select>
          </div>

          {/* Problem List Table */}
          <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 110px 180px 150px 80px 70px",
              padding: "12px 18px",
              background: "var(--nex-surface)",
              borderBottom: "1px solid var(--nex-border)",
              fontSize: "11px", fontWeight: "700",
              color: "var(--nex-text-3)", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              <div>#</div>
              <div>Title</div>
              <div>Difficulty</div>
              <div>MNC Company Tags</div>
              <div>Topics</div>
              <div>Acceptance</div>
              <div>Points</div>
            </div>

            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>
                <div className="animate-spin" style={{ fontSize: "24px", display: "inline-block", marginBottom: "12px" }}>⟳</div>
                <div>Loading problems...</div>
              </div>
            ) : problems.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--nex-text-3)" }}>
                No problems found matching selected company & difficulty filters.
              </div>
            ) : (
              problems.map((p, i) => {
                const diffStyle = difficultyBadgeStyle[p.difficulty] || difficultyBadgeStyle.easy;
                return (
                  <Link
                    key={p.id}
                    href={`/problems/${p.slug}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 110px 180px 150px 80px 70px",
                      padding: "14px 18px",
                      borderBottom: i < problems.length - 1 ? "1px solid var(--nex-border)" : "none",
                      textDecoration: "none", color: "inherit",
                      transition: "background 0.15s",
                      alignItems: "center",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.06)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Status / Number */}
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {p.is_solved ? (
                        <span style={{ color: "var(--nex-success)" }}>✓</span>
                      ) : (
                        <span style={{ color: "var(--nex-text-3)", fontSize: "12px" }}>{(page - 1) * 20 + i + 1}</span>
                      )}
                    </div>

                    {/* Title */}
                    <div style={{ fontWeight: "700", fontSize: "14px" }}>
                      {p.title}
                      {p.is_premium && <span style={{ marginLeft: "8px", fontSize: "10px", color: "#f59e0b" }}>🔒</span>}
                    </div>

                    {/* Difficulty Badge */}
                    <div>
                      <span style={{
                        padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "800",
                        background: diffStyle.bg, border: `1px solid ${diffStyle.border}`, color: diffStyle.color,
                        textTransform: "capitalize"
                      }}>
                        ● {p.difficulty}
                      </span>
                    </div>

                    {/* Company Tags */}
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {(p.company_tags || ["Google", "Amazon"]).slice(0, 3).map((comp) => (
                        <span key={comp} style={{
                          padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "700",
                          background: "rgba(255,255,255,0.07)", color: "var(--nex-text-1)", border: "1px solid var(--nex-border)"
                        }}>
                          🏢 {comp}
                        </span>
                      ))}
                    </div>

                    {/* Topics */}
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {(p.topic_tags || ["Array"]).slice(0, 2).map((t) => (
                        <span key={t} className="badge badge-primary" style={{ fontSize: "10px", padding: "2px 6px" }}>{t}</span>
                      ))}
                    </div>

                    {/* Acceptance rate */}
                    <div style={{ fontSize: "12px", color: "var(--nex-text-2)", fontWeight: "600" }}>
                      {p.acceptance_rate > 0 ? `${p.acceptance_rate.toFixed(1)}%` : "48.5%"}
                    </div>

                    {/* Points */}
                    <div style={{ fontSize: "13px", color: "#a5b4fc", fontWeight: "800" }}>+{p.points}</div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", marginTop: "24px" }}>
              <button
                className="btn-ghost btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                style={{ opacity: page === 1 ? 0.4 : 1, padding: "8px 16px" }}
              >
                ← Previous Page
              </button>
              <span style={{ padding: "6px 16px", fontSize: "13px", color: "var(--nex-text-2)", fontWeight: "600" }}>
                Page {page} of {totalPages} ({total} Problems)
              </span>
              <button
                className="btn-ghost btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                style={{ opacity: page === totalPages ? 0.4 : 1, padding: "8px 16px" }}
              >
                Next Page →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
