"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { AdminCategory, getAdminCategories } from "@/services/admin";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdminCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadCategories]);

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "16px", fontWeight: "700" }}>Skill Categories</h1>
          <div style={{ marginLeft: "auto" }}>
            <span className="badge badge-primary">{categories.length} Categories</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Skill Category Directory
            </h2>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px" }}>
              High-level domain groupings for candidate learning paths and assessments.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {loading ? (
              <div style={{ gridColumn: "span 3", padding: "40px", textAlign: "center", color: "var(--nex-text-3)" }}>Loading categories...</div>
            ) : categories.length === 0 ? (
              <div style={{ gridColumn: "span 3", padding: "40px", textAlign: "center", color: "var(--nex-text-3)" }}>No categories found.</div>
            ) : (
              categories.map((c) => (
                <div key={c.id} className="glass glass-hover" style={{ padding: "20px", borderRadius: "14px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>📚</div>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "4px" }}>{c.name}</h3>
                  <p style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>ID: {c.id}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}