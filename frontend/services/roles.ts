import API from "@/lib/api";

export interface RoleConcept {
  id: string;
  title: string;
  description?: string;
  type?: string;
  difficulty?: string;
}

export interface RoleSkill {
  id: string;
  title: string;
  name?: string;
  description?: string;
  concepts?: RoleConcept[];
}

export interface RoleOption {
  id: string;
  title: string;
  name?: string;
  description: string;
  type: string;
  difficulty: string;
  skills: RoleSkill[];
}
export const getAllRoles = async (): Promise<RoleOption[]> => {
  try {
    const response = await API.get("/roles");

    return response.data.map((role: any) => ({
      id: String(role.id),
      title: role.name || role.title || "Untitled Role",
      name: role.name || role.title || "Untitled Role",
      description: role.description || "AI generated career role",
      type: "backend",
      difficulty: "Beginner to Advanced",
      skills: [],
    }));
  } catch (error) {
    console.warn("Backend roles unavailable. Using fallback roles.", error);
    return [];
  }
};
