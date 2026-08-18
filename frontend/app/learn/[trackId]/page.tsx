"use client";

import { use, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Course {
  title: string;
  category: string;
  level: string;
  lessonsCount: number;
  description: string;
  modules: Module[];
}

const COURSE_DATA: Record<string, Course> = {
  "dsa-core": {
    title: "Data Structures & Algorithms Masterclass",
    category: "DSA",
    level: "Intermediate",
    lessonsCount: 42,
    description: "Master essential data structures from Arrays and HashMaps to Trees, Graphs, and Dynamic Programming.",
    modules: [
      {
        title: "Module 1: Arrays & Two-Pointers",
        lessons: [
          { id: "arr-1", title: "Array Memory Representation & Time Complexity", duration: "12 min", completed: true },
          { id: "arr-2", title: "Two-Pointer Strategy: Opposite Direction vs Same Direction", duration: "18 min", completed: true },
          { id: "arr-3", title: "Sliding Window Pattern: Fixed Size vs Dynamic Bounds", duration: "25 min", completed: false },
        ]
      },
      {
        title: "Module 2: Binary Trees & BSTs",
        lessons: [
          { id: "tree-1", title: "Tree Traversals: Pre-order, In-order, Post-order & Level-order", duration: "20 min", completed: false },
          { id: "tree-2", title: "Binary Search Tree Invariants & Insertion Logic", duration: "15 min", completed: false },
        ]
      },
      {
        title: "Module 3: Dynamic Programming Core Patterns",
        lessons: [
          { id: "dp-1", title: "0/1 Knapsack & Subset Sum Paradigm", duration: "30 min", completed: false },
          { id: "dp-2", title: "Longest Common Subsequence & String Alignments", duration: "28 min", completed: false },
        ]
      }
    ]
  },
  "system-design-intro": {
    title: "System Design for SDE-2 & Senior Roles",
    category: "System Design",
    level: "Advanced",
    lessonsCount: 28,
    description: "Learn to architect high-throughput, fault-tolerant distributed systems. Real-world case studies of Netflix, Uber & Twitter.",
    modules: [
      {
        title: "Module 1: Distributed Storage & Caching",
        lessons: [
          { id: "sd-1", title: "Consistent Hashing & Ring Partitioning", duration: "22 min", completed: true },
          { id: "sd-2", title: "Caching Invalidation Patterns (Write-Through vs Read-Through)", duration: "19 min", completed: false },
        ]
      }
    ]
  },
  "os-networking": {
    title: "CS Fundamentals: OS & Computer Networks",
    category: "CS Fundamentals",
    level: "Beginner",
    lessonsCount: 35,
    description: "Deep dive into OS processes, threads, virtual memory, TCP/IP protocol stack, HTTP/2, and socket programming.",
    modules: [
      {
        title: "Module 1: Process Management",
        lessons: [
          { id: "os-1", title: "Process Control Blocks & Context Switching Overhead", duration: "16 min", completed: true },
          { id: "os-2", title: "Mutex Locks, Semaphores & Deadlock Prevention", duration: "24 min", completed: false },
        ]
      }
    ]
  },
  "dbms-sql": {
    title: "Database Systems & SQL Optimization",
    category: "Database",
    level: "Intermediate",
    lessonsCount: 24,
    description: "Deep dive into B+ Tree Indexing, ACID transaction isolation levels, WAL logs, and query execution plans.",
    modules: [
      {
        title: "Module 1: Query Execution & B+ Trees",
        lessons: [
          { id: "db-1", title: "B+ Tree Page Splitting & Index Lookups", duration: "20 min", completed: true },
          { id: "db-2", title: "ACID Isolation Levels & MVCC Concurrency", duration: "26 min", completed: false },
        ]
      }
    ]
  }
};

export default function CourseDetailsPage({ params }: { params: Promise<{ trackId: string }> }) {
  const resolvedParams = use(params);
  const trackId = resolvedParams.trackId;
  const course = COURSE_DATA[trackId] || COURSE_DATA["dsa-core"];

  const [activeLesson, setActiveLesson] = useState(course.modules[0].lessons[0]);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/learn" style={{ textDecoration: "none", color: "var(--nex-text-2)", fontSize: "14px", fontWeight: "600" }}>
              ← Learn Hub
            </Link>
            <span style={{ color: "var(--nex-border)" }}>/</span>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{course.title}</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary" style={{ fontSize: "11px" }}>{course.category}</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Banner */}
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span className="badge badge-primary" style={{ fontSize: "11px" }}>Level: {course.level}</span>
              <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>• {course.lessonsCount} Lessons</span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              {course.title}
            </h1>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "650px" }}>
              {course.description}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
            {/* Sidebar Modules List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {course.modules.map((mod: Module, idx: number) => (
                <div key={idx} className="glass" style={{ padding: "16px", borderRadius: "14px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--nex-text-2)", marginBottom: "10px" }}>
                    {mod.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {mod.lessons.map((les: Lesson) => (
                      <button
                        key={les.id}
                        onClick={() => setActiveLesson(les)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "10px 12px", borderRadius: "8px", border: activeLesson.id === les.id ? "1px solid var(--nex-primary)" : "1px solid transparent",
                          background: activeLesson.id === les.id ? "rgba(99,102,241,0.12)" : "var(--nex-surface)",
                          cursor: "pointer", textAlign: "left", width: "100%"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: activeLesson.id === les.id ? "700" : "500", color: activeLesson.id === les.id ? "#a5b4fc" : "var(--nex-text-1)" }}>
                            {les.completed ? "✓ " : ""}{les.title}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "2px" }}>
                            ⏱ {les.duration}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Lesson Content Viewer */}
            <div className="glass" style={{ padding: "28px", borderRadius: "16px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--nex-text-1)" }}>
                  {activeLesson.title}
                </h2>
                <span className="badge badge-primary" style={{ fontSize: "11px" }}>
                  ⏱ {activeLesson.duration}
                </span>
              </div>

              <div style={{ padding: "16px", borderRadius: "10px", background: "#0d0f1a", border: "1px solid var(--nex-border)", marginBottom: "20px", fontFamily: "monospace", fontSize: "13px", color: "#a5b4fc" }}>
                {`// ${activeLesson.title}\n// Interactive code sandbox & theory explanation\n\ndef analyze_pattern(data):\n    # Complexity: O(N) Time | O(1) Space\n    left, right = 0, len(data) - 1\n    while left < right:\n        if data[left] + data[right] == target:\n            return [left, right]\n        left += 1\n    return []`}
              </div>

              <div style={{ fontSize: "14px", color: "var(--nex-text-2)", lineHeight: "1.7", marginBottom: "24px" }}>
                <p style={{ marginBottom: "12px" }}>
                  This lesson covers essential algorithmic patterns used frequently in Tier-1 software engineering technical interviews.
                </p>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <li>Understand time and space complexity tradeoffs.</li>
                  <li>Learn boundary condition checks to prevent edge-case failures.</li>
                  <li>Apply two-pointer dynamic contractions for optimal performance.</li>
                </ul>
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--nex-border)" }}>
                <button className="btn-ghost btn-sm">
                  ← Previous Lesson
                </button>
                <button className="btn-primary btn-sm">
                  Mark Complete & Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
