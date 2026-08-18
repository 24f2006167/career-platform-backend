"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { AdminUser, getAdminUsers } from "@/services/admin";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load users. Please check backend authorization.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadUsers]);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>User Management</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <span className="badge badge-primary">Total: {users.length} Users</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Card */}
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Registered Platform Users
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Manage candidate & recruiter permissions, view user ratings, level progression, and account activity.
            </p>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", marginBottom: "20px" }}>
              ⚠️ {error}
            </div>
          )}

          {/* User Table Card */}
          <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <table className="nex-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Nexvora Rating</th>
                  <th>Level / XP</th>
                  <th>Target Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--nex-text-3)" }}>
                      Loading registered users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--nex-text-3)" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td style={{ fontWeight: "700" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "14px", fontWeight: "bold", color: "white", flexShrink: 0
                          }}>
                            {(u.full_name || u.username || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <div>{u.full_name || u.username}</div>
                            <div style={{ fontSize: "11px", color: "var(--nex-text-3)", fontWeight: "normal" }}>@{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "var(--nex-text-2)", fontSize: "13px" }}>{u.email}</td>
                      <td>
                        <span className="badge badge-primary" style={{ fontSize: "11px", textTransform: "capitalize" }}>
                          {u.role || "Candidate"}
                        </span>
                      </td>
                      <td style={{ fontWeight: "700", color: "#a5b4fc" }}>⭐ {u.nexvora_rating ?? 1200}</td>
                      <td style={{ fontSize: "13px", color: "var(--nex-text-2)" }}>Lvl {u.level ?? 1} · {u.xp ?? 0} XP</td>
                      <td style={{ fontSize: "13px", color: "var(--nex-text-2)" }}>{u.target_role || "Software Engineer"}</td>
                      <td>
                        <span style={{
                          padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "700",
                          background: u.is_active !== false ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                          color: u.is_active !== false ? "var(--nex-success)" : "var(--nex-danger)",
                          border: `1px solid ${u.is_active !== false ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`
                        }}>
                          {u.is_active !== false ? "Active" : "Disabled"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}