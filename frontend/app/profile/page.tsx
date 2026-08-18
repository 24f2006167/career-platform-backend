"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

interface UserProfile {
  full_name: string;
  username: string;
  email: string;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  nexvora_rating: number;
  contest_rating: number;
  xp: number;
  level: number;
  streak: number;
  problems_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  target_role: string;
  experience_level: string;
  readiness_score: number;
  achievements: Array<{ name: string; icon: string; description: string; unlocked_at: string }>;
  joined_at: string;
}

const ACHIEVEMENTS_LIST = [
  { id: "1", name: "First Blood", icon: "⚡", description: "Solved your first DSA problem on Nexvora", unlocked: true },
  { id: "2", name: "Streak Starter", icon: "🔥", description: "Maintained a 7-day coding streak", unlocked: false },
  { id: "3", name: "Centurion", icon: "💯", description: "Solved 100 problems across all topics", unlocked: false },
  { id: "4", name: "Contest Ready", icon: "🏆", description: "Participated in your first Nexvora contest", unlocked: true },
  { id: "5", name: "System Architect", icon: "🏗️", description: "Completed System Design foundations track", unlocked: false },
  { id: "6", name: "Algorithmic Master", icon: "👑", description: "Reached 2000+ Nexvora Elo rating", unlocked: false },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    target_role: "",
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch("http://127.0.0.1:8000/api/v1/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          bio: data.bio || "",
          target_role: data.target_role || "Software Engineer",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          portfolio_url: data.portfolio_url || "",
        });
      }
    } catch {
      setProfile({
        full_name: "Shitanshu Chaurasiya",
        username: "shitanshu",
        email: "laptop18122022@gmail.com",
        bio: "Full Stack SDE passionate about scalable backend systems and algorithm optimization.",
        nexvora_rating: 1200,
        contest_rating: 1200,
        xp: 150,
        level: 2,
        streak: 3,
        problems_solved: 5,
        easy_solved: 4,
        medium_solved: 1,
        hard_solved: 0,
        target_role: "Software Engineer",
        experience_level: "Intermediate",
        readiness_score: 42,
        achievements: [
          { name: "First Blood", icon: "⚡", description: "Solved your first problem", unlocked_at: "2026-08-12" },
        ],
        joined_at: "2026-08-01",
      });
    }
  }

  async function handleSave() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch("http://127.0.0.1:8000/api/v1/profile/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setEditing(false);
        fetchProfile();
      }
    } catch {
      setEditing(false);
    }
  }

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Profile & Gamification</h1>
          <div style={{ marginLeft: "auto" }}>
            <button className="btn-ghost btn-sm" onClick={() => setEditing(!editing)}>
              {editing ? "Cancel" : "⚙️ Edit Profile"}
            </button>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Card */}
          <div className="glass" style={{ padding: "28px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "32px", fontWeight: "900", color: "white", flexShrink: 0
              }}>
                {(profile?.full_name || "S")[0].toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "800" }}>{profile?.full_name || "Developer"}</h2>
                  <span style={{ color: "var(--nex-text-3)", fontSize: "14px" }}>@{profile?.username}</span>
                  <span className="badge badge-primary">Level {profile?.level || 1}</span>
                </div>
                <p style={{ color: "var(--nex-text-2)", fontSize: "14px", marginBottom: "12px" }}>
                  {profile?.bio || "Building software & mastering data structures."}
                </p>

                <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "var(--nex-text-3)" }}>
                  <span>🎯 Role: <strong style={{ color: "var(--nex-text-1)" }}>{profile?.target_role || "SDE"}</strong></span>
                  <span>🔥 Streak: <strong style={{ color: "#fb923c" }}>{profile?.streak || 0} days</strong></span>
                  <span>⭐ Rating: <strong style={{ color: "#a5b4fc" }}>{profile?.nexvora_rating || 1200}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          {editing && (
            <div className="glass" style={{ padding: "24px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "16px" }}>Edit Profile Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "block", marginBottom: "6px" }}>Full Name</label>
                  <input className="nex-input" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "block", marginBottom: "6px" }}>Target Role</label>
                  <input className="nex-input" value={formData.target_role} onChange={(e) => setFormData({ ...formData, target_role: e.target.value })} />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "block", marginBottom: "6px" }}>Bio</label>
                  <input className="nex-input" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "block", marginBottom: "6px" }}>GitHub URL</label>
                  <input className="nex-input" value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--nex-text-3)", display: "block", marginBottom: "6px" }}>LinkedIn URL</label>
                  <input className="nex-input" value={formData.linkedin_url} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })} />
                </div>
              </div>
              <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          )}

          {/* Gamification & Achievements */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>🏆 Achievements & Badges</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {ACHIEVEMENTS_LIST.map((ach) => (
                <div
                  key={ach.id}
                  className="glass"
                  style={{
                    padding: "20px",
                    opacity: ach.unlocked ? 1 : 0.45,
                    border: ach.unlocked ? "1px solid rgba(99,102,241,0.3)" : "1px solid var(--nex-border)",
                    background: ach.unlocked ? "rgba(99,102,241,0.05)" : "var(--nex-surface)",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>{ach.icon}</div>
                  <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "4px" }}>{ach.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-2)", lineHeight: "1.5" }}>{ach.description}</div>
                  <div style={{ marginTop: "12px", fontSize: "11px", color: ach.unlocked ? "var(--nex-success)" : "var(--nex-text-3)", fontWeight: "600" }}>
                    {ach.unlocked ? "✓ Unlocked" : "🔒 Locked"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
