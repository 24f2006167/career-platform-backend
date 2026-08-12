"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const DISCUSSIONS = [
  {
    id: 1,
    title: "Google SDE-2 Interview Experience (System Design & Coding Rounds)",
    author: "alex_dev",
    role: "Senior SDE @ Google",
    avatar: "A",
    upvotes: 342,
    replies: 48,
    category: "Interview Experience",
    time: "2 hours ago",
    content: "Cleared 4 onsite technical rounds. Focus heavily on LRU eviction design, Consistent Hashing, and Graph Traversal optimizations..."
  },
  {
    id: 2,
    title: "How to handle 100k Concurrent WebSocket Connections in FastAPI & Redis",
    author: "priya_arch",
    role: "Backend Architect",
    avatar: "P",
    upvotes: 215,
    replies: 29,
    category: "System Design",
    time: "5 hours ago",
    content: "Detailed post on tuning Linux socket file descriptors, asyncio loop polling, and pub/sub sharding across Redis nodes..."
  },
  {
    id: 3,
    title: "Nexvora Weekly Contest #1 Discussion & Solutions (Problem 1 to 4)",
    author: "nexvora_mod",
    role: "Staff Contest Setter",
    avatar: "N",
    upvotes: 188,
    replies: 62,
    category: "Contest Solutions",
    time: "1 day ago",
    content: "Official editorial and Python/Java solutions for Binary Tree Maximum Path Sum and Sliding Window Median..."
  },
];

export default function DiscussionsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Developer Community Forum</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <button className="btn-primary btn-sm">
              + Start Discussion
            </button>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Banner */}
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Developer Peer Knowledge Hub</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              SDE Discussions & Interview Experiences
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "650px", lineHeight: "1.6" }}>
              Read verified interview debriefs from FAANG engineering candidates, share system architecture designs, and discuss contest solution editorials.
            </p>
          </div>

          {/* Categories Bar */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {["All", "Interview Experience", "System Design", "Contest Solutions"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={activeTab === t ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
                style={{ borderRadius: "999px" }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Thread List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {DISCUSSIONS.map((d) => (
              <div key={d.id} className="glass glass-hover" style={{ padding: "20px", borderRadius: "14px", display: "flex", gap: "16px" }}>
                {/* Upvote Column */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 14px", borderRadius: "10px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", minWidth: 60 }}>
                  <span style={{ fontSize: "14px" }}>▲</span>
                  <span style={{ fontSize: "16px", fontWeight: "800", color: "#a5b4fc" }}>{d.upvotes}</span>
                </div>

                {/* Content Column */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span className="badge badge-primary" style={{ fontSize: "10px" }}>{d.category}</span>
                    <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>Posted by @{d.author} ({d.role}) · {d.time}</span>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "6px", color: "var(--nex-text-1)" }}>
                    {d.title}
                  </h3>

                  <p style={{ fontSize: "13px", color: "var(--nex-text-2)", lineHeight: "1.5", marginBottom: "10px" }}>
                    {d.content}
                  </p>

                  <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--nex-text-3)", fontWeight: "600" }}>
                    <span>💬 {d.replies} Replies</span>
                    <span>🔖 Save Thread</span>
                    <span>🔗 Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
