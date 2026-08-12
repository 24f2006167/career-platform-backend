"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

type InterviewMode = "dsa" | "system_design" | "behavioral" | "mixed";
type MessageRole = "ai" | "user" | "system";

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
  score?: number;
}

const INTERVIEW_MODES = [
  { id: "dsa", label: "DSA Interview", icon: "🌳", desc: "Data structures & algorithms questions with code solutions" },
  { id: "system_design", label: "System Design", icon: "🏗️", desc: "Design scalable systems — URL shortener, Instagram, Uber, etc." },
  { id: "behavioral", label: "Behavioral", icon: "🎤", desc: "STAR-format behavioral questions — leadership, conflict, failure" },
  { id: "mixed", label: "Full Mock Interview", icon: "⚡", desc: "Complete interview: DSA → System Design → Behavioral (45 min)" },
];

const DSA_QUESTIONS = [
  "Hello! I'm your AI interviewer at Nexvora. Let's start with a warm-up. **Can you tell me about yourself and your experience with data structures?**",
  "Great! Now let's dive into the coding part. Here's your problem:\n\n**Problem: Find the median of two sorted arrays.**\n\nGiven two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the two sorted arrays.\n\nExpected time complexity: O(log(m+n)).\n\nPlease start by explaining your approach before writing any code.",
  "That's a good start! Can you now code the solution and walk me through the time and space complexity?",
  "Good. Now what if the arrays are very large and don't fit in memory? How would you modify your approach?",
  "Excellent! Let me ask you about graphs now. **How would you detect a cycle in a directed graph?** Which algorithm would you use and why?",
];

const SYSTEM_DESIGN_QUESTIONS = [
  "Welcome! I'm your system design interviewer. Let's design a URL shortening service like bit.ly.\n\n**Requirements:**\n- Shorten a URL\n- Redirect short → long URL\n- Handle 100M DAU, 1B URLs stored\n\nLet's start — what are your clarifying questions?",
  "Good clarifying questions. Now let's talk about the high-level architecture. How would you structure the system? Start with the main components.",
  "Nice. Now deep-dive into the database schema. What database would you use and why? How would you handle the key generation for short URLs?",
  "Great choices. How would you handle scaling? Specifically, how would you handle 10,000 URL redirect requests per second?",
];

const BEHAVIORAL_QUESTIONS = [
  "Hello! Welcome to your behavioral interview. These questions help us understand how you've handled situations in the past.\n\n**First question: Tell me about a time you had to work on a project with a very tight deadline. How did you manage it?**\n\nUse the STAR method — Situation, Task, Action, Result.",
  "That's a great example of time management! Now let's talk about challenges:\n\n**Tell me about a time you disagreed with a technical decision made by your team. How did you handle it?**",
  "Good. Now a leadership question:\n\n**Describe a time when you mentored or helped a junior team member. What was the outcome?**",
  "Excellent! Final question:\n\n**Tell me about the most complex technical problem you've solved. What was your approach and what did you learn from it?**",
];

const QUESTIONS_MAP: Record<InterviewMode, string[]> = {
  dsa: DSA_QUESTIONS,
  system_design: SYSTEM_DESIGN_QUESTIONS,
  behavioral: BEHAVIORAL_QUESTIONS,
  mixed: [...DSA_QUESTIONS.slice(0, 2), ...SYSTEM_DESIGN_QUESTIONS.slice(0, 1), ...BEHAVIORAL_QUESTIONS.slice(0, 1)],
};

export default function InterviewPage() {
  const [mode, setMode] = useState<InterviewMode | null>(null);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [sessionScore, setSessionScore] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (started && !sessionScore) {
      timerRef.current = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, sessionScore]);

  function formatTime(secs: number): string {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function startInterview() {
    if (!mode) return;
    setStarted(true);
    setQuestionIndex(0);
    const questions = QUESTIONS_MAP[mode];
    setMessages([{ role: "ai", content: questions[0], timestamp: new Date() }]);
  }

  function parseMarkdown(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, '<code style="background:var(--nex-surface);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:13px;color:#a5b4fc">$1</code>')
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n- /g, "<br/>• ");
  }

  async function sendMessage() {
    if (!userInput.trim() || thinking) return;

    const userMsg: Message = { role: "user", content: userInput, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setUserInput("");
    setThinking(true);

    // Simulate AI response after user reply
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const questions = QUESTIONS_MAP[mode!];
    const nextIdx = questionIndex + 1;

    if (nextIdx < questions.length) {
      const aiResponse: Message = {
        role: "ai",
        content: `Good answer! ${nextIdx === 1 ? "I can see you understand the basics." : "You're demonstrating strong problem-solving skills."}\n\n${questions[nextIdx]}`,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, aiResponse]);
      setQuestionIndex(nextIdx);
    } else {
      // Session complete — generate feedback
      const score = 65 + Math.floor(Math.random() * 30);
      const feedbackMsg: Message = {
        role: "ai",
        content: `**Interview Complete!** 🎉\n\nHere's your performance feedback:\n\n**Overall Score: ${score}/100**\n\n**Strengths:**\n- Good communication and structured thinking\n- Showed understanding of core concepts\n- Asked relevant clarifying questions\n\n**Areas to Improve:**\n- Practice edge case handling more thoroughly\n- Deepen knowledge of time complexity analysis\n- Prepare more STAR examples for behavioral questions\n\n**Recommendation:** Focus on ${mode === "dsa" ? "Graphs and DP" : mode === "system_design" ? "caching and database scaling" : "quantifying impact in your examples"} this week. Your roadmap has been updated! 🗺️`,
        timestamp: new Date(),
        score,
      };
      setMessages((m) => [...m, feedbackMsg]);
      setSessionScore(score);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    setThinking(false);
  }

  if (!started) {
    return (
      <div className="layout-sidebar">
        <Sidebar />
        <div className="main-content">
          <div className="topbar">
            <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Mock Interview</h1>
          </div>
          <div style={{ padding: "40px", maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎤</div>
              <h2 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                AI Interview Simulator
              </h2>
              <p style={{ color: "var(--nex-text-2)", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
                Practice with an AI interviewer modeled after top tech company interviewers. Get real-time feedback on your answers.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "32px" }}>
              {INTERVIEW_MODES.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setMode(m.id as InterviewMode)}
                  style={{
                    padding: "20px", borderRadius: "12px", cursor: "pointer",
                    border: `2px solid ${mode === m.id ? "var(--nex-primary)" : "var(--nex-border)"}`,
                    background: mode === m.id ? "rgba(99,102,241,0.08)" : "var(--nex-surface)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{m.icon}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>{m.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-2)" }}>{m.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                className="btn-primary"
                onClick={startInterview}
                disabled={!mode}
                style={{ padding: "14px 36px", fontSize: "16px", opacity: !mode ? 0.5 : 1 }}
              >
                Start Interview →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Interview topbar */}
        <div className="topbar" style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: sessionScore ? "var(--nex-text-3)" : "var(--nex-success)", animation: sessionScore ? "none" : "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {INTERVIEW_MODES.find(m => m.id === mode)?.label}
            </span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--nex-text-3)", fontFamily: "monospace" }}>
              ⏱️ {formatTime(timeElapsed)}
            </span>
            {!sessionScore && (
              <div style={{ fontSize: "12px", color: "var(--nex-text-2)" }}>
                Q {Math.min(questionIndex + 1, QUESTIONS_MAP[mode!].length)} / {QUESTIONS_MAP[mode!].length}
              </div>
            )}
            {sessionScore && (
              <div style={{
                padding: "4px 14px", borderRadius: "999px", fontWeight: "700",
                background: "rgba(16,185,129,0.1)", color: "var(--nex-success)",
                border: "1px solid rgba(16,185,129,0.2)", fontSize: "13px",
              }}>Score: {sessionScore}/100</div>
            )}
            <button className="btn-ghost btn-sm" onClick={() => { setStarted(false); setMode(null); setMessages([]); setTimeElapsed(0); setSessionScore(null); }}>
              End Session
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", gap: "12px",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-start",
            }}>
              {/* Avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: msg.role === "ai" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #06b6d4, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: "700", color: "white",
              }}>
                {msg.role === "ai" ? "🤖" : "S"}
              </div>

              {/* Bubble */}
              <div style={{
                maxWidth: "68%",
                padding: "14px 16px", borderRadius: msg.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                background: msg.role === "ai" ? "var(--nex-surface)" : "rgba(99,102,241,0.2)",
                border: `1px solid ${msg.role === "ai" ? "var(--nex-border)" : "rgba(99,102,241,0.3)"}`,
                fontSize: "14px", lineHeight: "1.7",
              }}>
                {msg.score && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "3px 10px", borderRadius: "999px", marginBottom: "10px",
                    background: msg.score >= 80 ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                    border: `1px solid ${msg.score >= 80 ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                    fontSize: "12px", fontWeight: "700",
                    color: msg.score >= 80 ? "var(--nex-success)" : "var(--nex-warning)",
                  }}>
                    🎯 Score: {msg.score}/100
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "8px" }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {thinking && (
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
              <div style={{ padding: "14px 16px", borderRadius: "4px 16px 16px 16px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)" }}>
                <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "var(--nex-primary)",
                      animation: `pulse-glow 1.2s ease ${delay}s infinite`,
                    }} />
                  ))}
                  <span style={{ fontSize: "12px", color: "var(--nex-text-3)", marginLeft: "6px" }}>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        {!sessionScore && (
          <div style={{
            padding: "16px 24px", borderTop: "1px solid var(--nex-border)",
            background: "var(--nex-bg-2)", flexShrink: 0, display: "flex", gap: "10px",
          }}>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
              style={{
                flex: 1, padding: "12px 14px", borderRadius: "10px", resize: "none",
                background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                color: "var(--nex-text-1)", fontFamily: "inherit", fontSize: "14px",
                outline: "none", minHeight: "56px", maxHeight: "160px",
                lineHeight: "1.6", transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--nex-primary)")}
              onBlur={e => (e.target.style.borderColor = "var(--nex-border)")}
            />
            <button
              className="btn-primary"
              onClick={sendMessage}
              disabled={!userInput.trim() || thinking}
              style={{ alignSelf: "flex-end", opacity: !userInput.trim() || thinking ? 0.5 : 1 }}
            >
              Send →
            </button>
          </div>
        )}

        {sessionScore && (
          <div style={{
            padding: "16px 24px", borderTop: "1px solid var(--nex-border)", background: "var(--nex-bg-2)",
            display: "flex", gap: "10px", justifyContent: "center",
          }}>
            <button className="btn-primary" onClick={() => { setStarted(false); setMode(null); setMessages([]); setTimeElapsed(0); setSessionScore(null); }}>
              Start New Session →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
