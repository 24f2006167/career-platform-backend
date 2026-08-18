"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

interface SheetProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  articleUrl?: string;
  youtubeUrl?: string;
  estimatedTime: string;
  topic: string;
}

interface DaySheet {
  day: number;
  title: string;
  problems: SheetProblem[];
}

const DSA_SHEETS_DATA: DaySheet[] = [
  {
    day: 1,
    title: "Day 1 : Array (Part 1)",
    problems: [
      {
        id: "p1",
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Meta"],
        articleUrl: "https://leetcode.com/problems/two-sum/solution/",
        youtubeUrl: "https://www.youtube.com/watch?v=UXDSeD9mN-E",
        estimatedTime: "15 min",
        topic: "Array & Hash Map",
      },
      {
        id: "p2",
        title: "Majority Element (Boyer-Moore Voting)",
        slug: "majority-element",
        difficulty: "Easy",
        companies: ["Amazon", "Google", "Microsoft"],
        articleUrl: "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/",
        youtubeUrl: "https://www.youtube.com/watch?v=npowH4yn0XM",
        estimatedTime: "20 min",
        topic: "Array",
      },
      {
        id: "p3",
        title: "Maximum Subarray (Kadane's Algorithm)",
        slug: "maximum-subarray",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Microsoft", "LinkedIn"],
        articleUrl: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/",
        youtubeUrl: "https://www.youtube.com/watch?v=AHZpyENo7kE",
        estimatedTime: "25 min",
        topic: "Array & DP",
      },
      {
        id: "p4",
        title: "Single Number (XOR Property)",
        slug: "single-number",
        difficulty: "Easy",
        companies: ["Apple", "Amazon", "Meta"],
        articleUrl: "https://leetcode.com/problems/single-number/",
        youtubeUrl: "https://www.youtube.com/watch?v=bYw780k9h3M",
        estimatedTime: "15 min",
        topic: "Bit Manipulation",
      },
      {
        id: "p5",
        title: "Merge Two Sorted Arrays Without Extra Space",
        slug: "merge-sorted-array",
        difficulty: "Medium",
        companies: ["Microsoft", "Google", "Amazon"],
        articleUrl: "https://takeuforward.org/data-structure/merge-two-sorted-arrays-without-extra-space/",
        youtubeUrl: "https://www.youtube.com/watch?v=n7uwj04E0I4",
        estimatedTime: "30 min",
        topic: "Two Pointers",
      },
    ],
  },
  {
    day: 2,
    title: "Day 2 : Array (Part 2 & Matrix)",
    problems: [
      {
        id: "p6",
        title: "Rotate Image / Matrix by 90 Degrees",
        slug: "rotate-image",
        difficulty: "Medium",
        companies: ["Amazon", "Microsoft", "Apple"],
        articleUrl: "https://takeuforward.org/data-structure/rotate-image-by-90-degree/",
        youtubeUrl: "https://www.youtube.com/watch?v=Y72QeX0Efxw",
        estimatedTime: "25 min",
        topic: "Matrix",
      },
      {
        id: "p7",
        title: "Pascal's Triangle",
        slug: "pascals-triangle",
        difficulty: "Easy",
        companies: ["Amazon", "Google"],
        articleUrl: "https://takeuforward.org/data-structure/program-to-generate-pascals-triangle/",
        youtubeUrl: "https://www.youtube.com/watch?v=6JYIGP6XBLo",
        estimatedTime: "20 min",
        topic: "Array",
      },
      {
        id: "p8",
        title: "Next Permutation",
        slug: "next-permutation",
        difficulty: "Medium",
        companies: ["Meta", "Google", "Amazon"],
        articleUrl: "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/",
        youtubeUrl: "https://www.youtube.com/watch?v=JDOXKqF60RQ",
        estimatedTime: "30 min",
        topic: "Array",
      },
    ],
  },
  {
    day: 3,
    title: "Day 3 : Strings & Hash Table",
    problems: [
      {
        id: "p9",
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        difficulty: "Easy",
        companies: ["Amazon", "Google", "Microsoft"],
        articleUrl: "https://takeuforward.org/data-structure/check-for-balanced-parentheses/",
        youtubeUrl: "https://www.youtube.com/watch?v=wkDfsKijrZ8",
        estimatedTime: "15 min",
        topic: "Stack & String",
      },
      {
        id: "p10",
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google"],
        articleUrl: "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/",
        youtubeUrl: "https://www.youtube.com/watch?v=qtVh-XEpsJo",
        estimatedTime: "30 min",
        topic: "Sliding Window",
      },
    ],
  },
  {
    day: 4,
    title: "Day 4 : Linked List & Recursion",
    problems: [
      {
        id: "p11",
        title: "Reverse Linked List",
        slug: "reverse-linked-list",
        difficulty: "Easy",
        companies: ["Amazon", "Apple", "Google"],
        articleUrl: "https://takeuforward.org/data-structure/reverse-a-linked-list/",
        youtubeUrl: "https://www.youtube.com/watch?v=iRtLEfYI0c8",
        estimatedTime: "20 min",
        topic: "Linked List",
      },
      {
        id: "p12",
        title: "Detect Cycle in Linked List (Floyd's Tortoise & Hare)",
        slug: "linked-list-cycle",
        difficulty: "Easy",
        companies: ["Amazon", "Microsoft"],
        articleUrl: "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/",
        youtubeUrl: "https://www.youtube.com/watch?v=354J83hXcT0",
        estimatedTime: "20 min",
        topic: "Linked List & Two Pointers",
      },
    ],
  },
  {
    day: 5,
    title: "Day 5 : Binary Search & Trees",
    problems: [
      {
        id: "p13",
        title: "Binary Search",
        slug: "binary-search",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Meta"],
        articleUrl: "https://takeuforward.org/data-structure/binary-search-explained/",
        youtubeUrl: "https://www.youtube.com/watch?v=MHf6aWe25eE",
        estimatedTime: "15 min",
        topic: "Binary Search",
      },
      {
        id: "p14",
        title: "Lowest Common Ancestor of Binary Tree",
        slug: "lowest-common-ancestor",
        difficulty: "Medium",
        companies: ["Meta", "Amazon", "Google"],
        articleUrl: "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/",
        youtubeUrl: "https://www.youtube.com/watch?v=_-QHfMDde90",
        estimatedTime: "25 min",
        topic: "Binary Tree",
      },
    ],
  },
  {
    day: 6,
    title: "Day 6 : Dynamic Programming & Graphs",
    problems: [
      {
        id: "p15",
        title: "0/1 Knapsack Problem",
        slug: "01-knapsack",
        difficulty: "Medium",
        companies: ["Amazon", "Google", "Microsoft"],
        articleUrl: "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/",
        youtubeUrl: "https://www.youtube.com/watch?v=GqOmJxyKH8w",
        estimatedTime: "35 min",
        topic: "Dynamic Programming",
      },
      {
        id: "p16",
        title: "Graph BFS / DFS Traversal & Cycle Detection",
        slug: "graph-bfs-dfs",
        difficulty: "Medium",
        companies: ["Amazon", "Meta", "Google"],
        articleUrl: "https://takeuforward.org/data-structure/breadth-first-search-bfs-level-order-traversal/",
        youtubeUrl: "https://www.youtube.com/watch?v=-tgVpUgsQ5k",
        estimatedTime: "30 min",
        topic: "Graphs",
      },
    ],
  },
];

export default function DSASheetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("DSA Sheet");
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({ p1: true, p9: true });
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({ p1: true });

  const totalProblemsCount = DSA_SHEETS_DATA.reduce((acc, day) => acc + day.problems.length, 0);
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalProblemsCount) * 100);

  const toggleComplete = (id: string) => {
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "16px", fontWeight: "800" }}>📑 DSA Sheet & Coding Center</h1>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 12px", borderRadius: "999px",
              background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)",
              fontSize: "13px", color: "#34d399", fontWeight: "700"
            }}>
              ✓ {completedCount}/{totalProblemsCount} Solved ({progressPercent}%)
            </div>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Card */}
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "6px" }}>
                  <span className="gradient-text">DSA Sheet</span> — Most Important Interview Questions
                </h2>
                <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "650px", lineHeight: "1.6" }}>
                  Curated topic-wise coding challenges asked in Tier-1 product companies (Google, Amazon, Meta, Microsoft, Apple, Netflix). Practice directly inside Nexvora&apos;s IDE!
                </p>
              </div>

              {/* Stats badges */}
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{
                  padding: "10px 16px", borderRadius: "12px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", textAlign: "center"
                }}>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#34d399" }}>41</div>
                  <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>Easy</div>
                </div>
                <div style={{
                  padding: "10px 16px", borderRadius: "12px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", textAlign: "center"
                }}>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#f59e0b" }}>119</div>
                  <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>Medium</div>
                </div>
                <div style={{
                  padding: "10px 16px", borderRadius: "12px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", textAlign: "center"
                }}>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#ef4444" }}>33</div>
                  <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>Hard</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: "20px" }}>
              <div className="progress-bar" style={{ height: "8px" }}>
                <div className="progress-fill" style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg, #6366f1, #34d399)" }} />
              </div>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {["DSA Sheet", "DP Sheet", "System Design Sheet", "Saved Questions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                style={{
                  padding: "10px 18px", borderRadius: "12px", fontSize: "13px", fontWeight: "700",
                  border: `1px solid ${selectedCategory === tab ? "var(--nex-primary)" : "var(--nex-border)"}`,
                  background: selectedCategory === tab ? "rgba(99,102,241,0.15)" : "var(--nex-surface)",
                  color: selectedCategory === tab ? "#a5b4fc" : "var(--nex-text-2)",
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {tab}
              </button>
            ))}
            <div style={{ marginLeft: "auto", minWidth: "240px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search problem or topic..."
                className="nex-input"
                style={{ padding: "8px 14px", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Day-Wise Sheets List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {DSA_SHEETS_DATA.map((daySheet) => {
              const filteredProblems = daySheet.problems.filter((p) => {
                if (selectedCategory === "Saved Questions" && !bookmarkedMap[p.id]) return false;
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q) || p.companies.some(c => c.toLowerCase().includes(q));
              });

              if (filteredProblems.length === 0 && searchQuery) return null;

              return (
                <div key={daySheet.day} className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
                  {/* Day Header */}
                  <div style={{
                    padding: "16px 24px", background: "rgba(15,17,26,0.8)", borderBottom: "1px solid var(--nex-border)",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#a5b4fc" }}>
                      {daySheet.title}
                    </h3>
                    <span style={{ fontSize: "12px", color: "var(--nex-text-3)", fontWeight: "600" }}>
                      {filteredProblems.filter(p => completedMap[p.id]).length} / {filteredProblems.length} Completed
                    </span>
                  </div>

                  {/* Problem Table */}
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--nex-border)", color: "var(--nex-text-3)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <th style={{ padding: "12px 16px", width: "50px" }}>Done</th>
                          <th style={{ padding: "12px 16px" }}>Problem</th>
                          <th style={{ padding: "12px 16px" }}>Topic</th>
                          <th style={{ padding: "12px 16px" }}>Level</th>
                          <th style={{ padding: "12px 16px" }}>Companies</th>
                          <th style={{ padding: "12px 16px", textAlign: "center" }}>Resources</th>
                          <th style={{ padding: "12px 16px", textAlign: "right" }}>Code Center</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProblems.map((prob) => {
                          const isDone = !!completedMap[prob.id];
                          const isSaved = !!bookmarkedMap[prob.id];

                          return (
                            <tr
                              key={prob.id}
                              style={{
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                                background: isDone ? "rgba(16,185,129,0.03)" : "transparent",
                                transition: "background 0.15s"
                              }}
                            >
                              {/* Checkbox */}
                              <td style={{ padding: "14px 16px" }}>
                                <input
                                  type="checkbox"
                                  checked={isDone}
                                  onChange={() => toggleComplete(prob.id)}
                                  style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#34d399" }}
                                />
                              </td>

                              {/* Title */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ fontWeight: "700", color: isDone ? "var(--nex-text-3)" : "var(--nex-text-1)", textDecoration: isDone ? "line-through" : "none" }}>
                                  {prob.title}
                                </div>
                              </td>

                              {/* Topic */}
                              <td style={{ padding: "14px 16px" }}>
                                <span className="tag-chip" style={{ fontSize: "11px" }}>{prob.topic}</span>
                              </td>

                              {/* Level */}
                              <td style={{ padding: "14px 16px" }}>
                                <span style={{
                                  fontSize: "11px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px",
                                  color: prob.difficulty === "Easy" ? "#34d399" : prob.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
                                  background: prob.difficulty === "Easy" ? "rgba(16,185,129,0.12)" : prob.difficulty === "Medium" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)"
                                }}>
                                  {prob.difficulty}
                                </span>
                              </td>

                              {/* Companies */}
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                  {prob.companies.map((comp) => (
                                    <span key={comp} style={{
                                      fontSize: "10px", padding: "2px 6px", borderRadius: "4px",
                                      background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)"
                                    }}>
                                      {comp}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              {/* Article & Youtube */}
                              <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                  {prob.articleUrl && (
                                    <a
                                      href={prob.articleUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        padding: "4px 8px", borderRadius: "6px", fontSize: "11px",
                                        background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                                        color: "#a5b4fc", textDecoration: "none", fontWeight: "600"
                                      }}
                                    >
                                      📄 Article
                                    </a>
                                  )}
                                  {prob.youtubeUrl && (
                                    <a
                                      href={prob.youtubeUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        padding: "4px 8px", borderRadius: "6px", fontSize: "11px",
                                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                                        color: "#fca5a5", textDecoration: "none", fontWeight: "600"
                                      }}
                                    >
                                      ▶ Video
                                    </a>
                                  )}
                                </div>
                              </td>

                              {/* Practice Button & Save */}
                              <td style={{ padding: "14px 16px", textAlign: "right" }}>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                                  <button
                                    onClick={() => toggleBookmark(prob.id)}
                                    style={{
                                      background: "transparent", border: "none", cursor: "pointer", fontSize: "16px"
                                    }}
                                    title={isSaved ? "Saved" : "Bookmark"}
                                  >
                                    {isSaved ? "🔖" : "📑"}
                                  </button>

                                  <Link
                                    href={`/problems/${prob.slug}`}
                                    className="btn-primary btn-sm"
                                    style={{ padding: "6px 12px", fontSize: "12px", textDecoration: "none" }}
                                  >
                                    &lt;/&gt; Code Center
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
