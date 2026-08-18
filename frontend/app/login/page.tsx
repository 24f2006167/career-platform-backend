"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser, getCurrentUser } from "@/services/auth";

interface UserRole {
  role?: string | { name?: string };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDashboardPath = (user: UserRole) => {
    const roleObj = typeof user.role === "object" && user.role !== null ? user.role.name : user.role;
    const cleanRole = (roleObj || "candidate").toLowerCase();
    if (cleanRole === "admin") return "/dashboard/admin";
    if (cleanRole === "recruiter") return "/dashboard/recruiter";
    return "/dashboard/candidate";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const loginResponse = await loginUser({
        email: cleanEmail,
        password,
      });

      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("access_token", loginResponse.access_token);

      const currentUser = await getCurrentUser();
      localStorage.setItem("user", JSON.stringify(currentUser));

      window.location.replace(getDashboardPath(currentUser));
    } catch (err: unknown) {
      console.error("Login failed:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      const axiosErr = err as { response?: { data?: { detail?: string } }; message?: string };
      const detail = axiosErr.response?.data?.detail;
      if (typeof detail === "string") {
        setError(detail);
      } else if (!axiosErr.response) {
        setError("Unable to connect to API backend. Please check server status or NEXT_PUBLIC_API_URL.");
      } else {
        setError("Invalid email or password");
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
          background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent)",
          top: "20%", right: "20%",
        }} />
        <div className="hero-orb" style={{
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent)",
          bottom: "10%", left: "15%",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "460px", width: "100%",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 42, height: 42, borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", fontWeight: "bold", color: "white"
            }}>N</div>
            <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em" }}>Nexvora</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass glow-primary" style={{ padding: "36px", borderRadius: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Welcome back
            </h1>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Log in to access your AI dashboard & problems
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

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--nex-text-2)" }}>
                  Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="nex-input"
                placeholder="••••••••"
                required
                style={{ padding: "12px 16px", fontSize: "14px", background: "rgba(15,17,26,0.8)" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", padding: "14px", fontSize: "15px", justifyContent: "center", borderRadius: "12px", marginTop: "6px" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="animate-spin">⟳</span> Logging in...
                </span>
              ) : "Log In →"}
            </button>
          </form>

          {/* Quick Demo Login Helper */}
          <div style={{
            marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--nex-border)",
            fontSize: "12px", color: "var(--nex-text-3)", textAlign: "center"
          }}>
            <p style={{ marginBottom: "8px", fontWeight: "600" }}>Demo Credentials:</p>
            <button
              onClick={() => { setEmail("laptop18122022@gmail.com"); setPassword("Admin@123"); }}
              style={{
                background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                borderRadius: "6px", padding: "4px 10px", fontSize: "12px", color: "#a5b4fc",
                cursor: "pointer"
              }}
            >
              Use Admin Account
            </button>
          </div>

          <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "var(--nex-text-3)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "var(--nex-primary)", fontWeight: "600", textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}