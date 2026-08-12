"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Problems", href: "/problems" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Contests", href: "/contests" },
  { label: "Learn", href: "/learn" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Real Coding Judge",
    desc: "Submit code in Python, C++, Java, or JavaScript. Executed securely in an isolated sandbox with CPU & memory limits.",
    tag: "Phase 3",
  },
  {
    icon: "🗺️",
    title: "Dynamic Roadmap Engine",
    desc: "Role-specific learning paths (SDE, Backend, Frontend, Data Eng.) with real-time progress tracking and weakness detection.",
    tag: "Personalized",
  },
  {
    icon: "🤖",
    title: "AI Coding Mentor",
    desc: "Stuck? Get 3-tier progressive hints. The AI never gives you the answer — it teaches you how to find it yourself.",
    tag: "Powered by GPT-4o",
  },
  {
    icon: "🏆",
    title: "Competitive Contests",
    desc: "Weekly rated contests with live leaderboards, Elo-based rating system, and real-time WebSocket updates.",
    tag: "Coming Soon",
  },
  {
    icon: "🎤",
    title: "Mock Interviews",
    desc: "AI interviewer asks DSA, System Design, and behavioral questions. Evaluates technical accuracy, depth, and communication.",
    tag: "AI-Powered",
  },
  {
    icon: "📊",
    title: "Developer Analytics",
    desc: "Deep performance analytics — topic-by-topic proficiency, acceptance rates, coding time, and job readiness score.",
    tag: "Data-Driven",
  },
];

const STATS = [
  { value: "1,200+", label: "DSA Problems" },
  { value: "48", label: "Learning Tracks" },
  { value: "6", label: "Supported Languages" },
  { value: "∞", label: "Room to Grow" },
];

const COMPANIES = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Stripe", "Atlassian", "Adobe"];

const ROADMAP_STEPS = [
  "Skill Assessment",
  "Personalized Roadmap",
  "Structured Learning",
  "Daily Practice",
  "Mock Interviews",
  "Job Ready 🎯",
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % ROADMAP_STEPS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ background: "var(--nex-bg)", color: "var(--nex-text-1)", minHeight: "100vh" }}>
      {/* ── NAVBAR ──────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0 32px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(8,9,14,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--nex-border)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: "bold", color: "white"
            }}>N</div>
            <span style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em" }}>Nexvora</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{
                padding: "6px 14px", borderRadius: "8px", fontSize: "14px",
                fontWeight: "500", color: "var(--nex-text-2)",
                textDecoration: "none", transition: "all 0.15s"
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--nex-text-2)")}
              >{l.label}</Link>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/login" className="btn-ghost btn-sm">Log in</Link>
          <Link href="/signup" className="btn-primary btn-sm">Get Started →</Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", textAlign: "center", overflow: "hidden",
      }}>
        {/* Background orbs */}
        <div className="hero-bg">
          <div className="hero-orb" style={{
            width: "600px", height: "600px",
            background: "radial-gradient(circle, #6366f1, transparent)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -60%)",
          }} />
          <div className="hero-orb" style={{
            width: "400px", height: "400px",
            background: "radial-gradient(circle, #8b5cf6, transparent)",
            top: "20%", right: "-10%",
            animationDelay: "-2s",
          }} />
          <div className="hero-orb" style={{
            width: "300px", height: "300px",
            background: "radial-gradient(circle, #06b6d4, transparent)",
            bottom: "10%", left: "-5%",
            animationDelay: "-4s",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 18px", borderRadius: "999px", fontSize: "13px",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc", marginBottom: "28px", fontWeight: "500",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            AI-Powered Developer Career Platform
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(42px, 8vw, 80px)",
            fontWeight: "900",
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}>
            From{" "}
            <span className="gradient-text">Zero to Hired</span>
            <br />as a Software Engineer
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--nex-text-2)",
            maxWidth: "620px",
            margin: "0 auto 40px",
            lineHeight: "1.7",
          }}>
            The platform that answers:{" "}
            <em style={{ color: "var(--nex-text-1)", fontStyle: "normal" }}>
              what to learn → what to practice → how good am I → where am I weak → am I interview-ready?
            </em>
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" className="btn-primary" style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "12px" }}>
              Start Your Journey →
            </Link>
            <Link href="/problems" className="btn-ghost" style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "12px" }}>
              Explore Problems
            </Link>
          </div>

          {/* Journey steps */}
          <div style={{
            display: "flex", gap: "0", justifyContent: "center", marginTop: "60px",
            flexWrap: "wrap", maxWidth: "700px", margin: "60px auto 0",
          }}>
            {ROADMAP_STEPS.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  padding: "8px 16px", borderRadius: "999px", fontSize: "13px",
                  fontWeight: i === activeStep ? "700" : "400",
                  background: i === activeStep ? "rgba(99,102,241,0.2)" : "transparent",
                  border: i === activeStep ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
                  color: i === activeStep ? "#a5b4fc" : "var(--nex-text-3)",
                  transition: "all 0.4s ease",
                  whiteSpace: "nowrap",
                }}>
                  {step}
                </div>
                {i < ROADMAP_STEPS.length - 1 && (
                  <div style={{
                    width: "24px", height: "1px",
                    background: i < activeStep ? "var(--nex-primary)" : "var(--nex-border)",
                    transition: "background 0.4s",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section style={{
        padding: "60px 32px",
        borderTop: "1px solid var(--nex-border)",
        borderBottom: "1px solid var(--nex-border)",
        background: "var(--nex-bg-2)",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px",
          textAlign: "center",
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "42px", fontWeight: "900", letterSpacing: "-0.03em" }} className="gradient-text">
                {s.value}
              </div>
              <div style={{ fontSize: "14px", color: "var(--nex-text-2)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section style={{ padding: "100px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="badge badge-primary" style={{ marginBottom: "16px" }}>Platform Features</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Everything you need to{" "}
            <span className="gradient-text">land the job</span>
          </h2>
          <p style={{ color: "var(--nex-text-2)", fontSize: "17px", maxWidth: "520px", margin: "0 auto" }}>
            Built with real engineering depth — not just another practice platform.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px",
        }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="glass glass-hover animate-fade-in" style={{
              padding: "28px", animationDelay: `${i * 0.08}s`,
            }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{f.icon}</div>
              <div className="badge badge-primary" style={{ marginBottom: "12px", fontSize: "11px" }}>{f.tag}</div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--nex-text-2)", lineHeight: "1.65" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CODE JUDGE SHOWCASE ───────────────────────── */}
      <section style={{
        padding: "80px 32px",
        background: "var(--nex-bg-2)",
        borderTop: "1px solid var(--nex-border)",
        borderBottom: "1px solid var(--nex-border)",
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: "16px" }}>Coding Judge</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              The engineering{" "}
              <span className="gradient-text">centerpiece</span>
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "16px", lineHeight: "1.75", marginBottom: "28px" }}>
              Real asynchronous code execution pipeline: submit → queue → isolated sandbox → test cases → WebSocket result. Not just a simulation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Subprocess-based sandbox with CPU/memory limits",
                "Hidden test cases users can't see",
                "Real-time WebSocket result delivery",
                "Runtime & memory profiling",
                "Elo-based rating updates on acceptance",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px" }}>
                  <span style={{ color: "var(--nex-success)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  <span style={{ color: "var(--nex-text-2)" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/problems" className="btn-primary" style={{ display: "inline-flex", marginTop: "28px" }}>
              Try a Problem →
            </Link>
          </div>

          {/* Code mock */}
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--nex-border)" }}>
            {/* Window chrome */}
            <div style={{ background: "#1a1b2e", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--nex-border)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--nex-text-3)", fontFamily: "monospace" }}>two-sum.py</span>
            </div>
            <div style={{ background: "#13141f", padding: "20px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "1.8" }}>
              <div><span style={{ color: "#6272a4" }}># Two Sum — O(n) HashMap Solution</span></div>
              <div><span style={{ color: "#ff79c6" }}>def</span> <span style={{ color: "#50fa7b" }}>twoSum</span><span style={{ color: "var(--nex-text-1)" }}>(nums, target):</span></div>
              <div style={{ paddingLeft: "16px" }}><span style={{ color: "#bd93f9" }}>seen</span> <span style={{ color: "var(--nex-text-1)" }}>= {"{}"}</span></div>
              <div style={{ paddingLeft: "16px" }}><span style={{ color: "#ff79c6" }}>for</span> <span style={{ color: "#50fa7b" }}>i, num</span> <span style={{ color: "#ff79c6" }}>in</span> <span style={{ color: "#8be9fd" }}>enumerate</span><span style={{ color: "var(--nex-text-1)" }}>(nums):</span></div>
              <div style={{ paddingLeft: "32px" }}><span style={{ color: "#bd93f9" }}>complement</span> <span style={{ color: "var(--nex-text-1)" }}>= target - num</span></div>
              <div style={{ paddingLeft: "32px" }}><span style={{ color: "#ff79c6" }}>if</span> <span style={{ color: "var(--nex-text-1)" }}>complement</span> <span style={{ color: "#ff79c6" }}>in</span> <span style={{ color: "#bd93f9" }}>seen</span><span style={{ color: "var(--nex-text-1)" }}>:</span></div>
              <div style={{ paddingLeft: "48px" }}><span style={{ color: "#ff79c6" }}>return</span> <span style={{ color: "var(--nex-text-1)" }}>[seen[complement], i]</span></div>
              <div style={{ paddingLeft: "32px" }}><span style={{ color: "#bd93f9" }}>seen</span><span style={{ color: "var(--nex-text-1)" }}>[num] = i</span></div>
              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(16,185,129,0.1)", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div style={{ color: "#10b981", fontWeight: "600" }}>✓ Accepted</div>
                <div style={{ color: "var(--nex-text-2)", fontSize: "12px", marginTop: "4px" }}>18/18 test cases · 42ms · O(n)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY PREP ─────────────────────────────── */}
      <section style={{ padding: "80px 32px", textAlign: "center" }}>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: "var(--nex-text-3)", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "32px" }}>
            Prepare for interviews at
          </p>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            {COMPANIES.map((company) => (
              <div key={company} style={{
                padding: "8px 20px",
                background: "var(--nex-surface)",
                border: "1px solid var(--nex-border)",
                borderRadius: "8px",
                fontSize: "14px", fontWeight: "500",
                color: "var(--nex-text-2)",
              }}>{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────── */}
      <section style={{
        padding: "100px 32px",
        textAlign: "center",
        background: "var(--nex-bg-2)",
        borderTop: "1px solid var(--nex-border)",
      }}>
        <div style={{
          maxWidth: "600px", margin: "0 auto",
          padding: "60px",
          background: "rgba(99,102,241,0.05)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "24px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
          <h2 style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Ready to become a <span className="gradient-text">better engineer?</span>
          </h2>
          <p style={{ color: "var(--nex-text-2)", fontSize: "16px", marginBottom: "32px" }}>
            Join Nexvora. Learn systematically. Code daily. Get hired.
          </p>
          <Link href="/signup" className="btn-primary" style={{ padding: "16px 40px", fontSize: "17px", borderRadius: "14px" }}>
            Start for Free →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{
        padding: "40px 32px",
        borderTop: "1px solid var(--nex-border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: 24, height: 24, borderRadius: "6px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "bold", color: "white"
          }}>N</div>
          <span style={{ fontWeight: "700" }}>Nexvora</span>
          <span style={{ color: "var(--nex-text-3)", fontSize: "13px" }}>— AI-Powered Developer Platform</span>
        </div>
        <div style={{ color: "var(--nex-text-3)", fontSize: "13px" }}>
          Built with ❤️ as a flagship SDE portfolio project
        </div>
      </footer>
    </main>
  );
}