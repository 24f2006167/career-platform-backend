import API from "@/lib/api";

export interface Skill {
  id: string;
  name: string;
  description?: string | null;
  category_id: string;
  category?: string | null;
}

export interface UserSkill {
  id: string;
  skill_id: string;
  skill_name?: string | null;
  level: number;
  xp: number;
  is_verified: boolean;
}

export interface AddSkillPayload {
  skill_id: string;
}

export interface UpdateUserSkillPayload {
  xp?: number;
  level?: number;
  is_verified?: boolean;
}

export const getSkills = async (): Promise<Skill[]> => {
  const response = await API.get("/skills");
  return response.data;
};

export const getMySkills = async (): Promise<UserSkill[]> => {
  const response = await API.get("/skills/me");
  return response.data;
};

export const addSkillToMe = async (
  payload: AddSkillPayload
): Promise<{ message: string; user_skill_id: string }> => {
  const response = await API.post("/skills/me", payload);
  return response.data;
};

export const updateMySkill = async (
  skillId: string,
  payload: UpdateUserSkillPayload
): Promise<{ message: string; xp: number; level: number }> => {
  const response = await API.put(`/skills/me/${skillId}`, payload);
  return response.data;
};