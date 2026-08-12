"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminAIContentPage() {
  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>AI Content Quality Monitor</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">AI Evaluation Active</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              AI Content Monitor & Prompt Tuning
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Audit generated practice questions, AI teacher explanations, and interview scorecards.
            </p>
          </div>

          <div className="glass" style={{ padding: "24px", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>Generated Content Stream</h3>
            <p style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>
              All AI-generated outputs pass automated evaluation bounds before being presented to users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}