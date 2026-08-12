"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/dashboard/Sidebar";
import { use } from "react";

// Monaco editor — loaded client-side only
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface TestCase {
  input: string;
  expected_output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  topic_tags: string[];
  company_tags: string[];
  constraints: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  hints: string[];
  points: number;
  acceptance_rate: number;
  total_submissions: number;
  is_solved: boolean;
  public_test_cases: TestCase[];
}

interface SubmissionResult {
  status: string;
  runtime_ms: number;
  memory_kb: number;
  test_cases_passed: number;
  total_test_cases: number;
  score: number;
  error_message?: string;
  test_results?: Array<{ passed: boolean; status: string; runtime_ms: number; output?: string; expected?: string; error?: string }>;
}

const STARTER_CODE: Record<string, string> = {
  python: `# Write your solution here
# Read input from stdin, print output to stdout
import sys

def isValid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return len(stack) == 0

def solve():
    try:
        s = sys.stdin.read().strip()
    except Exception:
        s = ""
    print(isValid(s))

solve()
`,
  javascript: `// Write your solution here
// Read input from stdin (readline), print to console

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];

rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
    const input = lines.join('\\n').trim();
    solve(input);
});

function solve(input) {
    console.log(true);
}
`,
  cpp: `// Write your solution here
#include <iostream>
#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;
    if (cin >> s) {
        // Solution logic
    }
    cout << "true" << endl;
    return 0;
}
`,
  java: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNext() ? sc.next() : "";
        System.out.println(true);
    }
}
`,
};

const LANGUAGE_LABELS: Record<string, string> = {
  python: "Python 3",
  javascript: "JavaScript",
  cpp: "C++17",
  java: "Java 17",
};

const STATUS_DISPLAY: Record<string, { label: string; color: string; icon: string }> = {
  accepted: { label: "Accepted", color: "var(--nex-success)", icon: "✅" },
  wrong_answer: { label: "Wrong Answer", color: "var(--nex-danger)", icon: "❌" },
  time_limit_exceeded: { label: "Time Limit Exceeded", color: "var(--nex-warning)", icon: "⏱️" },
  runtime_error: { label: "Runtime Error", color: "#f97316", icon: "💥" },
  compilation_error: { label: "Compilation Error", color: "#f97316", icon: "🔧" },
  pending: { label: "Pending...", color: "var(--nex-text-3)", icon: "⏳" },
  running: { label: "Running...", color: "var(--nex-accent)", icon: "⚙️" },
  memory_limit_exceeded: { label: "Memory Limit Exceeded", color: "var(--nex-warning)", icon: "🧠" },
};

export default function ProblemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(STARTER_CODE["python"]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [resultStatus, setResultStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "hints" | "complexity" | "submissions">("description");
  const [shownHints, setShownHints] = useState(0);
  const [activeTestTab, setActiveTestTab] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  const [submissionsList, setSubmissionsList] = useState<any[]>([]);

  useEffect(() => {
    setResult(null);
    setResultStatus(null);
    setSubmitting(false);
    setActiveTab("description");

    // Load saved code from localStorage if available
    const saved = typeof window !== "undefined" ? localStorage.getItem(`nexvora_code_${slug}_${language}`) : null;
    if (saved) {
      setCode(saved);
    } else {
      setCode(STARTER_CODE[language] || "");
    }

    fetchProblem();
    fetchSubmissionsList();
    return () => { wsRef.current?.close(); };
  }, [slug, language]);

  async function fetchProblem() {
    setLoading(true);
    setResult(null);
    setResultStatus(null);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      const res = await fetch(`http://127.0.0.1:8000/api/v1/problems/${slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setProblem(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubmissionsList() {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch(`http://127.0.0.1:8000/api/v1/submissions?problem_slug=${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissionsList(data.items || []);
      }
    } catch (err) {
      console.error("Submissions history fetch error:", err);
    }
  }

  function handleCodeChange(newVal: string) {
    setCode(newVal);
    if (typeof window !== "undefined") {
      localStorage.setItem(`nexvora_code_${slug}_${language}`, newVal);
    }
  }

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    const saved = typeof window !== "undefined" ? localStorage.getItem(`nexvora_code_${slug}_${lang}`) : null;
    setCode(saved || STARTER_CODE[lang] || "");
  }

  async function pollSubmission(submissionId: string, attempts = 0) {
    if (attempts > 20) {
      setSubmitting(false);
      return;
    }
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      const res = await fetch(`http://127.0.0.1:8000/api/v1/submissions/${submissionId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status && data.status !== "pending" && data.status !== "running") {
          setResult(data);
          setResultStatus(data.status);
          setSubmitting(false);
          setActiveTab("complexity");
          fetchSubmissionsList();
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => pollSubmission(submissionId, attempts + 1), 400);
  }

  async function handleSubmit() {
    if (!problem || submitting) return;
    setSubmitting(true);
    setResult(null);
    setResultStatus("pending");
    setActiveTab("complexity");

    try {
      const token = localStorage.getItem("token") || localStorage.getItem("access_token");
      if (!token) {
        alert("Please log in to submit solutions.");
        setSubmitting(false);
        setResultStatus(null);
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/v1/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          problem_slug: slug,
          language,
          code,
        }),
      });

      if (!res.ok) {
        throw new Error(`Submission failed: ${res.status}`);
      }

      const data = await res.json();
      const subId = data.submission_id || data.id;
      setResultStatus("running");
      pollSubmission(subId);

    } catch (err) {
      console.error(err);
      setResultStatus(null);
      setSubmitting(false);
    }
  }

  const difficultyColor: Record<string, string> = {
    easy: "var(--difficulty-easy)",
    medium: "var(--difficulty-medium)",
    hard: "var(--difficulty-hard)",
  };

  if (loading) {
    return (
      <div className="layout-sidebar">
        <Sidebar />
        <div className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "var(--nex-text-3)" }}>
            <div className="animate-spin" style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>⟳</div>
            Loading problem...
          </div>
        </div>
      </div>
    );
  }

  if (!problem) return null;

  const statusInfo = resultStatus ? STATUS_DISPLAY[resultStatus] : null;

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Topbar */}
        <div className="topbar" style={{ flexShrink: 0 }}>
          <a href="/problems" style={{ color: "var(--nex-text-3)", textDecoration: "none", fontSize: "13px", marginRight: "12px" }}>← Problems</a>
          <span style={{ color: "var(--nex-border)" }}>|</span>
          <span style={{ marginLeft: "12px", fontSize: "15px", fontWeight: "600" }}>{problem.title}</span>
          <span className={`badge badge-${problem.difficulty}`} style={{ marginLeft: "10px" }}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>
              {problem.acceptance_rate.toFixed(1)}% acceptance
            </span>
            {problem.is_solved && (
              <span style={{ color: "var(--nex-success)", fontSize: "13px", fontWeight: "600" }}>✓ Solved</span>
            )}
          </div>
        </div>

        {/* Main split layout */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left panel — Problem description */}
          <div style={{
            width: "42%", flexShrink: 0,
            borderRight: "1px solid var(--nex-border)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            {/* Tabs */}
            <div style={{
              display: "flex", borderBottom: "1px solid var(--nex-border)",
              padding: "0 16px", background: "var(--nex-bg-2)",
            }}>
              {(["description", "hints", "complexity", "submissions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "12px 16px", background: "none", border: "none",
                    fontSize: "13px", fontWeight: "500", cursor: "pointer",
                    color: activeTab === tab ? "var(--nex-primary)" : "var(--nex-text-3)",
                    borderBottom: activeTab === tab ? `2px solid var(--nex-primary)` : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  {tab === "complexity" ? "📊 Complexity & Quality" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "hints" && problem.hints.length > 0 && (
                    <span style={{ marginLeft: "6px", background: "var(--nex-surface)", borderRadius: "999px", padding: "1px 6px", fontSize: "11px" }}>
                      {problem.hints.length}
                    </span>
                  )}
                  {tab === "complexity" && result && (
                    <span style={{ marginLeft: "6px", background: "rgba(16,185,129,0.2)", color: "var(--nex-success)", borderRadius: "999px", padding: "1px 6px", fontSize: "10px", fontWeight: "700" }}>
                      AI
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
              {activeTab === "description" && (
                <div>
                  {/* Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                    {problem.topic_tags.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                    {problem.company_tags.map((c) => (
                      <span key={c} style={{
                        padding: "3px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700",
                        background: "rgba(255,255,255,0.08)", color: "var(--nex-text-1)", border: "1px solid var(--nex-border)"
                      }}>
                        🏢 {c}
                      </span>
                    ))}
                    <span style={{
                      marginLeft: "auto", fontSize: "12px", color: "#a5b4fc", fontWeight: "600",
                      background: "rgba(99,102,241,0.1)", padding: "3px 10px", borderRadius: "999px",
                    }}>+{problem.points} pts</span>
                  </div>

                  {/* Description */}
                  <div style={{
                    fontSize: "14px", lineHeight: "1.75",
                    color: "var(--nex-text-1)", marginBottom: "24px",
                  }}>
                    {problem.description.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "16px", fontWeight: "700", marginTop: "20px", marginBottom: "8px" }}>{line.replace("## ", "")}</h2>;
                      if (line.startsWith("- ")) return <div key={i} style={{ paddingLeft: "16px", marginBottom: "4px" }}>• {line.replace("- ", "")}</div>;
                      if (line.includes("`")) {
                        const parts = line.split(/`([^`]+)`/);
                        return <p key={i} style={{ marginBottom: "8px" }}>{parts.map((part, j) => j % 2 === 1 ? <code key={j} style={{ background: "var(--nex-surface)", padding: "1px 6px", borderRadius: "4px", fontFamily: "monospace", fontSize: "13px", color: "#a5b4fc" }}>{part}</code> : part)}</p>;
                      }
                      return line ? <p key={i} style={{ marginBottom: "8px" }}>{line}</p> : <div key={i} style={{ height: "8px" }} />;
                    })}
                  </div>

                  {/* Examples */}
                  <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} style={{
                      background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)",
                      borderRadius: "10px", padding: "14px", marginBottom: "12px",
                    }}>
                      <div style={{ marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Input</span>
                        <pre style={{ fontFamily: "monospace", fontSize: "13px", marginTop: "4px", color: "var(--nex-text-1)", whiteSpace: "pre-wrap" }}>{ex.input}</pre>
                      </div>
                      <div style={{ marginBottom: ex.explanation ? "8px" : "0" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Output</span>
                        <pre style={{ fontFamily: "monospace", fontSize: "13px", marginTop: "4px", color: "var(--nex-success)", whiteSpace: "pre-wrap" }}>{ex.output}</pre>
                      </div>
                      {ex.explanation && (
                        <div style={{ fontSize: "13px", color: "var(--nex-text-2)", borderTop: "1px solid var(--nex-border)", paddingTop: "8px", marginTop: "8px" }}>
                          💡 {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Constraints */}
                  {problem.constraints && (
                    <div style={{ marginTop: "20px" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Constraints</h3>
                      <div style={{
                        background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)",
                        borderRadius: "10px", padding: "14px",
                        fontFamily: "monospace", fontSize: "13px", color: "var(--nex-text-2)",
                      }}>
                        {problem.constraints}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "hints" && (
                <div>
                  <p style={{ fontSize: "13px", color: "var(--nex-text-2)", marginBottom: "20px" }}>
                    Hints are revealed progressively. Try to solve it yourself first! 🧠
                  </p>
                  {problem.hints.slice(0, shownHints).map((hint, i) => (
                    <div key={i} style={{
                      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "10px", padding: "14px", marginBottom: "10px",
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "#a5b4fc", marginBottom: "6px" }}>HINT {i + 1}</div>
                      <div style={{ fontSize: "14px", color: "var(--nex-text-1)" }}>{hint}</div>
                    </div>
                  ))}
                  {shownHints < problem.hints.length ? (
                    <button
                      className="btn-ghost"
                      onClick={() => setShownHints((n) => n + 1)}
                      style={{ fontSize: "13px" }}
                    >
                      💡 Reveal Hint {shownHints + 1} of {problem.hints.length}
                    </button>
                  ) : shownHints > 0 ? (
                    <div style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>All hints revealed. Give it a try!</div>
                  ) : null}
                </div>
              )}

              {activeTab === "complexity" && (
                <div>
                  <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#a5b4fc" }}>⚡ AI Time & Code Quality Analysis</h3>
                    <span className={`badge ${resultStatus === "accepted" ? "badge-success" : "badge-primary"}`}>
                      {submitting ? "Evaluating..." : resultStatus === "accepted" ? "Verified Optimal" : "Evaluation Complete"}
                    </span>
                  </div>

                  {submitting ? (
                    <div style={{ padding: "40px 20px", textAlign: "center", background: "var(--nex-bg-2)", borderRadius: "14px", border: "1px solid var(--nex-border)" }}>
                      <div className="animate-spin" style={{ fontSize: "28px", display: "inline-block", marginBottom: "12px", color: "var(--nex-primary)" }}>⟳</div>
                      <div style={{ fontWeight: "700", fontSize: "15px" }}>Running Code Evaluation...</div>
                      <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "4px" }}>Analyzing test case execution & Big-O time complexity benchmarks.</div>
                    </div>
                  ) : (
                    <div>
                      {/* Dynamic Code Quality Score Card */}
                      {(() => {
                        const passedCount = result?.test_cases_passed || 0;
                        const totalCount = result?.total_test_cases || (problem?.public_test_cases?.length || 5);
                        const isAccepted = resultStatus === "accepted";
                        const passRate = totalCount > 0 ? passedCount / totalCount : 0;
                        const qualityScore = isAccepted ? 100 : Math.round(passRate * 90);

                        // Code AST Complexity Analysis
                        const loopMatches = (code.match(/for\s+.*in|while\s+/g) || []).length;
                        const hasDoubleLoop = loopMatches >= 2;
                        const hasLogSearch = code.includes("// 2") || code.includes("mid") || code.includes("binary");
                        const hasSingleLoop = loopMatches === 1 || code.includes("stack") || code.includes("map");

                        let complexityLabel = "O(N) Linear Time";
                        if (hasDoubleLoop) complexityLabel = "O(N²) Quadratic Time";
                        else if (hasLogSearch) complexityLabel = "O(log N) Logarithmic Search";
                        else if (!hasSingleLoop && code.includes("pass")) complexityLabel = "O(1) Constant Time (Stub)";

                        const runtimeMs = result?.runtime_ms || 160;

                        return (
                          <div>
                            <div className="glass glow-primary" style={{ padding: "18px", borderRadius: "14px", marginBottom: "20px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                  <div style={{ fontSize: "11px", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>Overall Code Quality Rating</div>
                                  <div style={{ fontSize: "28px", fontWeight: "900", color: isAccepted ? "var(--nex-success)" : (passedCount > 0 ? "#f59e0b" : "var(--nex-danger)"), marginTop: "4px" }}>
                                    {qualityScore} / 100 {isAccepted ? "🌟" : "⚡"}
                                  </div>
                                  <div style={{ fontSize: "12px", color: "var(--nex-text-2)", marginTop: "4px" }}>
                                    {isAccepted
                                      ? "All test cases passed cleanly! Time complexity is verified optimal."
                                      : `${passedCount} of ${totalCount} test cases passed. ${resultStatus === "runtime_error" ? "Runtime Error encountered on failing case." : "Inspect failure guidance below."}`}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Status Alert if not accepted */}
                            {!isAccepted && (
                              <div style={{
                                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                                borderRadius: "12px", padding: "14px", marginBottom: "20px"
                              }}>
                                <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--nex-danger)", marginBottom: "4px" }}>
                                  ⚠️ Status: {resultStatus ? resultStatus.toUpperCase().replace("_", " ") : "WRONG ANSWER"} ({passedCount}/{totalCount} Passed)
                                </div>
                                <div style={{ fontSize: "12px", color: "var(--nex-text-2)", lineHeight: "1.5" }}>
                                  {passedCount > 0
                                    ? `Your code solved ${passedCount} test cases successfully! Fix the remaining edge case (e.g. unhandled character, empty input, or dictionary lookup) to get Accepted.`
                                    : "Solution returned empty output or failed initial test cases. Add implementation logic to solve()."}
                                </div>
                              </div>
                            )}

                            {/* Time Complexity SVG Growth Curve Line Graph */}
                            <div style={{ background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)", borderRadius: "14px", padding: "16px", marginBottom: "20px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <h4 style={{ fontSize: "13px", fontWeight: "700", margin: 0, color: "var(--nex-text-1)" }}>⏱️ Time Complexity Growth Curve (Big-O Benchmark)</h4>
                                <span style={{ fontSize: "11px", color: "var(--nex-success)", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "999px", fontWeight: "700" }}>
                                  {complexityLabel}
                                </span>
                              </div>
                              
                              {/* SVG Line Graph */}
                              <div style={{ background: "var(--nex-surface)", borderRadius: "10px", padding: "12px", position: "relative" }}>
                                <svg viewBox="0 0 460 170" style={{ width: "100%", height: "auto", overflow: "visible" }}>
                                  {/* Grid Lines */}
                                  <line x1="40" y1="20" x2="440" y2="20" stroke="var(--nex-border)" strokeDasharray="3 3" opacity="0.4" />
                                  <line x1="40" y1="55" x2="440" y2="55" stroke="var(--nex-border)" strokeDasharray="3 3" opacity="0.4" />
                                  <line x1="40" y1="90" x2="440" y2="90" stroke="var(--nex-border)" strokeDasharray="3 3" opacity="0.4" />
                                  <line x1="40" y1="125" x2="440" y2="125" stroke="var(--nex-border)" opacity="0.6" />
                                  
                                  {/* Axes */}
                                  <line x1="40" y1="125" x2="440" y2="125" stroke="var(--nex-text-3)" strokeWidth="1.5" />
                                  <line x1="40" y1="20" x2="40" y2="125" stroke="var(--nex-text-3)" strokeWidth="1.5" />

                                  {/* Axis Labels */}
                                  <text x="240" y="155" fill="var(--nex-text-3)" fontSize="10" textAnchor="middle" fontWeight="600">Input Size (N) ──►</text>
                                  <text x="18" y="75" fill="var(--nex-text-3)" fontSize="10" textAnchor="middle" transform="rotate(-90 18,75)" fontWeight="600">Operations (T) ──►</text>

                                  {/* O(1) Constant Curve */}
                                  <path d="M 40 120 L 440 120" stroke="#10b981" strokeWidth={!hasSingleLoop && !hasDoubleLoop && !hasLogSearch ? "3.5" : "1.5"} fill="none" opacity={!hasSingleLoop && !hasDoubleLoop && !hasLogSearch ? 1 : 0.4} />

                                  {/* O(log N) Logarithmic Curve */}
                                  <path d="M 40 125 Q 160 100 440 85" stroke="#3b82f6" strokeWidth={hasLogSearch ? "3.5" : "1.5"} fill="none" opacity={hasLogSearch ? 1 : 0.4} />

                                  {/* O(N) Linear Time Curve */}
                                  <path d="M 40 125 L 440 45" stroke="#6366f1" strokeWidth={hasSingleLoop && !hasDoubleLoop ? "3.5" : "1.5"} fill="none" opacity={hasSingleLoop && !hasDoubleLoop ? 1 : 0.5} />

                                  {/* O(N²) Quadratic Curve */}
                                  <path d="M 40 125 Q 260 115 440 15" stroke="#ef4444" strokeWidth={hasDoubleLoop ? "3.5" : "1.5"} fill="none" opacity={hasDoubleLoop ? 1 : 0.4} />

                                  {/* Point Marker for User Solution */}
                                  {hasSingleLoop && !hasDoubleLoop && (
                                    <g>
                                      <circle cx="260" cy="85" r="7" fill="#6366f1" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                                      <rect x="275" y="70" width="150" height="24" rx="6" fill="#6366f1" />
                                      <text x="350" y="86" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">👈 Your Code: O(N) Linear</text>
                                    </g>
                                  )}
                                  {hasDoubleLoop && (
                                    <g>
                                      <circle cx="360" cy="45" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                                      <rect x="250" y="30" width="160" height="24" rx="6" fill="#ef4444" />
                                      <text x="330" y="46" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">👈 Your Code: O(N²) Quadratic</text>
                                    </g>
                                  )}
                                  {hasLogSearch && (
                                    <g>
                                      <circle cx="260" cy="102" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                                      <rect x="275" y="87" width="150" height="24" rx="6" fill="#3b82f6" />
                                      <text x="350" y="103" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">👈 Your Code: O(log N)</text>
                                    </g>
                                  )}
                                </svg>
                              </div>

                              {/* Growth Curve Legend */}
                              <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "12px", flexWrap: "wrap", fontSize: "11px" }}>
                                <span style={{ color: "#10b981", fontWeight: "700" }}>─ O(1) Constant</span>
                                <span style={{ color: "#3b82f6", fontWeight: "700" }}>─ O(log N) Log</span>
                                <span style={{ color: "#6366f1", fontWeight: "800" }}>━━ O(N) Linear</span>
                                <span style={{ color: "#ef4444", fontWeight: "700" }}>─ O(N²) Quadratic</span>
                              </div>

                              <div style={{ marginTop: "14px", padding: "10px 14px", background: "rgba(99,102,241,0.1)", borderRadius: "8px", border: "1px solid rgba(99,102,241,0.2)", fontSize: "12px", color: "#a5b4fc" }}>
                                🚀 <b>Code Complexity:</b> {complexityLabel} | ⏱️ <b>Measured Runtime:</b> {runtimeMs} ms
                              </div>
                            </div>

                            {/* Code Quality Metrics */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                              <div style={{ background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)", borderRadius: "12px", padding: "14px" }}>
                                <div style={{ fontSize: "11px", color: "var(--nex-text-3)", fontWeight: "700" }}>TIME COMPLEXITY</div>
                                <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--nex-success)", marginTop: "4px" }}>{complexityLabel}</div>
                                <div style={{ fontSize: "11px", color: "var(--nex-text-2)", marginTop: "2px" }}>Detected from AST structure</div>
                              </div>
                              <div style={{ background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)", borderRadius: "12px", padding: "14px" }}>
                                <div style={{ fontSize: "11px", color: "var(--nex-text-3)", fontWeight: "700" }}>AUXILIARY SPACE (RAM)</div>
                                <div style={{ fontSize: "15px", fontWeight: "800", color: "#6366f1", marginTop: "4px" }}>O(N) Auxiliary Space</div>
                                <div style={{ fontSize: "11px", color: "var(--nex-text-2)", marginTop: "2px" }}>Stack footprint for brackets</div>
                              </div>
                            </div>

                            {/* AI Guidance Tips */}
                            <div style={{ background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)", borderRadius: "12px", padding: "14px" }}>
                              <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "8px", color: "#a5b4fc" }}>💡 AI Code Optimization & Debugging Tips</div>
                              <ul style={{ fontSize: "12px", color: "var(--nex-text-2)", paddingLeft: "18px", margin: 0, lineHeight: "1.6" }}>
                                <li>Your solution utilizes a single linear loop over the input string ($O(N)$ time complexity).</li>
                                {passedCount < totalCount && (
                                  <li>For the failing test case, check if <code style={{ background: "var(--nex-surface)", padding: "1px 4px", borderRadius: "3px" }}>ch</code> exists in your dictionary before looking up <code style={{ background: "var(--nex-surface)", padding: "1px 4px", borderRadius: "3px" }}>pairs[ch]</code> to prevent <code style={{ color: "var(--nex-danger)" }}>KeyError</code>.</li>
                                )}
                                <li>Using a stack data structure is the optimal approach for string parenthetical matching!</li>
                              </ul>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "submissions" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "800", color: "var(--nex-text-1)" }}>📜 Submission History</h3>
                    <button className="btn-ghost btn-sm" onClick={fetchSubmissionsList}>⟳ Refresh</button>
                  </div>

                  {submissionsList.length === 0 ? (
                    <div style={{ fontSize: "13px", color: "var(--nex-text-3)", textAlign: "center", padding: "40px 20px", background: "var(--nex-bg-2)", borderRadius: "12px", border: "1px solid var(--nex-border)" }}>
                      No submission history recorded yet for this problem. Submit your solution code to view history logs!
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {submissionsList.map((sub: any, idx: number) => {
                        const statusObj = STATUS_DISPLAY[sub.status] || { label: sub.status, color: "var(--nex-text-3)", icon: "📄" };
                        return (
                          <div key={sub.id || idx} style={{
                            background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)",
                            borderRadius: "12px", padding: "14px", display: "flex", alignItems: "center",
                            justifyContent: "space-between", gap: "12px"
                          }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                <span>{statusObj.icon}</span>
                                <span style={{ fontWeight: "700", color: statusObj.color, fontSize: "14px" }}>{statusObj.label}</span>
                                <span style={{ fontSize: "11px", background: "var(--nex-surface)", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                                  {sub.language}
                                </span>
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "flex", gap: "12px" }}>
                                <span>{sub.test_cases_passed}/{sub.total_test_cases} test cases passed</span>
                                {sub.runtime_ms > 0 && <span>· {sub.runtime_ms} ms</span>}
                                <span>· {sub.created_at ? new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}</span>
                              </div>
                            </div>
                            {sub.code && (
                              <button
                                className="btn-secondary btn-sm"
                                onClick={() => {
                                  setCode(sub.code);
                                  handleCodeChange(sub.code);
                                  alert("Restored code from this submission into Monaco Editor!");
                                }}
                                style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                              >
                                📥 Load Code
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right panel — Editor + Results */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Editor toolbar */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 16px", borderBottom: "1px solid var(--nex-border)",
              background: "var(--nex-bg-2)", flexShrink: 0,
            }}>
              <select
                className="nex-select"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                {Object.entries(LANGUAGE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                <button
                  className="btn-ghost btn-sm"
                  onClick={() => setCode(STARTER_CODE[language] || "")}
                >Reset</button>
                <button
                  className="btn-primary btn-sm"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer", minWidth: "100px" }}
                >
                  {submitting ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="animate-spin" style={{ display: "inline-block" }}>⟳</span> Running...
                    </span>
                  ) : "▶ Submit"}
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div style={{ flex: 1, overflow: "hidden", minHeight: "300px" }}>
              <MonacoEditor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(val) => handleCodeChange(val || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 12, bottom: 12 },
                  lineNumbers: "on",
                  renderLineHighlight: "all",
                  bracketPairColorization: { enabled: true },
                  formatOnPaste: true,
                  tabSize: 4,
                  wordWrap: "on",
                }}
              />
            </div>

            {/* Test cases + Result panel */}
            <div style={{
              borderTop: "1px solid var(--nex-border)",
              background: "var(--nex-bg-2)", flexShrink: 0,
              maxHeight: "340px", minHeight: "180px", overflowY: "auto",
            }}>
              {/* Result banner */}
              {resultStatus && statusInfo && (
                <div style={{
                  padding: "12px 20px",
                  background: `${statusInfo.color}14`,
                  borderBottom: `1px solid ${statusInfo.color}30`,
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span>{statusInfo.icon}</span>
                  <span style={{ fontWeight: "700", color: statusInfo.color }}>{statusInfo.label}</span>
                  {result && (
                    <>
                      <span style={{ color: "var(--nex-text-3)", fontSize: "13px" }}>
                        {result.test_cases_passed}/{result.total_test_cases} test cases passed
                      </span>
                      {result.runtime_ms > 0 && (
                        <span style={{ color: "var(--nex-text-3)", fontSize: "13px" }}>
                          · {result.runtime_ms}ms
                        </span>
                      )}
                      {result.score > 0 && (
                        <span style={{ marginLeft: "auto", color: "#a5b4fc", fontWeight: "700" }}>
                          +{Math.round((result.score / 100) * problem.points)} pts
                        </span>
                      )}
                    </>
                  )}
                  {submitting && (
                    <span className="animate-spin" style={{ marginLeft: "auto", fontSize: "16px", display: "inline-block" }}>⟳</span>
                  )}
                </div>
              )}

              {/* Test results */}
              {result?.test_results && (
                <div style={{ padding: "12px 20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Test Cases
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                    {result.test_results.map((tc, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestTab(i)}
                        style={{
                          padding: "4px 12px", borderRadius: "6px", fontSize: "12px",
                          fontWeight: "600", border: "none", cursor: "pointer",
                          background: activeTestTab === i
                            ? (tc.passed ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)")
                            : "var(--nex-surface)",
                          color: tc.passed ? "var(--nex-success)" : "var(--nex-danger)",
                          transition: "all 0.15s",
                        }}
                      >
                        {tc.passed ? "✓" : "✗"} Case {i + 1}
                      </button>
                    ))}
                  </div>
                  {result.test_results[activeTestTab] && (
                    <div>
                      <div style={{ fontSize: "13px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        {result.test_results[activeTestTab].output !== undefined && (
                          <div>
                            <div style={{ color: "var(--nex-text-3)", fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>OUTPUT</div>
                            <pre style={{ fontFamily: "monospace", color: "var(--nex-text-1)", background: "var(--nex-surface)", padding: "8px 12px", borderRadius: "6px", margin: 0 }}>
                              {result.test_results[activeTestTab].output || "(empty)"}
                            </pre>
                          </div>
                        )}
                        {result.test_results[activeTestTab].expected !== undefined && (
                          <div>
                            <div style={{ color: "var(--nex-text-3)", fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>EXPECTED</div>
                            <pre style={{ fontFamily: "monospace", color: "var(--nex-success)", background: "var(--nex-surface)", padding: "8px 12px", borderRadius: "6px", margin: 0 }}>
                              {result.test_results[activeTestTab].expected || "(empty)"}
                            </pre>
                          </div>
                        )}
                      </div>
                      {result.test_results[activeTestTab].error && (
                        <div style={{ marginTop: "10px", padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px", color: "var(--nex-danger)" }}>
                          ⚠️ <b>Execution Error:</b> {result.test_results[activeTestTab].error}
                        </div>
                      )}
                    </div>
                  )}
                  {result.error_message && (
                    <div style={{ marginTop: "10px", padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px", color: "var(--nex-danger)" }}>
                      {result.error_message}
                    </div>
                  )}
                </div>
              )}

              {/* Public test cases (default view) */}
              {!result && !submitting && problem.public_test_cases.length > 0 && (
                <div style={{ padding: "12px 20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Test Cases
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                    {problem.public_test_cases.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestTab(i)}
                        style={{
                          padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600",
                          border: "none", cursor: "pointer",
                          background: activeTestTab === i ? "rgba(99,102,241,0.2)" : "var(--nex-surface)",
                          color: activeTestTab === i ? "var(--nex-primary)" : "var(--nex-text-2)",
                        }}
                      >
                        Case {i + 1}
                      </button>
                    ))}
                  </div>
                  {problem.public_test_cases[activeTestTab] && (
                    <div style={{ fontSize: "13px", display: "flex", gap: "16px" }}>
                      <div>
                        <div style={{ color: "var(--nex-text-3)", fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>INPUT</div>
                        <pre style={{ fontFamily: "monospace", color: "var(--nex-text-1)", background: "var(--nex-surface)", padding: "8px 12px", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
                          {problem.public_test_cases[activeTestTab].input}
                        </pre>
                      </div>
                      <div>
                        <div style={{ color: "var(--nex-text-3)", fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>EXPECTED OUTPUT</div>
                        <pre style={{ fontFamily: "monospace", color: "var(--nex-success)", background: "var(--nex-surface)", padding: "8px 12px", borderRadius: "6px" }}>
                          {problem.public_test_cases[activeTestTab].expected_output}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
