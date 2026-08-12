"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { AdminSkill, getAdminSkills } from "@/services/admin";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<AdminSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await getAdminSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Generated Skills Index</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">{skills.length} Skills Total</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              AI Generated Platform Skills
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              Master index of all technical skills mapped to candidate career roadmaps.
            </p>
          </div>

          <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <table className="nex-table">
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--nex-text-3)" }}>Loading skills...</td></tr>
                ) : skills.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--nex-text-3)" }}>No skills found. Generate a role in the Admin Console.</td></tr>
                ) : (
                  skills.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: "700" }}>🧠 {s.name}</td>
                      <td><span className="badge badge-primary" style={{ fontSize: "11px" }}>{s.category || "DSA"}</span></td>
                      <td style={{ color: "var(--nex-text-2)" }}>{s.description || "Core Skill Track"}</td>
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