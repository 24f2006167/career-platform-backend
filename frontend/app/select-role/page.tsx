"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

const ROLES = [
  { id: "sde-backend", title: "Backend SDE", icon: "⚙️", desc: "Python, FastAPI, PostgreSQL, Redis, Microservices & Distributed Systems." },
  { id: "sde-frontend", title: "Frontend Engineer", icon: "🎨", desc: "React, Next.js, TypeScript, TailwindCSS & Web Performance." },
  { id: "fullstack", title: "Full Stack SDE", icon: "🚀", desc: "End-to-End Web Apps, REST APIs, Databases & Modern Web Stack." },
  { id: "devops", title: "DevOps & Cloud Engineer", icon: "☁️", desc: "Docker, Kubernetes, CI/CD Pipelines, AWS & Infrastructure as Code." },
  { id: "data-analyst", title: "Data Analyst", icon: "📊", desc: "SQL, Python, Pandas, Tableau & Exploratory Data Analysis." },
  { id: "ai-engineer", title: "AI / ML Engineer", icon: "🤖", desc: "PyTorch, Transformers, LLMs, Vector Databases & Model Deployment." },
];

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState("sde-backend");

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Choose Target Career Role</h1>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Select Your <span className="gradient-text">Engineering Path</span>
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Nexvora AI will tailor your practice problems, learning tracks, and mock interview questions for your chosen role.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {ROLES.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className="glass glass-hover"
                style={{
                  padding: "22px", borderRadius: "16px", cursor: "pointer",
                  border: selectedRole === r.id ? "2px solid var(--nex-primary)" : "1px solid var(--nex-border)",
                  background: selectedRole === r.id ? "rgba(99,102,241,0.1)" : "var(--nex-surface)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{r.icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: "800", marginBottom: "6px" }}>{r.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--nex-text-2)", lineHeight: "1.5" }}>{r.desc}</p>
                <div style={{ marginTop: "14px", fontSize: "12px", color: selectedRole === r.id ? "var(--nex-primary)" : "var(--nex-text-3)", fontWeight: "700" }}>
                  {selectedRole === r.id ? "✓ Active Target Path" : "Select Path"}
                </div>
              </div>
            ))}
          </div>

          <Link href="/roadmap" className="btn-primary" style={{ padding: "14px 28px", fontSize: "15px" }}>
            Confirm Path & View Roadmap →
          </Link>
        </div>
      </div>
    </div>
  );
}
