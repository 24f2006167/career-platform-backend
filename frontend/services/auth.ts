import API from "@/lib/api";
import { User, UserRole } from "@/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  full_name: string;
  username: string;
  email: string;
  password: string;
  role: Exclude<UserRole, "admin">;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterResponse {
  message: string;
  user_id: string;
  role: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await API.post("/auth/login", {
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  });

  return response.data;
};

export const signupUser = async (
  payload: SignupPayload
): Promise<RegisterResponse> => {
  const response = await API.post("/auth/register", {
    full_name: payload.full_name.trim(),
    username: payload.username.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    role: payload.role,
  });

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await API.get("/auth/me");
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};