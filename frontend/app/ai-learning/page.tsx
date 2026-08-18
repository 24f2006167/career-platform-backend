"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import {
  AILearningResponse,
  PracticeTask,
  askAITeacher,
  generateAILearning,
  checkAIPracticeAnswer,
} from "@/services/aiLearning";

import { saveSkillProgress } from "@/services/skillProgress";

type TabType = "notes" | "practice" | "interview" | "exam" | "ask";

function AILearningContent() {
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "";
  const skill = searchParams.get("skill") || "";
  const skillId = searchParams.get("skill_id") || "";
  const concept = searchParams.get("concept") || "";
  const type = searchParams.get("type") || "learning";

  const [activeTab, setActiveTab] = useState<TabType>("notes");
  const [content, setContent] = useState<AILearningResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [practiceMessage, setPracticeMessage] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [checkingAnswer, setCheckingAnswer] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError("");
        setProgressMessage("");

        if (!role || !skill || !concept) {
          setError(
            "Missing role, skill, or concept. Please select a roadmap concept first."
          );
          return;
        }

        const result = await generateAILearning({
          role,
          skill,
          concept,
          type,
        });

        setContent(result);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to generate learning content. Please login again or try later."
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [role, skill, concept, type]);

  const practiceTasks = useMemo<PracticeTask[]>(() => {
    return content?.practice_tasks || [];
  }, [content]);

  const currentTask = practiceTasks[currentTaskIndex];

  const markConceptCompleted = async () => {
    if (!skillId) {
      setProgressMessage(
        "Skill ID missing. Open this page from dashboard concept card."
      );
      return;
    }

    const completedKey = "completedConcepts";
    const oldCompleted = JSON.parse(localStorage.getItem(completedKey) || "[]");

    const alreadyDone = oldCompleted.some(
      (item: { role?: string; skill?: string; skillId?: string; concept?: string }) =>
        item.role === role &&
        item.skill === skill &&
        item.skillId === skillId &&
        item.concept === concept
    );

    if (alreadyDone) {
      setProgressMessage("This concept is already completed.");
      return;
    }

    await saveSkillProgress({
      skill_id: skillId,
      xp: 50,
      level: 2,
      is_verified: true,
    });

    const conceptData = {
      role,
      skill,
      skillId,
      concept,
      type,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      completedKey,
      JSON.stringify([...oldCompleted, conceptData])
    );

    setProgressMessage("Concept completed successfully: +50 XP saved.");
  };

  const checkPracticeAnswer = async () => {
    if (!currentTask) return;

    if (!studentAnswer.trim()) {
      setPracticeMessage("Write your answer first, then submit.");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    try {
      setCheckingAnswer(true);
      setPracticeMessage("AI is checking your answer...");

      const result = await checkAIPracticeAnswer({
        role,
        skill,
        concept,
        question: currentTask.task,
        expected_solution: currentTask.solution || "",
        student_answer: studentAnswer,
        attempt: nextAttempts,
        type,
      });

      if (result.correct) {
        const updatedCompletedTasks = completedTasks.includes(currentTaskIndex)
          ? completedTasks
          : [...completedTasks, currentTaskIndex];

        setCompletedTasks(updatedCompletedTasks);
        setPracticeMessage(`Correct! ${result.feedback}`);
        setShowSolution(true);

        if (skillId) {
          await saveSkillProgress({
            skill_id: skillId,
            xp: 25,
            is_verified: false,
          });

          setProgressMessage("Practice answer correct: +25 XP saved.");
        }

        if (
          practiceTasks.length > 0 &&
          updatedCompletedTasks.length >= practiceTasks.length
        ) {
          await markConceptCompleted();
        }

        return;
      }

      if (result.can_reveal || nextAttempts >= 3) {
        setPracticeMessage(
          `Not correct yet.\n\n${result.feedback}\n\nMistake: ${
            result.mistake || "Your answer is missing important logic."
          }\n\nYou can now reveal the solution.`
        );
        setShowSolution(false);
        return;
      }

      setPracticeMessage(
        `Attempt ${nextAttempts}/3\n\n${result.feedback}\n\nHint: ${result.hint}`
      );
    } catch (err) {
      console.error(err);
      setPracticeMessage(
        "AI checking failed. Please check backend route /ai-learning/check-answer."
      );
    } finally {
      setCheckingAnswer(false);
    }
  };

  const goNextTask = () => {
    setStudentAnswer("");
    setAttempts(0);
    setPracticeMessage("");
    setShowSolution(false);

    setCurrentTaskIndex((prev) =>
      prev + 1 < practiceTasks.length ? prev + 1 : prev
    );
  };

  const handleAskAI = async () => {
    try {
      if (!question.trim()) return;

      setAsking(true);
      setAiAnswer("");

      const result = await askAITeacher({
        role,
        skill,
        concept,
        question,
        type,
      });

      setAiAnswer(result.answer);
    } catch (err) {
      console.error(err);
      setAiAnswer("Unable to get AI answer. Please check login token and backend.");
    } finally {
      setAsking(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-purple-500/20 bg-white/5 p-10">
          Generating AI learning book...
        </div>
      </main>
    );
  }

  if (error || !content) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-red-500/30 bg-red-500/10 p-10 text-red-200">
          {error || "No content found."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-3xl font-black tracking-tight">
          Nexvora AI
        </Link>

        <Link
          href="/dashboard/candidate"
          className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-purple-200 hover:bg-purple-500/20"
        >
          Dashboard
        </Link>
      </nav>

      <section className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-purple-500/10 to-black p-8 shadow-2xl">
        <p className="text-sm font-semibold text-purple-300">
          AI Learning Studio
        </p>

        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          {content.title}
        </h1>

        <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-300">
          {content.summary}
        </p>

        {progressMessage && (
          <p className="mt-5 inline-flex rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-200">
            {progressMessage}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/candidate"
            className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-6 py-3 font-bold text-purple-200 hover:bg-purple-500/20"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-[290px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-5">
          {[
            ["notes", "Book Notes"],
            ["practice", "Practice Playground"],
            ["interview", "Interview"],
            ["exam", "Exam"],
            ["ask", "Ask AI"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabType)}
              className={`mb-3 w-full rounded-2xl px-4 py-3 text-left transition ${
                activeTab === key
                  ? "bg-white text-black"
                  : "bg-black/40 text-gray-300 hover:bg-purple-500/10"
              }`}
            >
              {label}
            </button>
          ))}

          <div className="mt-6 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
            <p className="text-sm font-bold text-purple-200">Current Topic</p>
            <p className="mt-3 text-sm text-gray-300">{role}</p>
            <p className="text-sm text-gray-300">{skill}</p>
            <p className="text-sm text-gray-300">{concept}</p>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          {activeTab === "notes" && (
            <section>
              <h2 className="text-4xl font-black">Book Notes</h2>

              <div className="mt-8 space-y-5">
                {content.notes.map((note, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-black/40 p-5 leading-8 text-gray-300"
                  >
                    <p className="mb-2 text-sm font-bold text-purple-300">
                      Concept Point {index + 1}
                    </p>
                    {note}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-purple-400/20 bg-purple-500/10 p-6">
                <h3 className="text-2xl font-bold">Real World Use</h3>
                <p className="mt-3 leading-8 text-gray-300">
                  {content.real_world_use}
                </p>
              </div>
            </section>
          )}

          {activeTab === "practice" && (
            <section>
              <h2 className="text-4xl font-black">Practice Playground</h2>

              {!currentTask ? (
                <p className="mt-6 text-gray-400">No practice task found.</p>
              ) : (
                <div className="mt-8 rounded-3xl border border-purple-400/20 bg-black/40 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold">
                      Question {currentTaskIndex + 1}
                    </h3>

                    <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                      Attempts: {attempts}/3
                    </span>
                  </div>

                  <p className="mt-5 text-lg leading-8 text-gray-200">
                    {currentTask.task}
                  </p>

                  <textarea
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="mt-6 min-h-40 w-full rounded-3xl border border-white/10 bg-black p-5 text-white outline-none focus:border-purple-400"
                  />

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={checkPracticeAnswer}
                      disabled={checkingAnswer}
                      className="rounded-2xl bg-white px-6 py-3 font-bold text-black disabled:opacity-50"
                    >
                      {checkingAnswer ? "Checking..." : "Check Answer"}
                    </button>

                    <button
                      onClick={() => setShowSolution(true)}
                      className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-6 py-3 font-bold text-purple-200"
                    >
                      Reveal Solution
                    </button>

                    <button
                      onClick={goNextTask}
                      disabled={currentTaskIndex + 1 >= practiceTasks.length}
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-gray-200 disabled:opacity-40"
                    >
                      Next Task
                    </button>
                  </div>

                  {practiceMessage && (
                    <div className="mt-6 whitespace-pre-wrap rounded-3xl border border-blue-400/20 bg-blue-500/10 p-5 text-blue-100">
                      {practiceMessage}
                    </div>
                  )}

                  {showSolution && currentTask.solution && (
                    <div className="mt-6 rounded-3xl border border-green-400/20 bg-green-500/10 p-5">
                      <p className="font-bold text-green-200">Solution</p>
                      <p className="mt-3 whitespace-pre-wrap leading-8 text-gray-200">
                        {currentTask.solution}
                      </p>
                    </div>
                  )}

                  <p className="mt-5 text-sm text-gray-400">
                    Completed tasks: {completedTasks.length}/{practiceTasks.length}
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === "interview" && (
            <section>
              <h2 className="text-4xl font-black">Interview Questions</h2>

              <div className="mt-8 space-y-5">
                {content.interview_questions.map((item, index) => {
                  const q = typeof item === "string" ? item : item.question;
                  const a = typeof item === "string" ? "" : item.answer;

                  return (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-black/40 p-5"
                    >
                      <p className="font-bold text-white">
                        Q{index + 1}. {q}
                      </p>

                      {a && (
                        <p className="mt-3 leading-8 text-gray-300">{a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === "exam" && (
            <section>
              <h2 className="text-4xl font-black">Exam Practice</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                  <h3 className="text-2xl font-bold">Theory</h3>
                  <ul className="mt-5 list-disc space-y-3 pl-5 text-gray-300">
                    {(content.exam_questions?.theory || []).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                  <h3 className="text-2xl font-bold">Coding / Practical</h3>
                  <ul className="mt-5 list-disc space-y-3 pl-5 text-gray-300">
                    {(content.exam_questions?.coding || []).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activeTab === "ask" && (
            <section>
              <p className="text-sm text-purple-300">AI Doubt Solver</p>

              <h2 className="mt-3 text-4xl font-black">
                Ask Anything About This Topic
              </h2>

              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask your doubt about ${concept}...`}
                className="mt-8 min-h-40 w-full rounded-3xl border border-white/10 bg-black p-5 text-white outline-none focus:border-purple-400"
              />

              <button
                onClick={handleAskAI}
                disabled={asking}
                className="mt-5 rounded-2xl bg-white px-7 py-3 font-bold text-black disabled:opacity-50"
              >
                {asking ? "AI is solving..." : "Ask AI"}
              </button>

              {aiAnswer && (
                <div className="mt-8 rounded-3xl border border-purple-400/20 bg-purple-500/10 p-6">
                  <p className="font-bold text-purple-200">AI Answer</p>
                  <p className="mt-4 whitespace-pre-wrap leading-8 text-gray-200">
                    {aiAnswer}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default function AILearningPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading AI Learning...</div>}>
      <AILearningContent />
    </Suspense>
  );
}