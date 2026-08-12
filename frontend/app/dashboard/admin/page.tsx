"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  AdminStats,
  GeneratedJobRoleResponse,
  generateJobRoleWithAI,
  getAdminStats,
} from "@/services/admin";

const ADMIN_MODULES = [
  { title: "User Management", desc: "View registered users and role access.", icon: "👥", href: "/dashboard/admin/users" },
  { title: "Job Roles", desc: "View all AI career job roles added by admin.", icon: "🎯", href: "/dashboard/admin/roles" },
  { title: "Generated Skills", desc: "View AI-generated skills for job roles.", icon: "🧠", href: "/dashboard/admin/skills" },
  { title: "Generated Categories", desc: "View AI-created skill categories.", icon: "📚", href: "/dashboard/admin/categories" },
  { title: "AI Content Monitor", desc: "Review AI learning content quality.", icon: "🤖", href: "/dashboard/admin/ai-content" },
  { title: "Platform Analytics", desc: "Track users, roles, skills, and learning usage.", icon: "📊", href: "/dashboard/admin/analytics" },
  { title: "System Health", desc: "Check backend, database, auth, and AI status.", icon: "🛰️", href: "/dashboard/admin/system-health" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedJobRoleResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRole = async (e: FormEvent) => {
    e.preventDefault();
    if (generating) return;

    if (title.trim().length < 2) {
      setError("Please enter a valid job role title.");
      return;
    }

    try {
      setGenerating(true);
      setError("");
      setResult(null);

      const data = await generateJobRoleWithAI({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      setResult(data);
      setTitle("");
      setDescription("");
      await loadStats();
    } catch (err) {
      console.error(err);
      setError("Unable to generate job role. Check admin authorization.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Admin Control Center</h1>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)", fontWeight: "600" }}>
              🛡️ Admin Access
            </span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Banner */}
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="badge badge-primary">AI Career Automation Engine</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              AI Job Role & Skill Generator
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "600px", lineHeight: "1.6" }}>
              Enter a new job role (e.g. Cyber Security Analyst, Cloud Engineer) and Nexvora AI will automatically generate required skill paths and categories.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Registered Users", value: stats?.users ?? 0, icon: "👥", color: "#6366f1" },
              { label: "Career Job Roles", value: stats?.roles ?? 0, icon: "🎯", color: "#8b5cf6" },
              { label: "AI Generated Skills", value: stats?.skills ?? 0, icon: "🧠", color: "#06b6d4" },
              { label: "Skill Categories", value: stats?.categories ?? 0, icon: "📚", color: "#10b981" },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "12px", flexShrink: 0,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: "900", color: s.color, lineHeight: 1 }}>
                    {loading ? "..." : s.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "4px" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form & Output Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
            {/* Input Form */}
            <div className="glass" style={{ padding: "24px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>Add New Job Role</h3>
              <p style={{ fontSize: "13px", color: "var(--nex-text-3)", marginBottom: "16px" }}>
                Type job role title to let AI generate skill tracks and topics.
              </p>

              {error && (
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", marginBottom: "14px" }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleGenerateRole} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "4px" }}>
                    Job Role Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="nex-input"
                    placeholder="e.g. Cloud Solutions Architect"
                    required
                    style={{ padding: "12px 14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "4px" }}>
                    Short Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="nex-input"
                    placeholder="Provide additional details or context..."
                    rows={3}
                    style={{ resize: "none", padding: "12px 14px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "14px" }}
                >
                  {generating ? "⟳ AI is Generating Role & Skills..." : "⚡ Generate Role with AI"}
                </button>
              </form>
            </div>

            {/* Generated Output Display */}
            <div className="glass" style={{ padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700" }}>AI Generation Output</h3>
                <span className="badge badge-primary" style={{ fontSize: "11px" }}>
                  {result ? "✓ Completed" : "Waiting for Input"}
                </span>
              </div>

              {!result ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", border: "1px dashed var(--nex-border)", borderRadius: "12px", padding: "30px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🤖</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>No role generated yet</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", maxWidth: "260px" }}>
                    Fill out the form on the left to trigger the AI career track generator.
                  </div>
                </div>
              ) : (
                <div style={{ overflowY: "auto", flex: 1 }}>
                  <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: "14px" }}>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#a5b4fc" }}>{(result.role as any).title || result.role.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--nex-text-2)", marginTop: "2px" }}>{result.role.description}</div>
                  </div>

                  <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Generated Skills ({result.skills?.length || 0})
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {result.skills?.map((s) => (
                      <div key={s.name} style={{ padding: "10px 14px", borderRadius: "8px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)" }}>
                        <div style={{ fontSize: "13px", fontWeight: "700" }}>🧠 {s.name}</div>
                        <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "2px" }}>
                          Category: {s.category} {s.created ? "• [NEW]" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Admin Modules Grid */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Platform Admin Modules</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {ADMIN_MODULES.map((mod) => (
                <Link key={mod.title} href={mod.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="glass glass-hover" style={{ padding: "18px", borderRadius: "12px", display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "10px", flexShrink: 0,
                      background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                    }}>{mod.icon}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "2px" }}>{mod.title}</div>
                      <div style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>{mod.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}