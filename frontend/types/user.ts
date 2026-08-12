export type UserRole = "candidate" | "admin" | "recruiter";

export interface User {
  id: string;
  full_name: string;
  username?: string;
  email: string;
  role?: UserRole | string;
  role_id?: string;
  xp?: number;
  level?: number;
  streak?: number;
  is_verified?: boolean;
  is_active?: boolean;
  profile_image?: string | null;
  bio?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  resume_url?: string | null;
}