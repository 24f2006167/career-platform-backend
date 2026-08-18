"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import API from "@/lib/api";

interface RoadmapStep {
  id: number;
  title: string;
  icon: string;
  skills: string[];
  proficiency: number;
  problems: number;
  status: "completed" | "in-progress" | "weak" | "not-started";
  category: string;
  isWeakness?: boolean;
}

interface UserProfile {
  full_name: string;
  username: string;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  readiness_score: number;
}

const BASE_ROADMAP_TEMPLATES: Record<string, Omit<RoadmapStep, "proficiency" | "status">[]> = {
  "Software Engineer": [
    { id: 1, title: "Programming Fundamentals & OOP", icon: "🐍", skills: ["Python / C++ / Java", "Data Types & Control Flow", "OOP Principles & Design", "Recursion & Memory"], problems: 45, category: "foundation" },
    { id: 2, title: "Data Structures & Algorithms", icon: "🌳", skills: ["Arrays, Strings & HashMaps", "Linked Lists & Stacks", "Trees, Tries & Heaps", "Dynamic Programming & Graphs", "Sorting & Binary Search"], problems: 94, category: "dsa" },
    { id: 3, title: "Database Management & SQL", icon: "🗄️", skills: ["SQL Queries & Joins", "Normalization & Indexing", "Transactions & ACID", "PostgreSQL & Redis"], problems: 26, category: "dbms" },
    { id: 4, title: "Operating Systems & Concurrency", icon: "⚙️", skills: ["Processes & Threads", "Memory Management & Paging", "CPU Scheduling & Deadlocks", "Concurrency & Semaphores"], problems: 18, category: "os" },
    { id: 5, title: "Computer Networks", icon: "🌐", skills: ["OSI & TCP/IP Model", "HTTP/HTTPS & REST", "DNS, Sockets & WebSockets", "Load Balancers & Reverse Proxy"], problems: 14, category: "networks" },
    { id: 6, title: "System Design & Architecture", icon: "🏗️", skills: ["Scalability & High Availability", "Microservices & API Gateway", "Caching (Redis/Memcached)", "Message Queues (Kafka/RabbitMQ)", "Database Sharding"], problems: 12, category: "system_design" },
    { id: 7, title: "Backend Development", icon: "🚀", skills: ["RESTful API Architecture", "FastAPI / Node.js / Spring", "JWT & OAuth2 Auth", "Docker Containers", "CI/CD Pipelines"], problems: 34, category: "backend" },
    { id: 8, title: "Technical Interview & Mock Prep", icon: "🎤", skills: ["Live Coding & Problem Decomposition", "STAR Method Behavioral", "System Design Rounds", "Resume Optimization"], problems: 15, category: "interview" },
  ],

  "Backend Engineer": [
    { id: 101, title: "Core Language Mastery (Python/Go/Java)", icon: "⚡", skills: ["Advanced Python / Go / Java", "Concurrency & Async I/O", "Memory Management & Profiling", "Clean Architecture & SOLID"], problems: 40, category: "lang" },
    { id: 102, title: "API Development & Web Frameworks", icon: "🔌", skills: ["FastAPI / Express / Spring Boot", "RESTful Design Principles", "GraphQL & gRPC APIs", "Request Validation & OpenAPI"], problems: 32, category: "api" },
    { id: 103, title: "Databases (SQL & NoSQL)", icon: "🗄️", skills: ["PostgreSQL Schema Design", "Query Optimization & EXPLAIN", "Redis In-Memory Caching", "MongoDB / Cassandra NoSQL", "Transactions & Isolation Levels"], problems: 28, category: "database" },
    { id: 104, title: "Authentication, Security & Rate Limiting", icon: "🔐", skills: ["JWT, OAuth 2.0 & SSO", "Token Rotation & Refresh", "Password Hashing (bcrypt/argon2)", "Rate Limiting & CORS", "SQL Injection & XSS Defense"], problems: 20, category: "security" },
    { id: 105, title: "Distributed Systems & Message Queues", icon: "📡", skills: ["Apache Kafka & Event Streams", "RabbitMQ / Celery Async Tasks", "Idempotency & Retry Mechanisms", "CAP Theorem & Distributed Locks"], problems: 12, category: "distributed" },
    { id: 106, title: "Cloud & DevOps for Backend", icon: "☁️", skills: ["Docker Containerization", "Kubernetes Pods & Deployments", "AWS / GCP Cloud Services", "GitHub Actions CI/CD", "Prometheus & Grafana Monitoring"], problems: 16, category: "devops" },
    { id: 107, title: "High-Scale System Design", icon: "🏗️", skills: ["Horizontal vs Vertical Scaling", "Consistent Hashing & Partitioning", "CDN & Global Edge Caching", "Disaster Recovery & Backup"], problems: 10, category: "system_design" },
  ],

  "Frontend Engineer": [
    { id: 201, title: "Modern HTML5, CSS3 & Responsive UI", icon: "🎨", skills: ["Semantic HTML5 & Accessibility (a11y)", "Flexbox, CSS Grid & Positioning", "CSS Custom Properties & Theming", "Responsive Design & Mobile-First"], problems: 35, category: "ui" },
    { id: 202, title: "JavaScript Deep Dive (ES6+)", icon: "⚡", skills: ["Closures, Prototypes & 'this'", "Async/Await, Promises & Event Loop", "DOM Manipulation & Events", "Functional Programming Patterns"], problems: 48, category: "js" },
    { id: 203, title: "TypeScript Mastery", icon: "📘", skills: ["Static Types, Generics & Unions", "Interfaces & Type Assertions", "Utility Types (Partial, Pick, Omit)", "Strict Mode & TSConfig"], problems: 28, category: "ts" },
    { id: 204, title: "React 19 & Next.js 15 App Router", icon: "⚛️", skills: ["React Hooks (useState, useEffect, useMemo)", "Server vs Client Components", "Next.js Routing & Layouts", "Server Actions & Form Handling"], problems: 36, category: "react" },
    { id: 205, title: "State Management & Data Fetching", icon: "🔄", skills: ["Zustand / Redux Toolkit", "React Query / SWR Caching", "Optimistic UI Updates", "WebSocket Realtime Events"], problems: 22, category: "state" },
    { id: 206, title: "Performance & Web Vitals", icon: "🚀", skills: ["Core Web Vitals (LCP, FID, CLS)", "Code Splitting & Lazy Loading", "Image Optimization & Next/Image", "Bundle Analysis & Tree Shaking"], problems: 14, category: "perf" },
    { id: 207, title: "Testing & Frontend Architecture", icon: "🧪", skills: ["Jest & React Testing Library", "Playwright / Cypress E2E", "Microfrontends & Component Libraries", "Storybook & Design Systems"], problems: 12, category: "testing" },
  ],

  "Full Stack Developer": [
    { id: 301, title: "Frontend Foundation (React + TypeScript)", icon: "💻", skills: ["React 19 Components & Hooks", "TypeScript Strict Typing", "TailwindCSS / Vanilla CSS Tokens", "State Management (Zustand)"], problems: 44, category: "frontend" },
    { id: 302, title: "Backend API Architecture (FastAPI/Node)", icon: "🚀", skills: ["FastAPI & Express Frameworks", "RESTful & GraphQL API Design", "JWT Auth & Session Management", "Request Validation & Error Handling"], problems: 38, category: "backend" },
    { id: 303, title: "Database Modeling & ORM", icon: "🗄️", skills: ["PostgreSQL Schema & Migrations", "SQLAlchemy / Prisma ORMs", "Redis Caching & Session Storage", "Indexing & Optimization"], problems: 26, category: "db" },
    { id: 304, title: "Full Stack Integration & SSR", icon: "🔄", skills: ["Next.js Fullstack App Router", "Server-Side Rendering (SSR)", "Vercel & Railway Deployment", "CORS, Cookies & HTTPS Proxies"], problems: 24, category: "integration" },
    { id: 305, title: "Cloud, Containers & CI/CD", icon: "☁️", skills: ["Docker & Docker Compose", "GitHub Actions Automation", "AWS S3 / Cloud Storage", "Environment Variables & Secrets"], problems: 16, category: "cloud" },
    { id: 306, title: "System Design & Microservices", icon: "🏗️", skills: ["Monolith vs Microservices", "Background Job Queues (Celery/Bull)", "Load Balancing & Horizontal Scaling", "Database Replication"], problems: 12, category: "sysdesign" },
  ],

  "Data Engineer": [
    { id: 401, title: "Python for Data & Advanced SQL", icon: "🐍", skills: ["Advanced Python & NumPy/Pandas", "Complex SQL, Window Functions & CTEs", "Data Cleaning & Transformation", "File Formats (Parquet, Avro, ORC)"], problems: 42, category: "data_lang" },
    { id: 402, title: "Data Warehousing & Modeling", icon: "🏢", skills: ["Snowflake / BigQuery / Redshift", "Star Schema & Snowflake Schema", "Slowly Changing Dimensions (SCD)", "Columnar Storage & Partitioning"], problems: 28, category: "warehouse" },
    { id: 403, title: "ETL / ELT Pipelines & Orchestration", icon: "⚙️", skills: ["Apache Airflow DAGs & Operators", "dbt (Data Build Tool)", "Prefect / Mage Workflow Tools", "Data Quality & Great Expectations"], problems: 24, category: "orchestration" },
    { id: 404, title: "Big Data Processing (PySpark & Hadoop)", icon: "⚡", skills: ["Apache Spark & PySpark RDDs/DataFrames", "Spark Optimization & Memory Tuning", "Distributed Compute Fundamentals", "Delta Lake & Lakehouse"], problems: 16, category: "spark" },
    { id: 405, title: "Streaming & Real-Time Data (Kafka)", icon: "📡", skills: ["Apache Kafka Producers & Consumers", "Kafka Streams / Spark Streaming", "Schema Registry (Avro)", "Windowing & Watermarking"], problems: 12, category: "streaming" },
    { id: 406, title: "Cloud Data Architecture (AWS/GCP)", icon: "☁️", skills: ["AWS S3 / GCS Data Lakes", "AWS Glue / GCP Dataflow", "IAM Policies & Data Governance", "Cost Optimization & Monitoring"], problems: 14, category: "cloud" },
  ],

  "DevOps Engineer": [
    { id: 501, title: "Linux Administration & Bash Scripting", icon: "🐧", skills: ["Linux Kernel & System Calls", "Bash Scripting & Automation", "Networking, iptables & SSH", "Process Management & systemd"], problems: 38, category: "linux" },
    { id: 502, title: "Containers & Container Orchestration", icon: "🐳", skills: ["Dockerfiles & Multi-Stage Builds", "Docker Compose Local Dev", "Kubernetes Pods, Services & Ingress", "Helm Charts & K8s Deployments"], problems: 30, category: "containers" },
    { id: 503, title: "Infrastructure as Code (IaC)", icon: "🏗️", skills: ["Terraform Modules & State", "AWS / GCP Cloud Resources", "Ansible Configuration Management", "IaC Security Scanning (tfsec)"], problems: 22, category: "iac" },
    { id: 504, title: "CI/CD Pipeline Automation", icon: "🔄", skills: ["GitHub Actions Workflows", "GitLab CI / Jenkins Pipelines", "Automated Testing & Linting", "Zero-Downtime Deployment (Blue/Green)"], problems: 26, category: "cicd" },
    { id: 505, title: "Observability, Logging & Monitoring", icon: "📊", skills: ["Prometheus Metrics & Exporters", "Grafana Dashboards & Alerting", "ELK / EFK Stack Centralized Logging", "Distributed Tracing (OpenTelemetry)"], problems: 14, category: "monitoring" },
    { id: 506, title: "Cloud Security & DevSecOps", icon: "🛡️", skills: ["Secrets Management (HashiCorp Vault)", "Container Vulnerability Scanning (Trivy)", "TLS/SSL Certificate Automation (Let's Encrypt)", "Least Privilege IAM & Compliance"], problems: 12, category: "security" },
  ],
};

const TARGET_ROLES = [
  "Software Engineer",
  "Backend Engineer",
  "Frontend Engineer",
  "Full Stack Developer",
  "Data Engineer",
  "DevOps Engineer",
];

const DSA_TOPIC_NAMES = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Binary Search",
];

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Fetch actual user profile & solved problem count
  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/api/v1/profile/me");
      if (res.data) {
        setProfile(res.data);
      }
    } catch {
      // Guest or offline: 0% default
      setProfile({
        full_name: "Candidate",
        username: "candidate",
        problems_solved: 0,
        easy_solved: 0,
        medium_solved: 0,
        hard_solved: 0,
        readiness_score: 0,
      });
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const solvedCount = profile?.problems_solved || 0;
  const easyCount = profile?.easy_solved || 0;
  const medCount = profile?.medium_solved || 0;
  const hardCount = profile?.hard_solved || 0;

  // Build dynamic steps from actual user stats (starts at 0% for new users)
  const template = BASE_ROADMAP_TEMPLATES[selectedRole] || BASE_ROADMAP_TEMPLATES["Software Engineer"];
  const steps: RoadmapStep[] = template.map((step, idx) => {
    if (solvedCount === 0) {
      return {
        ...step,
        proficiency: 0,
        status: "not-started" as const,
        isWeakness: false,
      };
    }

    // Dynamic progression as problems are solved
    let prof = 0;
    if (idx === 0) {
      prof = Math.min(100, Math.round((solvedCount / 5) * 100));
    } else if (idx === 1) {
      prof = Math.min(100, Math.round(((easyCount * 1.5 + medCount * 2) / 10) * 100));
    } else if (idx === 2) {
      prof = Math.min(100, Math.round((easyCount / 4) * 100));
    } else if (idx === 3) {
      prof = Math.min(100, Math.round((medCount / 3) * 100));
    } else if (idx === 4) {
      prof = Math.min(100, Math.round((hardCount / 2) * 100));
    } else {
      prof = Math.min(100, Math.round((solvedCount / 12) * 100));
    }

    const status: "completed" | "in-progress" | "weak" | "not-started" =
      prof >= 80 ? "completed" :
      prof > 0 ? "in-progress" :
      "not-started";

    return {
      ...step,
      proficiency: prof,
      status,
      isWeakness: prof > 0 && prof < 40,
    };
  });

  const totalProficiency = steps.reduce((acc, s) => acc + s.proficiency, 0);
  const overallProgress = steps.length > 0 ? Math.round(totalProficiency / steps.length) : 0;

  // Dynamic DSA subtopics breakdown based on user activity (0% for fresh account)
  const dsaSubtopics = DSA_TOPIC_NAMES.map((name, i) => {
    if (solvedCount === 0) return { name, percent: 0 };
    const factor = (i % 3) + 1;
    const calc = Math.min(100, Math.round((solvedCount * 12) / factor));
    return { name, percent: calc };
  });

  const statusStyle: Record<string, { border: string; bg: string; dot: string; label: string }> = {
    completed: { border: "rgba(16,185,129,0.3)", bg: "rgba(16,185,129,0.06)", dot: "#10b981", label: "Completed" },
    "in-progress": { border: "rgba(99,102,241,0.3)", bg: "rgba(99,102,241,0.06)", dot: "#6366f1", label: "In Progress" },
    weak: { border: "rgba(239,68,68,0.3)", bg: "rgba(239,68,68,0.06)", dot: "#ef4444", label: "Needs Practice" },
    "not-started": { border: "var(--nex-border)", bg: "transparent", dot: "var(--nex-text-3)", label: "Not Started" },
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "800" }}>🗺️ Career Learning Roadmap</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>Your SDE Readiness:</span>
            <div style={{
              padding: "4px 12px", borderRadius: "999px",
              background: overallProgress > 0 ? "rgba(99,102,241,0.12)" : "var(--nex-surface)",
              border: `1px solid ${overallProgress > 0 ? "rgba(99,102,241,0.3)" : "var(--nex-border)"}`,
              fontSize: "13px", fontWeight: "800",
              color: overallProgress > 0 ? "var(--nex-primary)" : "var(--nex-text-3)"
            }}>
              {overallProgress}%
            </div>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Role selector tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {TARGET_ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    const newTemplate = BASE_ROADMAP_TEMPLATES[role] || [];
                    setExpandedStep(newTemplate.length > 0 ? newTemplate[0].id : null);
                  }}
                  style={{
                    padding: "9px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: "700",
                    border: `1px solid ${isSelected ? "#f97316" : "var(--nex-border)"}`,
                    background: isSelected ? "rgba(249,115,22,0.12)" : "var(--nex-surface)",
                    color: isSelected ? "#f97316" : "var(--nex-text-2)",
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  {role}
                </button>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            {/* Main roadmap timeline */}
            <div>
              {solvedCount === 0 && (
                <div className="glass" style={{ padding: "16px 20px", borderRadius: "12px", marginBottom: "20px", borderLeft: "3px solid #f97316", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "#f97316", marginBottom: "3px" }}>
                      🚀 Start Your Learning Journey
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--nex-text-2)" }}>
                      Solve coding problems and complete topic quizzes to automatically increase your readiness percentage.
                    </div>
                  </div>
                  <Link href="/problems" className="btn-primary btn-sm" style={{ textDecoration: "none", fontSize: "12px", whiteSpace: "nowrap" }}>
                    Start Solving →
                  </Link>
                </div>
              )}

              {steps.map((step, idx) => {
                const style = statusStyle[step.status] || statusStyle["not-started"];
                const isExpanded = expandedStep === step.id;
                return (
                  <div key={step.id} style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
                    {/* Timeline icon & line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: style.bg, border: `2px solid ${style.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px", flexShrink: 0, zIndex: 1,
                      }}>
                        {step.icon}
                      </div>
                      {idx < steps.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: style.dot, opacity: 0.25, marginTop: "6px", minHeight: "24px" }} />
                      )}
                    </div>

                    {/* Step Card */}
                    <div
                      style={{
                        flex: 1, border: `1px solid ${style.border}`, borderRadius: "14px",
                        background: isExpanded ? "var(--nex-bg-2)" : style.bg,
                        overflow: "hidden", cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    >
                      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "15px", fontWeight: "800", color: "var(--nex-text-1)" }}>{step.title}</span>
                            {step.isWeakness && (
                              <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "999px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                                ⚠️ Needs Practice
                              </span>
                            )}
                            <span style={{
                              fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "999px",
                              background: style.bg, color: style.dot, border: `1px solid ${style.border}`, marginLeft: "auto"
                            }}>
                              {style.label}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ flex: 1, height: "6px", borderRadius: "999px", background: "var(--nex-surface)", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${step.proficiency}%`, background: style.dot, borderRadius: "999px" }} />
                            </div>
                            <span style={{ fontSize: "12px", fontWeight: "700", color: step.proficiency > 0 ? style.dot : "var(--nex-text-3)", minWidth: "35px" }}>
                              {step.proficiency}%
                            </span>
                          </div>
                        </div>

                        <span style={{ fontSize: "14px", color: "var(--nex-text-3)", marginLeft: "8px" }}>
                          {isExpanded ? "▲" : "▼"}
                        </span>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--nex-border)", background: "rgba(0,0,0,0.2)" }}>
                          <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                            Core Skills & Topics Covered:
                          </div>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                            {step.skills.map((skill, sIdx) => (
                              <span key={sIdx} style={{
                                padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "600",
                                background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                                color: "var(--nex-text-1)"
                              }}>
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                            <Link href="/problems" className="btn-primary btn-sm" style={{ textDecoration: "none", fontSize: "12px" }}>
                              Practice {step.problems} Topic Problems →
                            </Link>
                            <Link href="/learn" className="btn-ghost btn-sm" style={{ textDecoration: "none", fontSize: "12px", border: "1px solid var(--nex-border)" }}>
                              📖 Read Topic Notes
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Stats Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* DSA breakdown */}
              <div className="glass" style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--nex-border)" }}>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--nex-text-1)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                  📊 DSA Topic Breakdown
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {dsaSubtopics.map((topic) => {
                    const color = topic.percent >= 70 ? "#10b981" : topic.percent >= 40 ? "#6366f1" : topic.percent > 0 ? "#f97316" : "var(--nex-text-3)";
                    return (
                      <div key={topic.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                          <span style={{ color: "var(--nex-text-1)", fontWeight: "600" }}>{topic.name}</span>
                          <span style={{ color, fontWeight: "700" }}>{topic.percent}%</span>
                        </div>
                        <div style={{ height: "4px", borderRadius: "999px", background: "var(--nex-surface)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${topic.percent}%`, background: color, borderRadius: "999px" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Plan */}
              <div className="glass" style={{ padding: "20px", borderRadius: "14px", border: "1px solid var(--nex-border)" }}>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--nex-text-1)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" }}>
                  📅 This Week's Plan
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px" }}>
                  {[
                    { day: "Mon", task: "Graph BFS/DFS", tag: "Problem", color: "#6366f1" },
                    { day: "Tue", task: "Topological Sort", tag: "Problem", color: "#6366f1" },
                    { day: "Wed", task: "OS Scheduling", tag: "Learn", color: "#10b981" },
                    { day: "Thu", task: "DP on Strings", tag: "Problem", color: "#6366f1" },
                    { day: "Fri", task: "System Design Mock", tag: "Interview", color: "#f97316" },
                    { day: "Sat", task: "Weekly Contest", tag: "Contest", color: "#eab308" },
                    { day: "Sun", task: "Review & Revise", tag: "Review", color: "#38bdf8" },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "var(--nex-text-3)", minWidth: "28px", fontWeight: "600" }}>{item.day}</span>
                        <span style={{ color: "var(--nex-text-1)", fontWeight: "600" }}>{item.task}</span>
                      </div>
                      <span style={{
                        padding: "1px 7px", borderRadius: "4px", fontSize: "10px", fontWeight: "700",
                        background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30`
                      }}>
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
