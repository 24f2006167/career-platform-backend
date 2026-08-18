"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

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

const ROADMAP_DATA: Record<string, RoadmapStep[]> = {
  "Software Engineer": [
    { id: 1, title: "Programming Fundamentals & OOP", icon: "🐍", skills: ["Python / C++ / Java", "Data Types & Control Flow", "OOP Principles & Design", "Recursion & Memory"], proficiency: 85, problems: 45, status: "completed", category: "foundation" },
    { id: 2, title: "Data Structures & Algorithms", icon: "🌳", skills: ["Arrays, Strings & HashMaps", "Linked Lists & Stacks", "Trees, Tries & Heaps", "Dynamic Programming & Graphs", "Sorting & Binary Search"], proficiency: 68, problems: 94, status: "in-progress", category: "dsa" },
    { id: 3, title: "Database Management & SQL", icon: "🗄️", skills: ["SQL Queries & Joins", "Normalization & Indexing", "Transactions & ACID", "PostgreSQL & Redis"], proficiency: 72, problems: 26, status: "in-progress", category: "dbms" },
    { id: 4, title: "Operating Systems & Concurrency", icon: "⚙️", skills: ["Processes & Threads", "Memory Management & Paging", "CPU Scheduling & Deadlocks", "Concurrency & Semaphores"], proficiency: 54, problems: 18, status: "in-progress", category: "os", isWeakness: true },
    { id: 5, title: "Computer Networks", icon: "🌐", skills: ["OSI & TCP/IP Model", "HTTP/HTTPS & REST", "DNS, Sockets & WebSockets", "Load Balancers & Reverse Proxy"], proficiency: 42, problems: 14, status: "weak", category: "networks", isWeakness: true },
    { id: 6, title: "System Design & Architecture", icon: "🏗️", skills: ["Scalability & High Availability", "Microservices & API Gateway", "Caching (Redis/Memcached)", "Message Queues (Kafka/RabbitMQ)", "Database Sharding"], proficiency: 38, problems: 12, status: "weak", category: "system_design", isWeakness: true },
    { id: 7, title: "Backend Development", icon: "🚀", skills: ["RESTful API Architecture", "FastAPI / Node.js / Spring", "JWT & OAuth2 Auth", "Docker Containers", "CI/CD Pipelines"], proficiency: 67, problems: 34, status: "in-progress", category: "backend" },
    { id: 8, title: "Technical Interview & Mock Prep", icon: "🎤", skills: ["Live Coding & Problem Decomposition", "STAR Method Behavioral", "System Design Rounds", "Resume Optimization"], proficiency: 45, problems: 15, status: "not-started", category: "interview" },
  ],

  "Backend Engineer": [
    { id: 101, title: "Core Language Mastery (Python/Go/Java)", icon: "⚡", skills: ["Advanced Python / Go / Java", "Concurrency & Async I/O", "Memory Management & Profiling", "Clean Architecture & SOLID"], proficiency: 80, problems: 40, status: "completed", category: "lang" },
    { id: 102, title: "API Development & Web Frameworks", icon: "🔌", skills: ["FastAPI / Express / Spring Boot", "RESTful Design Principles", "GraphQL & gRPC APIs", "Request Validation & OpenAPI"], proficiency: 75, problems: 32, status: "in-progress", category: "api" },
    { id: 103, title: "Databases (SQL & NoSQL)", icon: "🗄️", skills: ["PostgreSQL Schema Design", "Query Optimization & EXPLAIN", "Redis In-Memory Caching", "MongoDB / Cassandra NoSQL", "Transactions & Isolation Levels"], proficiency: 68, problems: 28, status: "in-progress", category: "database" },
    { id: 104, title: "Authentication, Security & Rate Limiting", icon: "🔐", skills: ["JWT, OAuth 2.0 & SSO", "Token Rotation & Refresh", "Password Hashing (bcrypt/argon2)", "Rate Limiting & CORS", "SQL Injection & XSS Defense"], proficiency: 70, problems: 20, status: "in-progress", category: "security" },
    { id: 105, title: "Distributed Systems & Message Queues", icon: "📡", skills: ["Apache Kafka & Event Streams", "RabbitMQ / Celery Async Tasks", "Idempotency & Retry Mechanisms", "CAP Theorem & Distributed Locks"], proficiency: 40, problems: 12, status: "weak", category: "distributed", isWeakness: true },
    { id: 106, title: "Cloud & DevOps for Backend", icon: "☁️", skills: ["Docker Containerization", "Kubernetes Pods & Deployments", "AWS / GCP Cloud Services", "GitHub Actions CI/CD", "Prometheus & Grafana Monitoring"], proficiency: 50, problems: 16, status: "in-progress", category: "devops" },
    { id: 107, title: "High-Scale System Design", icon: "🏗️", skills: ["Horizontal vs Vertical Scaling", "Consistent Hashing & Partitioning", "CDN & Global Edge Caching", "Disaster Recovery & Backup"], proficiency: 35, problems: 10, status: "weak", category: "system_design", isWeakness: true },
  ],

  "Frontend Engineer": [
    { id: 201, title: "Modern HTML5, CSS3 & Responsive UI", icon: "🎨", skills: ["Semantic HTML5 & Accessibility (a11y)", "Flexbox, CSS Grid & Positioning", "CSS Custom Properties & Theming", "Responsive Design & Mobile-First"], proficiency: 90, problems: 35, status: "completed", category: "ui" },
    { id: 202, title: "JavaScript Deep Dive (ES6+)", icon: "⚡", skills: ["Closures, Prototypes & 'this'", "Async/Await, Promises & Event Loop", "DOM Manipulation & Events", "Functional Programming Patterns"], proficiency: 82, problems: 48, status: "completed", category: "js" },
    { id: 203, title: "TypeScript Mastery", icon: "📘", skills: ["Static Types, Generics & Unions", "Interfaces & Type Assertions", "Utility Types (Partial, Pick, Omit)", "Strict Mode & TSConfig"], proficiency: 74, problems: 28, status: "in-progress", category: "ts" },
    { id: 204, title: "React 19 & Next.js 15 App Router", icon: "⚛️", skills: ["React Hooks (useState, useEffect, useMemo)", "Server vs Client Components", "Next.js Routing & Layouts", "Server Actions & Form Handling"], proficiency: 78, problems: 36, status: "in-progress", category: "react" },
    { id: 205, title: "State Management & Data Fetching", icon: "🔄", skills: ["Zustand / Redux Toolkit", "React Query / SWR Caching", "Optimistic UI Updates", "WebSocket Realtime Events"], proficiency: 65, problems: 22, status: "in-progress", category: "state" },
    { id: 206, title: "Performance & Web Vitals", icon: "🚀", skills: ["Core Web Vitals (LCP, FID, CLS)", "Code Splitting & Lazy Loading", "Image Optimization & Next/Image", "Bundle Analysis & Tree Shaking"], proficiency: 48, problems: 14, status: "weak", category: "perf", isWeakness: true },
    { id: 207, title: "Testing & Frontend Architecture", icon: "🧪", skills: ["Jest & React Testing Library", "Playwright / Cypress E2E", "Microfrontends & Component Libraries", "Storybook & Design Systems"], proficiency: 42, problems: 12, status: "weak", category: "testing", isWeakness: true },
  ],

  "Full Stack Developer": [
    { id: 301, title: "Frontend Foundation (React + TypeScript)", icon: "💻", skills: ["React 19 Components & Hooks", "TypeScript Strict Typing", "TailwindCSS / Vanilla CSS Tokens", "State Management (Zustand)"], proficiency: 82, problems: 44, status: "completed", category: "frontend" },
    { id: 302, title: "Backend API Architecture (FastAPI/Node)", icon: "🚀", skills: ["FastAPI & Express Frameworks", "RESTful & GraphQL API Design", "JWT Auth & Session Management", "Request Validation & Error Handling"], proficiency: 76, problems: 38, status: "in-progress", category: "backend" },
    { id: 303, title: "Database Modeling & ORM", icon: "🗄️", skills: ["PostgreSQL Schema & Migrations", "SQLAlchemy / Prisma ORMs", "Redis Caching & Session Storage", "Indexing & Optimization"], proficiency: 70, problems: 26, status: "in-progress", category: "db" },
    { id: 304, title: "Full Stack Integration & SSR", icon: "🔄", skills: ["Next.js Fullstack App Router", "Server-Side Rendering (SSR)", "Vercel & Railway Deployment", "CORS, Cookies & HTTPS Proxies"], proficiency: 68, problems: 24, status: "in-progress", category: "integration" },
    { id: 305, title: "Cloud, Containers & CI/CD", icon: "☁️", skills: ["Docker & Docker Compose", "GitHub Actions Automation", "AWS S3 / Cloud Storage", "Environment Variables & Secrets"], proficiency: 52, problems: 16, status: "in-progress", category: "cloud" },
    { id: 306, title: "System Design & Microservices", icon: "🏗️", skills: ["Monolith vs Microservices", "Background Job Queues (Celery/Bull)", "Load Balancing & Horizontal Scaling", "Database Replication"], proficiency: 40, problems: 12, status: "weak", category: "sysdesign", isWeakness: true },
  ],

  "Data Engineer": [
    { id: 401, title: "Python for Data & Advanced SQL", icon: "🐍", skills: ["Advanced Python & NumPy/Pandas", "Complex SQL, Window Functions & CTEs", "Data Cleaning & Transformation", "File Formats (Parquet, Avro, ORC)"], proficiency: 84, problems: 42, status: "completed", category: "data_lang" },
    { id: 402, title: "Data Warehousing & Modeling", icon: "🏢", skills: ["Snowflake / BigQuery / Redshift", "Star Schema & Snowflake Schema", "Slowly Changing Dimensions (SCD)", "Columnar Storage & Partitioning"], proficiency: 72, problems: 28, status: "in-progress", category: "warehouse" },
    { id: 403, title: "ETL / ELT Pipelines & Orchestration", icon: "⚙️", skills: ["Apache Airflow DAGs & Operators", "dbt (Data Build Tool)", "Prefect / Mage Workflow Tools", "Data Quality & Great Expectations"], proficiency: 65, problems: 24, status: "in-progress", category: "orchestration" },
    { id: 404, title: "Big Data Processing (PySpark & Hadoop)", icon: "⚡", skills: ["Apache Spark & PySpark RDDs/DataFrames", "Spark Optimization & Memory Tuning", "Distributed Compute Fundamentals", "Delta Lake & Lakehouse"], proficiency: 46, problems: 16, status: "weak", category: "spark", isWeakness: true },
    { id: 405, title: "Streaming & Real-Time Data (Kafka)", icon: "📡", skills: ["Apache Kafka Producers & Consumers", "Kafka Streams / Spark Streaming", "Schema Registry (Avro)", "Windowing & Watermarking"], proficiency: 38, problems: 12, status: "weak", category: "streaming", isWeakness: true },
    { id: 406, title: "Cloud Data Architecture (AWS/GCP)", icon: "☁️", skills: ["AWS S3 / GCS Data Lakes", "AWS Glue / GCP Dataflow", "IAM Policies & Data Governance", "Cost Optimization & Monitoring"], proficiency: 50, problems: 14, status: "in-progress", category: "cloud" },
  ],

  "DevOps Engineer": [
    { id: 501, title: "Linux Administration & Bash Scripting", icon: "🐧", skills: ["Linux Kernel & System Calls", "Bash Scripting & Automation", "Networking, iptables & SSH", "Process Management & systemd"], proficiency: 86, problems: 38, status: "completed", category: "linux" },
    { id: 502, title: "Containers & Container Orchestration", icon: "🐳", skills: ["Dockerfiles & Multi-Stage Builds", "Docker Compose Local Dev", "Kubernetes Pods, Services & Ingress", "Helm Charts & K8s Deployments"], proficiency: 74, problems: 30, status: "in-progress", category: "containers" },
    { id: 503, title: "Infrastructure as Code (IaC)", icon: "🏗️", skills: ["Terraform Modules & State", "AWS / GCP Cloud Resources", "Ansible Configuration Management", "IaC Security Scanning (tfsec)"], proficiency: 62, problems: 22, status: "in-progress", category: "iac" },
    { id: 504, title: "CI/CD Pipeline Automation", icon: "🔄", skills: ["GitHub Actions Workflows", "GitLab CI / Jenkins Pipelines", "Automated Testing & Linting", "Zero-Downtime Deployment (Blue/Green)"], proficiency: 68, problems: 26, status: "in-progress", category: "cicd" },
    { id: 505, title: "Observability, Logging & Monitoring", icon: "📊", skills: ["Prometheus Metrics & Exporters", "Grafana Dashboards & Alerting", "ELK / EFK Stack Centralized Logging", "Distributed Tracing (OpenTelemetry)"], proficiency: 44, problems: 14, status: "weak", category: "monitoring", isWeakness: true },
    { id: 506, title: "Cloud Security & DevSecOps", icon: "🛡️", skills: ["Secrets Management (HashiCorp Vault)", "Container Vulnerability Scanning (Trivy)", "TLS/SSL Certificate Automation (Let's Encrypt)", "Least Privilege IAM & Compliance"], proficiency: 40, problems: 12, status: "weak", category: "security", isWeakness: true },
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

const DSA_SUBTOPICS = [
  { name: "Arrays", percent: 95 },
  { name: "Strings", percent: 82 },
  { name: "Linked Lists", percent: 71 },
  { name: "Trees", percent: 58 },
  { name: "Graphs", percent: 34 },
  { name: "Dynamic Programming", percent: 22 },
  { name: "Greedy", percent: 45 },
  { name: "Binary Search", percent: 68 },
];

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const steps = ROADMAP_DATA[selectedRole] || ROADMAP_DATA["Software Engineer"];
  const totalProficiency = steps.reduce((acc, s) => acc + s.proficiency, 0);
  const overallProgress = steps.length > 0 ? Math.round(totalProficiency / steps.length) : 0;

  const statusStyle: Record<string, { border: string; bg: string; dot: string; label: string }> = {
    completed: { border: "rgba(16,185,129,0.3)", bg: "rgba(16,185,129,0.06)", dot: "#10b981", label: "Completed" },
    "in-progress": { border: "rgba(99,102,241,0.3)", bg: "rgba(99,102,241,0.06)", dot: "#6366f1", label: "In Progress" },
    weak: { border: "rgba(239,68,68,0.3)", bg: "rgba(239,68,68,0.06)", dot: "#ef4444", label: "Weak Area" },
    "not-started": { border: "var(--nex-border)", bg: "transparent", dot: "var(--nex-text-3)", label: "Not Started" },
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "800" }}>🗺️ Career Learning Roadmap</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--nex-text-3)" }}>Overall Readiness:</span>
            <div style={{
              padding: "4px 12px", borderRadius: "999px",
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
              fontSize: "13px", fontWeight: "800", color: "var(--nex-primary)"
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
                    const newSteps = ROADMAP_DATA[role] || [];
                    setExpandedStep(newSteps.length > 0 ? newSteps[0].id : null);
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
                                ⚠️ Needs Work
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
                            <span style={{ fontSize: "12px", fontWeight: "700", color: style.dot, minWidth: "35px" }}>
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
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                  {DSA_SUBTOPICS.map((topic) => {
                    const color = topic.percent >= 70 ? "#10b981" : topic.percent >= 40 ? "#6366f1" : "#ef4444";
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
