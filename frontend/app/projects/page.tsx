"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const PROJECTS = [
  {
    id: "distributed-cache",
    title: "Distributed LRU Memory Cache",
    category: "System Design & Caching",
    level: "Advanced",
    stars: 1420,
    tags: ["Go", "gRPC", "Consistent Hashing", "Redis Protocol"],
    description: "Build an in-memory key-value cache cluster with node discovery, consistent hashing partitioner, and eviction policies.",
    skills: ["Concurrency", "gRPC", "Sharding"],
  },
  {
    id: "realtime-code-judge",
    title: "Real-time Distributed Code Judge Engine",
    category: "Full Stack SDE",
    level: "Hard",
    stars: 2180,
    tags: ["Python", "Docker Sandbox", "Celery", "PostgreSQL"],
    description: "Design an isolated code execution engine that spawns ephemeral Linux containers, measures CPU/RAM bounds, and returns test case verdicts.",
    skills: ["Docker API", "Worker Queues", "Security Isolation"],
  },
  {
    id: "kafka-analytics-stream",
    title: "Kafka Real-Time Clickstream Pipeline",
    category: "Data & Systems",
    level: "Intermediate",
    stars: 890,
    tags: ["Java", "Apache Kafka", "Flink", "Elasticsearch"],
    description: "Build an end-to-end streaming data pipeline that ingests 50k events/sec, performs tumbling window aggregations, and indexes into Elastic.",
    skills: ["Stream Processing", "Event-Driven Architecture"],
  },
  {
    id: "ai-interview-copilot",
    title: "AI Voice Mock Interview Copilot",
    category: "AI & Full Stack",
    level: "Intermediate",
    stars: 1650,
    tags: ["Next.js", "FastAPI", "OpenAI API", "WebSockets"],
    description: "Develop a real-time conversational AI interviewer that listens to candidate responses, evaluates system design diagrams, and provides instant scoring.",
    skills: ["WebSockets", "LLM Fine-tuning", "Audio Streaming"],
  },
];

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>SDE Portfolio Projects</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <span className="badge badge-primary">4 Production Projects</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Hero Banner */}
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Resume-Boosting Capstones</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Real-World System Engineering Projects
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "650px", lineHeight: "1.6" }}>
              Build production-grade distributed systems and AI applications designed to stand out on candidate resumes during Tier-1 tech interviews.
            </p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {["All", "System Design", "Full Stack SDE", "AI & Data"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={selectedTag === t ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
                style={{ borderRadius: "999px" }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="glass glass-hover" style={{ padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <span className="badge badge-primary" style={{ fontSize: "11px" }}>{p.category}</span>
                    <span style={{ fontSize: "12px", color: "#a5b4fc", fontWeight: "700" }}>★ {p.stars} Stars</span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px", color: "var(--nex-text-1)" }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: "13px", color: "var(--nex-text-2)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {p.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600",
                        background: "rgba(255,255,255,0.06)", color: "var(--nex-text-2)", border: "1px solid var(--nex-border)"
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--nex-border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--nex-text-3)", fontWeight: "600" }}>
                    Level: <strong style={{ color: "var(--nex-text-1)" }}>{p.level}</strong>
                  </span>
                  <button className="btn-primary btn-sm">
                    🚀 View Specification →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
