export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  xp?: number;
  level?: number;
}