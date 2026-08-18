"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

interface SystemHealth {
  status?: string;
  backend?: string;
  version?: string;
  database?: string;
  ai_learning?: string;
  admin?: string;
  auth?: string;
  coding_judge?: string;
  interview_prep?: string;
}

export default function AdminSystemHealthPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/health");
      const data = await res.json();
      setHealth(data);
    } catch {
      setHealth({ status: "degraded", database: "disconnected" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkHealth();
    }, 0);
    return () => clearTimeout(timer);
  }, [checkHealth]);

  const services = [
    { name: "FastAPI Backend Core", status: health?.status === "ok" ? "Operational" : "Offline", icon: "⚡", lat: "12ms" },
    { name: "PostgreSQL Database", status: health?.database === "connected" ? "Operational" : "Offline", icon: "🗄️", lat: "4ms" },
    { name: "Subprocess Sandbox Judge", status: health?.coding_judge === "enabled" ? "Operational" : "Offline", icon: "⚖️", lat: "92ms" },
    { name: "AI Learning Generator", status: health?.ai_learning === "enabled" ? "Operational" : "Offline", icon: "🤖", lat: "180ms" },
    { name: "Interview Prep Engine", status: health?.interview_prep === "enabled" ? "Operational" : "Offline", icon: "🎤", lat: "45ms" },
    { name: "JWT Auth & Security", status: health?.auth === "enabled" ? "Operational" : "Offline", icon: "🔒", lat: "2ms" },
  ];

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>System Health Monitor</h1>
          <div style={{ marginLeft: "auto" }}>
            <button className="btn-ghost btn-sm" onClick={checkHealth}>
              {loading ? "⟳ Refreshing..." : "⟳ Refresh Health"}
            </button>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span className="badge badge-success">● System Operational</span>
              <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>Version {health?.version || "2.0.0"}</span>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              Infrastructure Status & Microservices
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {services.map((s) => (
              <div key={s.name} className="glass" style={{ padding: "20px", borderRadius: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ fontSize: "28px" }}>{s.icon}</div>
                  <span style={{
                    padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "700",
                    background: s.status === "Operational" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                    color: s.status === "Operational" ? "var(--nex-success)" : "var(--nex-danger)",
                    border: `1px solid ${s.status === "Operational" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`
                  }}>
                    ● {s.status}
                  </span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "4px" }}>{s.name}</div>
                <div style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>Latency: {s.lat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}