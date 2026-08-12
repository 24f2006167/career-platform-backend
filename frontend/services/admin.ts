import API from "@/lib/api";

export interface AdminStats {
  users: number;
  roles: number;
  skills: number;
  categories: number;
  system_status: string;
  database: string;
}

export interface AdminUser {
  id: string;
  full_name: string;
  username: string;
  email: string;
  role: string;
}

export interface AdminSkill {
  id: string;
  name: string;
  description: string | null;
  category: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string | null;
}

export interface AdminJobRole {
  id: string;
  name: string;
  description: string | null;
}

export interface AdminJobRoleConcept {
  id: string;
  title: string;
  type: string;
  difficulty: string;
}

export interface AdminJobRoleSkill {
  id: string;
  name: string;
  description: string | null;
  category: string;
  concepts: AdminJobRoleConcept[];
}

export interface AdminJobRoleSkillsResponse {
  role: AdminJobRole;
  skills: AdminJobRoleSkill[];
}

export interface GenerateJobRolePayload {
  title: string;
  description?: string;
}

export interface GeneratedJobRoleResponse {
  message: string;
  role: {
    id: string;
    name: string;
    description: string | null;
  };
  skills: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    created: boolean;
  }[];
  source: string;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await API.get("/admin/stats");
  return response.data;
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await API.get("/admin/users");
  return response.data;
};

export const getAdminSkills = async (): Promise<AdminSkill[]> => {
  const response = await API.get("/admin/skills");
  return response.data;
};

export const getAdminCategories = async (): Promise<AdminCategory[]> => {
  const response = await API.get("/admin/categories");
  return response.data;
};

export const getAdminJobRoles = async (): Promise<AdminJobRole[]> => {
  const response = await API.get("/admin/job-roles");
  return response.data;
};

export const getAdminJobRoleSkills = async (
  roleId: string
): Promise<AdminJobRoleSkillsResponse> => {
  const response = await API.get(`/admin/job-roles/${roleId}/skills`);
  return response.data;
};

export const generateJobRoleWithAI = async (
  payload: GenerateJobRolePayload
): Promise<GeneratedJobRoleResponse> => {
  const response = await API.post("/admin/job-roles/generate", payload);
  return response.data;
};