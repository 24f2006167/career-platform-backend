import API from "@/lib/api";

export interface SkillProgressItem {
  id: string;
  skill_id: string;
  skill_name: string | null;
  category: string;
  level: number;
  xp: number;
  is_verified: boolean;
}

export interface MyProgressResponse {
  total_skills: number;
  verified_skills: number;
  total_xp: number;
  readiness: number;
  skills: SkillProgressItem[];
}

export interface SaveSkillProgressPayload {
  skill_id: string;
  xp?: number;
  level?: number;
  is_verified?: boolean;
}

export interface SaveSkillProgressResponse {
  message: string;
  skill_id: string;
  level: number;
  xp: number;
  is_verified: boolean;
}

const emptyProgress = (): MyProgressResponse => ({
  total_skills: 0,
  verified_skills: 0,
  total_xp: 0,
  readiness: 0,
  skills: [],
});

const isDatabaseSkillId = (skillId: string) => {
  return skillId.length >= 20 && skillId.includes("-");
};

export const getMyProgress = async (): Promise<MyProgressResponse> => {
  try {
    const response = await API.get("/skills/my-progress");
    return response.data;
  } catch (error) {
    console.warn("Progress API unavailable:", error);
    return emptyProgress();
  }
};

export const saveSkillProgress = async (
  payload: SaveSkillProgressPayload
): Promise<SaveSkillProgressResponse> => {
  try {
    if (!payload.skill_id || !isDatabaseSkillId(payload.skill_id)) {
      return {
        message: "Static roadmap skill skipped",
        skill_id: payload.skill_id,
        level: payload.level || 1,
        xp: payload.xp || 0,
        is_verified: payload.is_verified || false,
      };
    }

    const response = await API.post("/skills/progress", payload);
    return response.data;
  } catch (error) {
    console.warn("Progress save unavailable:", error);

    return {
      message: "Progress save unavailable",
      skill_id: payload.skill_id,
      level: payload.level || 1,
      xp: payload.xp || 0,
      is_verified: payload.is_verified || false,
    };
  }
};