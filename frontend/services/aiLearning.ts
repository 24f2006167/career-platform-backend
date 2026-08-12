
import API from "@/lib/api";

export interface AILearningRequest {
  role: string;
  skill: string;
  concept: string;
  type?: string;
}

export interface PracticeTask {
  task: string;
  solution?: string;
  hint?: string;
}

export interface InterviewQuestion {
  question: string;
  answer?: string;
}

export interface ExamQuestions {
  theory?: string[];
  coding?: string[];
}

export interface AILearningResponse {
  title: string;
  summary: string;
  notes: string[];
  real_world_use: string;
  practice_tasks: PracticeTask[];
  interview_questions: (string | InterviewQuestion)[];
  coding_questions?: (string | PracticeTask)[];
  exam_questions?: ExamQuestions;
  source?: string;
  content_type?: string;
}

export interface AIChatRequest {
  role: string;
  skill: string;
  concept: string;
  question: string;
  type?: string;
}

export interface AIChatResponse {
  answer: string;
  source?: string;
}

export interface AICheckAnswerRequest {
  role: string;
  skill: string;
  concept: string;
  question: string;
  expected_solution: string;
  student_answer: string;
  attempt: number;
  type?: string;
}

export interface AICheckAnswerResponse {
  correct: boolean;
  feedback: string;
  hint: string;
  mistake?: string;
  can_reveal: boolean;
  source?: string;
}

export const generateAILearning = async (
  payload: AILearningRequest
): Promise<AILearningResponse> => {
  const response = await API.post("/ai-learning/generate", payload);
  return response.data;
};

export const askAITeacher = async (
  payload: AIChatRequest
): Promise<AIChatResponse> => {
  const response = await API.post("/ai-learning/chat", payload);
  return response.data;
};

export const checkAIPracticeAnswer = async (
  payload: AICheckAnswerRequest
): Promise<AICheckAnswerResponse> => {
  const response = await API.post("/ai-learning/check-answer", payload);
  return response.data;
};