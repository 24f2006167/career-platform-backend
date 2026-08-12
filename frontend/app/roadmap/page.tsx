"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

const ROADMAP_DATA = {
  "Software Engineer": [
    { id: 1, title: "Programming Fundamentals", icon: "🐍", skills: ["Python / C++ / Java", "Data Types & Control Flow", "OOP Concepts", "Recursion"], proficiency: 78, problems: 45, status: "completed", category: "foundation" },
    { id: 2, title: "Data Structures & Algorithms", icon: "🌳", skills: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming", "Sorting & Searching"], proficiency: 62, problems: 89, status: "in-progress", category: "dsa", isWeakness: false },
    { id: 3, title: "Database Management", icon: "🗄️", skills: ["SQL Queries", "Normalization", "Indexing", "Transactions", "NoSQL Basics"], proficiency: 71, problems: 22, status: "in-progress", category: "dbms" },
    { id: 4, title: "Operating Systems", icon: "⚙️", skills: ["Processes & Threads", "Memory Management", "File Systems", "Scheduling", "Deadlocks"], proficiency: 54, problems: 18, status: "in-progress", category: "os", isWeakness: true },
    { id: 5, title: "Computer Networks", icon: "🌐", skills: ["OSI Model", "TCP/IP", "HTTP/HTTPS", "DNS", "Load Balancers"], proficiency: 42, problems: 12, status: "weak", category: "networks", isWeakness: true },
    { id: 6, title: "System Design", icon: "🏗️", skills: ["Scalability", "Microservices", "Caching", "Message Queues", "Database Sharding"], proficiency: 31, problems: 8, status: "weak", category: "system_design", isWeakness: true },
    { id: 7, title: "Backend Development", icon: "🚀", skills: ["REST APIs", "FastAPI / Django", "Authentication", "Docker", "Redis"], proficiency: 67, problems: 34, status: "in-progress", category: "backend" },
    { id: 8, title: "Interview Preparation", icon: "🎤", skills: ["Behavioral Questions", "STAR Method", "Mock Interviews", "Resume Optimization"], proficiency: 45, problems: 15, status: "not-started", category: "interview" },
  ]
};

const TARGET_ROLES = ["Software Engineer", "Backend Engineer", "Frontend Engineer", "Full Stack Developer", "Data Engineer", "DevOps Engineer"];

const DSA_SUBTOPICS = [
  { name: "Arrays", percent: 95 }, { name: "Strings", percent: 82 }, { name: "Linked Lists", percent: 71 },
  { name: "Trees", percent: 58 }, { name: "Graphs", percent: 34 }, { name: "Dynamic Programming", percent: 22 },
  { name: "Greedy", percent: 45 }, { name: "Binary Search", percent: 68 },
];

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [expandedStep, setExpandedStep] = useState<number | null>(2);
  const steps = ROADMAP_DATA[selectedRole as keyof typeof ROADMAP_DATA] || [];
  const overallProgress = Math.round(steps.reduce((acc, s) => acc + s.proficiency, 0) / steps.length);

  const statusStyle: Record<string, { border: string; bg: string; dot: string }> = {
    completed: { border: "rgba(16,185,129,0.4)", bg: "rgba(16,185,129,0.05)", dot: "#10b981" },
    "in-progress": { border: "rgba(99,102,241,0.4)", bg: "rgba(99,102,241,0.05)", dot: "#6366f1" },
    weak: { border: "rgba(239,68,68,0.4)", bg: "rgba(239,68,68,0.05)", dot: "#ef4444" },
    "not-started": { border: "var(--nex-border)", bg: "transparent", dot: "var(--nex-text-3)" },
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Roadmap</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>Overall Progress:</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--nex-primary)" }}>{overallProgress}%</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Role selector */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
            {TARGET_ROLES.map((role) => (
              <button key={role} onClick={() => setSelectedRole(role)} style={{
                padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600",
                border: `1px solid ${selectedRole === role ? "var(--nex-primary)" : "var(--nex-border)"}`,
                background: selectedRole === role ? "rgba(99,102,241,0.15)" : "transparent",
                color: selectedRole === role ? "var(--nex-primary)" : "var(--nex-text-2)",
                cursor: "pointer", transition: "all 0.2s",
              }}>{role}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            {/* Main roadmap */}
            <div>
              {steps.map((step, idx) => {
                const style = statusStyle[step.status] || statusStyle["not-started"];
                const isExpanded = expandedStep === step.id;
                return (
                  <div key={step.id} style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                    {/* Timeline line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: style.bg, border: `2px solid ${style.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", flexShrink: 0, zIndex: 1,
                      }}>{step.icon}</div>
                      {idx < steps.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: style.dot, opacity: 0.3, marginTop: "4px", minHeight: "20px" }} />
                      )}
                    </div>

                    {/* Card */}
                    <div style={{
                      flex: 1, border: `1px solid ${style.border}`, borderRadius: "12px",
                      background: style.bg, overflow: "hidden", cursor: "pointer",
                      marginBottom: idx < steps.length - 1 ? "0" : "0",
                      transition: "all 0.2s",
                    }} onClick={() => setExpandedStep(isExpanded ? null : step.id)}>
                      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "700" }}>{step.title}</span>
                            {step.isWeakness && (
                              <span style={{ fontSize: "11px", padding: "1px 8px", borderRadius: "999px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>⚠️ Weakness</span>
                            )}
                            {step.status === "completed" && (
                              <span style={{ fontSize: "11px", padding: "1px 8px", borderRadius: "999px", background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>✓ Done</span>
                            )}
                          </div>
                          <div className="progress-bar" style={{ height: "5px", width: "100%", maxWidth: "300px" }}>
                            <div className="progress-fill" style={{ width: `${step.proficiency}%` }} />
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "20px", fontWeight: "800", color: style.dot }}>{step.proficiency}%</div>
                          <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{step.problems} problems</div>
                        </div>
                        <div style={{ color: "var(--nex-text-3)", fontSize: "12px" }}>{isExpanded ? "▲" : "▼"}</div>
                      </div>

                      {/* Expanded skills */}
                      {isExpanded && (
                        <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--nex-border)", paddingTop: "12px" }}>
                          <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Skills in this track</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                            {step.skills.map((skill) => (
                              <span key={skill} className="tag-chip" style={{ fontSize: "12px" }}>{skill}</span>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Link href="/problems" className="btn-primary btn-sm">Practice Problems →</Link>
                            <Link href="/learn" className="btn-ghost btn-sm">Study Material</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right sidebar — DSA breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* DSA subtopics */}
              <div className="stat-card">
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--nex-text-3)", marginBottom: "14px" }}>DSA TOPIC BREAKDOWN</div>
                {DSA_SUBTOPICS.map((t) => (
                  <div key={t.name} style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px" }}>{t.name}</span>
                      <span style={{ fontSize: "12px", color: t.percent < 50 ? "#ef4444" : "var(--nex-text-3)", fontWeight: t.percent < 50 ? "700" : "400" }}>{t.percent}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: "4px" }}>
                      <div style={{
                        height: "100%", borderRadius: "999px", width: `${t.percent}%`,
                        background: t.percent >= 70 ? "var(--nex-success)" : t.percent >= 40 ? "var(--nex-primary)" : "var(--nex-danger)",
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly plan */}
              <div className="stat-card">
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--nex-text-3)", marginBottom: "14px" }}>📅 THIS WEEK'S PLAN</div>
                {[
                  { day: "Mon", task: "Graph BFS/DFS", type: "Problem" },
                  { day: "Tue", task: "Topological Sort", type: "Problem" },
                  { day: "Wed", task: "OS Scheduling", type: "Learn" },
                  { day: "Thu", task: "DP on Strings", type: "Problem" },
                  { day: "Fri", task: "System Design Mock", type: "Interview" },
                  { day: "Sat", task: "Contest", type: "Contest" },
                  { day: "Sun", task: "Review & Revise", type: "Review" },
                ].map((d) => (
                  <div key={d.day} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
                    <span style={{ width: 30, fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)" }}>{d.day}</span>
                    <span style={{ flex: 1, fontSize: "13px" }}>{d.task}</span>
                    <span style={{
                      fontSize: "10px", padding: "2px 7px", borderRadius: "999px", fontWeight: "600",
                      background: d.type === "Problem" ? "rgba(99,102,241,0.15)" : d.type === "Contest" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                      color: d.type === "Problem" ? "var(--nex-primary)" : d.type === "Contest" ? "var(--nex-warning)" : "var(--nex-success)",
                    }}>{d.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
