"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminAnalyticsPage() {
  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Platform Analytics</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">Real-time Metrics</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Usage & Performance Analytics
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Track submission velocity, AI interview completions, user retention, and judge metrics.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Daily Submissions", val: "142", icon: "💻", change: "+18%" },
              { label: "AI Interview Sessions", val: "38", icon: "🎤", change: "+24%" },
              { label: "Judge Acceptance Rate", val: "68.4%", icon: "✅", change: "+3.2%" },
            ].map((m) => (
              <div key={m.label} className="stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "24px" }}>{m.icon}</span>
                  <span style={{ fontSize: "12px", color: "var(--nex-success)", fontWeight: "700" }}>{m.change}</span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#a5b4fc" }}>{m.val}</div>
                <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "4px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}