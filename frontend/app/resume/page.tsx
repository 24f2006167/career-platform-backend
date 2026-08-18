"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

interface ResumeAnalysisResult {
  score: number;
  matchRole: string;
  strongKeywords: string[];
  missingKeywords: string[];
  improvements: string[];
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);

  const handleSimulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        score: 88,
        matchRole: "Backend Software Engineer (SDE-2)",
        strongKeywords: ["FastAPI", "PostgreSQL", "Docker", "REST APIs", "Python", "Data Structures"],
        missingKeywords: ["Kafka", "Redis Caching", "Kubernetes", "gRPC"],
        improvements: [
          "Quantify achievement impact (e.g., 'Optimized query speed by 42%')",
          "Add distributed systems / microservices architecture section",
          "Include link to live GitHub repository for Capstone Projects"
        ]
      });
    }, 1800);
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>AI Resume & ATS Optimization</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">ATS Score Engine</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Banner */}
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="badge badge-primary">ATS Match Benchmarking</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Resume Parser & Skill Gap Analysis
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "650px", lineHeight: "1.6" }}>
              Upload your resume to evaluate ATS readability, detect missing tech stack keywords, and receive tailored bullet-point recommendations for SDE roles.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}>
            {/* Upload Box */}
            <div className="glass" style={{ padding: "32px", borderRadius: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed var(--nex-border)" }}>
              <div style={{ fontSize: "52px", marginBottom: "12px" }}>📄</div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "6px" }}>Upload PDF / Docx Resume</h3>
              <p style={{ fontSize: "13px", color: "var(--nex-text-3)", marginBottom: "20px", textAlign: "center" }}>
                Drag and drop your file here or click below to analyze ATS compatibility.
              </p>

              <input
                type="file"
                accept=".pdf,.docx,.doc"
                id="resume-upload"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="resume-upload"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "var(--nex-surface)",
                  border: "1px solid var(--nex-border)",
                  fontSize: "12px",
                  color: "var(--nex-text-2)",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              >
                {file ? `Selected: ${file.name}` : "Choose Resume File..."}
              </label>

              <button
                onClick={handleSimulateAnalysis}
                disabled={analyzing}
                className="btn-primary"
                style={{ padding: "12px 24px", fontSize: "14px" }}
              >
                {analyzing ? "⟳ AI Engine Analyzing Resume..." : "⚡ Scan & Analyze Resume"}
              </button>
            </div>

            {/* Results Panel */}
            <div className="glass" style={{ padding: "24px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "16px" }}>
                ATS Analysis Scorecard
              </h3>

              {!results ? (
                <div style={{ padding: "60px 20px", textAlign: "center", border: "1px dashed var(--nex-border)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🔍</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>No Resume Scanned Yet</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-3)", maxWidth: "280px", margin: "0 auto" }}>
                    Click the scan button on the left to generate keyword metrics and ATS score.
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "16px", borderRadius: "12px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", marginBottom: "20px" }}>
                    <div style={{ fontSize: "42px", fontWeight: "900", color: "#a5b4fc" }}>
                      {results.score}<span style={{ fontSize: "20px" }}>%</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--nex-text-1)" }}>{results.matchRole}</div>
                      <div style={{ fontSize: "12px", color: "var(--nex-text-3)", marginTop: "2px" }}>High compatibility score for Tier-1 engineering screens</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                      Detected Keywords ({results.strongKeywords.length})
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {results.strongKeywords.map((kw: string) => (
                        <span key={kw} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", background: "rgba(16,185,129,0.15)", color: "var(--nex-success)", border: "1px solid rgba(16,185,129,0.3)" }}>
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                      Missing Target Keywords
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {results.missingKeywords.map((kw: string) => (
                        <span key={kw} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", background: "rgba(239,68,68,0.15)", color: "var(--nex-danger)", border: "1px solid rgba(239,68,68,0.3)" }}>
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--nex-text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                      AI Recommended Resume Bullet Points
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {results.improvements.map((imp: string, i: number) => (
                        <div key={i} style={{ padding: "8px 12px", borderRadius: "8px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", fontSize: "12px", color: "var(--nex-text-2)" }}>
                          • {imp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
