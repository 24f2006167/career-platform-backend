"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminDatabasePage() {
  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Database Management</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">PostgreSQL 16</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Relational Database Tables
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              PostgreSQL schema status, table counts, connection pools, and migration records.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {["users", "problems", "test_cases", "submissions", "contests", "user_progress", "achievements", "roles", "skills"].map((table) => (
              <div key={table} className="glass" style={{ padding: "18px", borderRadius: "12px" }}>
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>🗄️</div>
                <div style={{ fontSize: "15px", fontWeight: "700" }}>{table}</div>
                <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "2px" }}>Table Status: Active</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}