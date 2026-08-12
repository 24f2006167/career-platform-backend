"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function RecruiterDashboardPage() {
  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Recruiter Workspace</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">Hiring Portal</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Recruiter & Candidate Assessment Console
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Filter top-performing SDE candidates, view coding contest rankings, and inspect AI interview evaluations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Active Job Listings", val: "6", icon: "💼", color: "#6366f1" },
              { label: "Verified Candidates", val: "24", icon: "👤", color: "#10b981" },
              { label: "Pending Assessments", val: "9", icon: "📝", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "12px", flexShrink: 0,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: "900", color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "4px" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}