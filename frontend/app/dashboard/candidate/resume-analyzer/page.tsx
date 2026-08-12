"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function ResumeAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>AI Resume Analyzer</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">ATS Optimization</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "28px", borderRadius: "20px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              AI ATS Resume & Match Score
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "600px" }}>
              Upload your resume (PDF/Docx) to get instant ATS breakdown, keyword match score, and missing technical skills for your target SDE role.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Upload Box */}
            <div className="glass" style={{ padding: "32px", borderRadius: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed var(--nex-border)" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📄</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>Upload Resume</h3>
              <p style={{ fontSize: "13px", color: "var(--nex-text-3)", marginBottom: "20px" }}>
                Supports PDF, DOCX (Max 10MB)
              </p>
              <button onClick={handleUpload} disabled={analyzing} className="btn-primary">
                {analyzing ? "⟳ Analyzing Resume..." : "⚡ Select & Analyze Resume"}
              </button>
            </div>

            {/* Results Box */}
            <div className="glass" style={{ padding: "24px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>ATS Scorecard</h3>

              {!analyzed ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--nex-text-3)", fontSize: "13px" }}>
                  Upload a resume to generate your ATS match scorecard and AI recommendations.
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "36px", fontWeight: "900", color: "var(--nex-success)" }}>88%</div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "700" }}>Strong Match for SDE-1</div>
                      <div style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>High keyword density in Data Structures & System Design</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", fontSize: "13px" }}>
                      ✓ Strong: Microservices, Python, SQL, REST APIs
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", fontSize: "13px", color: "#fcd34d" }}>
                      ⚠️ Missing Keywords: Docker, Redis Caching, Kafka
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