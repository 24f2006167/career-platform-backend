"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  lessons: number;
  duration: string;
  icon: string;
  progress: number;
  description: string;
  topics: string[];
}

const COURSES: Course[] = [
  {
    id: "dsa-core",
    title: "Data Structures & Algorithms Masterclass",
    category: "DSA",
    level: "Intermediate",
    lessons: 42,
    duration: "18 hours",
    icon: "🌳",
    progress: 65,
    description: "Master essential data structures from Arrays and HashMaps to Trees, Graphs, and Dynamic Programming.",
    topics: ["Arrays & Strings", "Two Pointers", "Sliding Window", "Trees & BST", "Graph Traversals (BFS/DFS)", "Dynamic Programming"],
  },
  {
    id: "system-design-intro",
    title: "System Design for SDE-2 & Senior Roles",
    category: "System Design",
    level: "Advanced",
    lessons: 28,
    duration: "14 hours",
    icon: "🏗️",
    progress: 30,
    description: "Learn to architect high-throughput, fault-tolerant distributed systems. Real-world case studies of Netflix, Uber & Twitter.",
    topics: ["Scalability Fundamentals", "Load Balancing & Proxying", "Caching Strategies (Redis/Memcached)", "Database Sharding & Replication", "Message Queues (Kafka)", "Microservices Architecture"],
  },
  {
    id: "os-networking",
    title: "CS Fundamentals: OS & Computer Networks",
    category: "CS Fundamentals",
    level: "Beginner",
    lessons: 35,
    duration: "12 hours",
    icon: "⚙️",
    progress: 45,
    description: "Deep dive into OS processes, threads, virtual memory, TCP/IP protocol stack, HTTP/2, and socket programming.",
    topics: ["Process vs Thread", "CPU Scheduling Algorithms", "Virtual Memory & Paging", "TCP 3-Way Handshake", "DNS Resolution Pipeline", "HTTP/1.1 vs HTTP/2 vs HTTP/3"],
  },
  {
    id: "dbms-sql",
    title: "Database Systems & SQL Optimization",
    category: "Database",
    level: "Intermediate",
    lessons: 24,
    duration: "10 hours",
    icon: "🗄️",
    progress: 80,
    description: "Master relational schema design, B-Tree indexes, ACID transactions, isolation levels, and query performance tuning.",
    topics: ["Relational Schema & Normalization", "B-Tree & Hash Indexing", "ACID & Concurrency Control", "Query Execution Plans", "NoSQL vs SQL Tradeoffs"],
  },
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "DSA", "System Design", "CS Fundamentals", "Database"];
  const filteredCourses = selectedCategory === "All"
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Learn & Courses</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>Structured Paths</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              Accelerate Your <span className="gradient-text">Engineering Knowledge</span>
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", marginTop: "4px" }}>
              Comprehensive tracks designed to prepare you for technical interviews and production-grade engineering.
            </p>
          </div>

          {/* Category Pills */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: `1px solid ${selectedCategory === cat ? "var(--nex-primary)" : "var(--nex-border)"}`,
                  background: selectedCategory === cat ? "rgba(99,102,241,0.15)" : "transparent",
                  color: selectedCategory === cat ? "var(--nex-primary)" : "var(--nex-text-2)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="glass glass-hover" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "12px",
                    background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0
                  }}>
                    {course.icon}
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <span className="badge badge-primary" style={{ fontSize: "10px" }}>{course.category}</span>
                      <span style={{ fontSize: "11px", color: "var(--nex-text-3)", fontWeight: "600" }}>{course.level}</span>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700" }}>{course.title}</h3>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "var(--nex-text-2)", lineHeight: "1.6", marginBottom: "16px" }}>
                  {course.description}
                </p>

                {/* Topics list */}
                <div style={{ marginBottom: "20px", flex: 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Key Topics Covered
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {course.topics.map((t) => (
                      <span key={t} className="tag-chip" style={{ fontSize: "11px" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Progress bar & Meta */}
                <div style={{ borderTop: "1px solid var(--nex-border)", paddingTop: "14px", marginTop: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                    <span style={{ color: "var(--nex-text-3)" }}>Progress ({course.progress}%)</span>
                    <span style={{ color: "var(--nex-text-2)", fontWeight: "600" }}>{course.lessons} lessons · {course.duration}</span>
                  </div>
                  <div className="progress-bar" style={{ height: "6px", marginBottom: "14px" }}>
                    <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                  </div>
                  <Link href={`/learn/${course.id}`} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                    Continue Track →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
