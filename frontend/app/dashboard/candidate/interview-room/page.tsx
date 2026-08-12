"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import API from "@/lib/api";

type Question = {
  id: string;
  role: string;
  skill: string;
  question_type: string;
  answer_ui: string;
  difficulty: string;
  company_tag?: string;
  title: string;
  question: string;
  given_data?: any;
};

type RoleOption = {
  role: string;
  skills: string[];
};

const ROLE_SKILLS: Record<string, string[]> = {
  "Frontend Developer": [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Git",
    "UI/UX Basics",
  ],
  "Data Analyst": [
    "Excel",
    "SQL",
    "Python",
    "Pandas",
    "Statistics",
    "Data Visualization",
  ],
};

const DEFAULT_ROLE = "Frontend Developer";

function InterviewRoomContent() {
  const searchParams = useSearchParams();

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [role, setRole] = useState(DEFAULT_ROLE);
  const [skill, setSkill] = useState("HTML/CSS");
  const [difficulty, setDifficulty] = useState("medium");
  const [totalQuestions, setTotalQuestions] = useState(5);

  const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("javascript");

  const [currentNo, setCurrentNo] = useState(0);
  const [totalNo, setTotalNo] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRoleSkills = useMemo(() => {
    const exact = ROLE_SKILLS[role];
    if (exact?.length) return exact;

    const apiRole = roles.find(
      (r) => r.role.toLowerCase() === role.toLowerCase()
    );

    return apiRole?.skills?.length ? apiRole.skills : ROLE_SKILLS[DEFAULT_ROLE];
  }, [role, roles]);

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (selectedRoleSkills.length > 0 && !selectedRoleSkills.includes(skill)) {
      setSkill(selectedRoleSkills[0]);
    }
  }, [selectedRoleSkills, skill]);

  async function loadRoles() {
    try {
      const res = await API.get("/interview/roles");
      const apiRoles: RoleOption[] = res.data.roles || [];

      const cleanedRoles = apiRoles.map((r) => ({
        role: r.role,
        skills: ROLE_SKILLS[r.role] || r.skills || [],
      }));

      const mergedRoles: RoleOption[] = [
        ...Object.keys(ROLE_SKILLS).map((roleName) => ({
          role: roleName,
          skills: ROLE_SKILLS[roleName],
        })),
        ...cleanedRoles.filter((r) => !ROLE_SKILLS[r.role]),
      ];

      setRoles(mergedRoles);

      const urlRole = searchParams.get("role");
      const urlSkill = searchParams.get("skill");

      const savedRole =
        urlRole ||
        localStorage.getItem("selectedRole") ||
        localStorage.getItem("selectedCareerRole") ||
        localStorage.getItem("role") ||
        DEFAULT_ROLE;

      const matchedRole =
        mergedRoles.find(
          (r) => r.role.toLowerCase() === savedRole.toLowerCase()
        )?.role || DEFAULT_ROLE;

      const skills = ROLE_SKILLS[matchedRole] || ROLE_SKILLS[DEFAULT_ROLE];

      setRole(matchedRole);
      setSkill(urlSkill && skills.includes(urlSkill) ? urlSkill : skills[0]);
    } catch (err) {
      console.error("Role load error:", err);

      const urlRole = searchParams.get("role") || DEFAULT_ROLE;
      const finalRole = ROLE_SKILLS[urlRole] ? urlRole : DEFAULT_ROLE;
      const skills = ROLE_SKILLS[finalRole];

      setRoles(
        Object.keys(ROLE_SKILLS).map((roleName) => ({
          role: roleName,
          skills: ROLE_SKILLS[roleName],
        }))
      );

      setRole(finalRole);
      setSkill(skills[0]);
    }
  }

  function handleRoleChange(newRole: string) {
    setRole(newRole);
    setSkill((ROLE_SKILLS[newRole] || ROLE_SKILLS[DEFAULT_ROLE])[0]);
    resetInterview();
  }

  function resetInterview() {
    setSessionId("");
    setQuestion(null);
    setAnswer("");
    setFeedback("");
    setHint("");
    setCompleted(false);
    setCurrentNo(0);
    setTotalNo(0);
  }

  async function startInterview() {
    if (!role || !skill) {
      alert("Please select role and roadmap skill.");
      return;
    }

    setLoading(true);
    setCompleted(false);
    setFeedback("");
    setHint("");
    setAnswer("");

    try {
      const res = await API.post("/interview/start", {
        role,
        skill,
        difficulty,
        total_questions: totalQuestions,
        roadmap_skills: selectedRoleSkills,
        random_seed: `${Date.now()}-${Math.random()}`,
      });

      setSessionId(res.data.session_id);
      setQuestion(res.data.question);
      setCurrentNo(res.data.current_question_number || 1);
      setTotalNo(res.data.total_questions || totalQuestions);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Could not start interview.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!sessionId || !question) return;

    if (!answer.trim()) {
      alert("Please write your answer first.");
      return;
    }

    setLoading(true);
    setFeedback("");
    setHint("");

    try {
      const res = await API.post("/interview/submit-answer", {
        session_id: sessionId,
        question_id: question.id,
        answer,
        language,
      });

      setFeedback(res.data.feedback || "");

      if (res.data.hint) setHint(res.data.hint);

      if (res.data.completed) {
        setCompleted(true);
        setQuestion(null);
        setAnswer("");
        setCurrentNo(totalNo);
        return;
      }

      if (res.data.is_correct && res.data.next_question) {
        setQuestion(res.data.next_question);
        setAnswer("");
        setHint("");
        setCurrentNo(res.data.current_question_number);
      }
    } catch (err: any) {
      alert(err.response?.data?.detail || "Submit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <section>
        <p className="text-purple-300 font-bold">AI Interview Practice</p>
        <h1 className="mt-2 text-5xl font-black text-white">Interview Room</h1>
        <p className="mt-3 text-zinc-400">
          Questions are generated only from selected role roadmap skills.
        </p>
      </section>

      <section className="rounded-[2rem] border border-purple-500/40 bg-black/50 p-8">
        <div className="grid gap-5 md:grid-cols-4">
          <Field label="Job Role">
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="input"
            >
              {roles.map((r) => (
                <option key={r.role} value={r.role}>
                  {r.role}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Roadmap Skill / Concept">
            <select
              value={skill}
              onChange={(e) => {
                setSkill(e.target.value);
                resetInterview();
              }}
              className="input"
            >
              {selectedRoleSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Difficulty">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="input"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </Field>

          <Field label="Questions">
            <select
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(Number(e.target.value))}
              className="input"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </Field>
        </div>

        <button
          onClick={startInterview}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-purple-600 py-4 font-black text-white hover:bg-purple-500 disabled:opacity-60"
        >
          {loading ? "Starting..." : "Start Random Interview"}
        </button>
      </section>

      {completed && (
        <div className="rounded-3xl border border-green-500/30 bg-green-500/10 p-6 text-green-200">
          Interview completed successfully.
        </div>
      )}

      {question && (
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-purple-300">
                Question {currentNo}/{totalNo} • {question.skill}
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                {question.title}
              </h2>
            </div>
            <span className="h-fit rounded-full border border-purple-500/40 px-4 py-2 text-purple-200">
              {question.difficulty}
            </span>
          </div>

          <p className="mt-6 whitespace-pre-wrap text-lg text-zinc-300">
            {question.question}
          </p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="mt-6 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black p-5 text-white outline-none focus:border-purple-500"
          />

          <div className="mt-5 flex flex-wrap gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input max-w-[220px]"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="sql">SQL</option>
              <option value="text">Text</option>
            </select>

            <button
              onClick={submitAnswer}
              disabled={loading}
              className="rounded-2xl bg-purple-600 px-8 py-3 font-black text-white hover:bg-purple-500 disabled:opacity-60"
            >
              {loading ? "Checking..." : "Submit Answer"}
            </button>
          </div>
        </section>
      )}

      {feedback && (
        <div className="rounded-3xl border border-purple-500/30 bg-purple-500/10 p-6 text-purple-100">
          <h3 className="font-black">Feedback</h3>
          <p className="mt-2 whitespace-pre-wrap">{feedback}</p>
        </div>
      )}

      {hint && (
        <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-yellow-100">
          <h3 className="font-black">Hint</h3>
          <p className="mt-2 whitespace-pre-wrap">{hint}</p>
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #000;
          padding: 0.9rem 1rem;
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: rgb(168, 85, 247);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

export default function InterviewRoomPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading Interview Room...</div>}>
      <InterviewRoomContent />
    </Suspense>
  );
}