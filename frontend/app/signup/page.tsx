"use client";

import { useState } from "react";
import Link from "next/link";
import { signupUser, loginUser, getCurrentUser } from "@/services/auth";
import { UserRole } from "@/types/user";

type SignupRole = Exclude<UserRole, "admin">;

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<SignupRole>("candidate");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDashboardPath = (userRole?: string) => {
    const cleanRole = (userRole || role || "candidate").toLowerCase();
    if (cleanRole === "recruiter") return "/dashboard/recruiter";
    if (cleanRole === "admin") return "/dashboard/admin";
    return "/dashboard/candidate";
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const cleanFullName = fullName.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanFullName.length < 2) {
      setError("Full name must be at least 2 characters.");
      return;
    }
    if (cleanUsername.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (cleanPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await signupUser({
        full_name: cleanFullName,
        username: cleanUsername,
        email: cleanEmail,
        password: cleanPassword,
        role,
      });

      const loginResponse = await loginUser({
        email: cleanEmail,
        password: cleanPassword,
      });

      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("access_token", loginResponse.access_token);

      const currentUser = await getCurrentUser();
      localStorage.setItem("user", JSON.stringify(currentUser));

      window.location.replace(getDashboardPath(currentUser.role));
    } catch (err: unknown) {
      console.error("Signup error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      const axiosError = err as { response?: { data?: { detail?: string | Array<{ loc?: string[]; msg?: string }> } } };
      const detail = axiosError.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((item) => `${item.loc?.join(".") || "field"}: ${item.msg || "invalid"}`).join(" | "));
      } else if (typeof detail === "string") {
        setError(detail);
      } else if (!axiosError.response) {
        setError("Unable to connect to API backend. Please check server status or NEXT_PUBLIC_API_URL.");
      } else {
        setError("Signup failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--nex-bg)",
      color: "var(--nex-text-1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient background glow */}
      <div className="hero-bg">
        <div className="hero-orb" style={{
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent)",
          top: "20%", left: "10%",
        }} />
        <div className="hero-orb" style={{
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent)",
          bottom: "10%", right: "15%",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "1100px", width: "100%",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px",
        alignItems: "center",
      }}>
        {/* Left Hero Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{
              width: 38, height: 38, borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: "bold", color: "white"
            }}>N</div>
            <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em" }}>Nexvora AI</span>
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc", marginBottom: "20px",
          }}>
            🚀 Build Your AI Career Profile
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "900",
            lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Start your{" "}
            <span className="gradient-text">skill verification</span>
            <br />journey
          </h1>

          <p style={{ color: "var(--nex-text-2)", fontSize: "16px", lineHeight: "1.7", marginBottom: "32px" }}>
            Create your account, choose your target career path, solve real coding problems, track progress, and get interview-ready with AI.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Personalized role-based roadmap (SDE, Backend, Frontend)",
              "Real code execution judge with CPU & memory limits",
              "AI Mock Interviews with instant evaluation",
              "Competitive leaderboards & Elo-based rating system",
            ].map((feature) => (
              <div key={feature} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "12px",
                background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                fontSize: "14px", color: "var(--nex-text-1)",
              }}>
                <span style={{ color: "var(--nex-success)", fontWeight: "700" }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="glass glow-primary" style={{ padding: "36px", borderRadius: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "14px", margin: "0 auto 16px",
              background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
            }}>⚡</div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Create Account
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Join the AI-powered developer career platform
            </p>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: "10px", marginBottom: "20px",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5", fontSize: "13px", display: "flex", gap: "10px", alignItems: "center",
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "6px" }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="nex-input"
                placeholder="e.g. Shitanshu Chaurasiya"
                required
                style={{ padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "6px" }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="nex-input"
                placeholder="e.g. shitanshu"
                required
                style={{ padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="nex-input"
                placeholder="you@example.com"
                required
                style={{ padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "6px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="nex-input"
                placeholder="Minimum 8 characters"
                required
                style={{ padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)", marginBottom: "6px" }}>
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as SignupRole)}
                className="nex-select"
                style={{ width: "100%", padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              >
                <option value="candidate">Candidate (Job Seeker / Learner)</option>
                <option value="recruiter">Recruiter (Hiring Manager)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "15px", justifyContent: "center", borderRadius: "12px", marginTop: "6px" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="animate-spin">⟳</span> Creating Account...
                </span>
              ) : "Create Account →"}
            </button>
          </form>

          <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "var(--nex-text-3)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--nex-primary)", fontWeight: "600", textDecoration: "none" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}