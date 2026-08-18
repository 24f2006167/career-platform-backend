"use client";

import { use, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

interface LessonContent {
  codeSnippet: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  keyPoints: string[];
  sampleOutput: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: LessonContent;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Course {
  title: string;
  category: string;
  level: string;
  lessonsCount: number;
  description: string;
  modules: Module[];
}

const DETAILED_COURSES: Record<string, Course> = {
  "dsa-core": {
    title: "Data Structures & Algorithms Masterclass",
    category: "DSA",
    level: "Intermediate",
    lessonsCount: 42,
    description: "Master essential data structures from Arrays and HashMaps to Trees, Graphs, and Dynamic Programming.",
    modules: [
      {
        title: "Module 1: Arrays & Two-Pointers",
        lessons: [
          {
            id: "arr-1",
            title: "Array Memory Representation & Time Complexity",
            duration: "12 min",
            completed: true,
            content: {
              timeComplexity: "O(1) Access | O(N) Search/Insert",
              spaceComplexity: "O(N) Contiguous Memory",
              codeSnippet: `def compute_array_offsets(base_address, element_size, index):\n    """\n    Arrays store elements in contiguous memory locations.\n    Memory Location = Base_Address + (Index * Element_Size)\n    This guarantees O(1) random access by index.\n    """\n    return base_address + (index * element_size)\n\n# Example Test\nbase = 0x1000\nsize = 4  # 4 bytes per 32-bit int\nprint(f"Address for Index 3: {hex(compute_array_offsets(base, size, 3))}")`,
              sampleOutput: "Address for Index 3: 0x100c\nExecution time: 0.12ms\nMemory used: 4.1MB",
              explanation: "Arrays are contiguous blocks of memory where every element occupies identical byte size. Because the hardware RAM memory controller can compute the exact byte offset in constant time O(1), indexed access array[i] takes identical execution duration regardless of array length N.",
              keyPoints: [
                "Contiguous Allocation: Elements are stored in continuous memory addresses.",
                "O(1) Random Access: Indexing calculates address mathematically without iterating.",
                "O(N) Insertion/Deletion: Inserting at the beginning requires shifting N elements.",
                "Cache Locality: Sequential array traversal maximizes CPU L1/L2 cache hit rate."
              ],
              quizQuestion: {
                question: "Why does array lookup by index run in O(1) time?",
                options: [
                  "Because arrays use binary search internally",
                  "Because memory location is mathematically calculated directly via Base_Address + (Index * Size)",
                  "Because array elements are stored in a linked list structure",
                  "Because CPU registers store all array values"
                ],
                correctIndex: 1,
                explanation: "Correct! The RAM hardware address is computed instantly using simple multiplication and addition without any loop."
              }
            }
          },
          {
            id: "arr-2",
            title: "Two-Pointer Strategy: Opposite Direction vs Same Direction",
            duration: "18 min",
            completed: true,
            content: {
              timeComplexity: "O(N) Linear Time",
              spaceComplexity: "O(1) Auxiliary Space",
              codeSnippet: `def two_sum_sorted(nums, target):\n    """\n    Opposite direction two-pointer technique for sorted arrays.\n    Eliminates nested loops reducing complexity from O(N^2) to O(N).\n    """\n    left, right = 0, len(nums) - 1\n    while left < right:\n        current_sum = nums[left] + nums[right]\n        if current_sum == target:\n            return [left, right]\n        elif current_sum < target:\n            left += 1   # Increase sum\n        else:\n            right -= 1  # Decrease sum\n    return []\n\n# Test Run\nnums = [2, 7, 11, 15]\nprint(f"Indices for target 9: {two_sum_sorted(nums, 9)}")`,
              sampleOutput: "Indices for target 9: [0, 1]\nExecution time: 0.18ms\nMemory used: 4.2MB",
              explanation: "The Two-Pointer technique uses two references traversing a sequence concurrently. When searching in sorted arrays, shrinking the boundary window from opposite ends eliminates redundant pairs, achieving optimal O(N) linear runtime.",
              keyPoints: [
                "Opposite Direction: Move left index forward and right index backward to find target pair.",
                "Fast & Slow Pointers (Same Direction): Ideal for cycle detection and array deduplication.",
                "Zero Extra Memory: Operates in O(1) auxiliary space without hash tables.",
                "Prerequisite: Requires sorted sequence or monotonic property."
              ],
              quizQuestion: {
                question: "What is the time complexity of the Two-Pointer approach on a sorted array of size N?",
                options: ["O(N^2)", "O(N log N)", "O(N)", "O(1)"],
                correctIndex: 2,
                explanation: "Correct! Each pointer moves at most N steps, making the maximum total pointer steps 2N = O(N)."
              }
            }
          },
          {
            id: "arr-3",
            title: "Sliding Window Pattern: Fixed Size vs Dynamic Bounds",
            duration: "25 min",
            completed: false,
            content: {
              timeComplexity: "O(N) Single Pass",
              spaceComplexity: "O(K) Window Tracking",
              codeSnippet: `def max_sub_array_of_size_k(arr, k):\n    """\n    Fixed-size sliding window pattern.\n    Reuses previous window sum by adding new element & subtracting old element.\n    """\n    max_sum = 0\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    \n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i - k]\n        max_sum = max(max_sum, window_sum)\n        \n    return max_sum\n\n# Test Run\nprint(f"Max sum of window size 3: {max_sub_array_of_size_k([2, 1, 5, 1, 3, 2], 3)}")`,
              sampleOutput: "Max sum of window size 3: 9\nExecution time: 0.21ms\nMemory used: 4.1MB",
              explanation: "Sliding Window maintains a running buffer over contiguous elements. Rather than recomputing statistics for every contiguous sub-segment from scratch, the algorithm subtracts the exiting element and adds the entering element in constant O(1) time.",
              keyPoints: [
                "Fixed Window Size: Window size K remains constant throughout array traversal.",
                "Dynamic Window Bounds: Window expands until condition is broken, then shrinks left boundary.",
                "Avoid Duplicate Work: O(N) single pass instead of brute force O(N * K).",
                "Common Use Cases: Substring matching, maximum subarray sum, longest non-repeating substring."
              ],
              quizQuestion: {
                question: "When computing contiguous subarray sums of size K, how does sliding window optimize over brute force?",
                options: [
                  "By sorting the array first",
                  "By subtracting the outgoing element and adding incoming element in O(1) time",
                  "By using recursion",
                  "By converting array into a binary search tree"
                ],
                correctIndex: 1,
                explanation: "Correct! Reusing overlapping elements avoids re-summing K numbers for every window index."
              }
            }
          }
        ]
      },
      {
        title: "Module 2: Binary Trees & BST Invariants",
        lessons: [
          {
            id: "tree-1",
            title: "Tree Traversals: Pre-order, In-order, Post-order & Level-order",
            duration: "20 min",
            completed: false,
            content: {
              timeComplexity: "O(N) Visit Every Node",
              spaceComplexity: "O(H) Recursion Stack Height",
              codeSnippet: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder_traversal(root):\n    """In-order: Left -> Root -> Right (Produces sorted order for BST)"""
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    traverse(root)
    return result

# Test Binary Search Tree: [2, 1, 3]
root = TreeNode(2, TreeNode(1), TreeNode(3))
print(f"In-order Traversal: {inorder_traversal(root)}")`,
              sampleOutput: "In-order Traversal: [1, 2, 3]\nExecution time: 0.15ms\nMemory used: 4.3MB",
              explanation: "Tree traversals systematically visit all N nodes in a hierarchical graph. In-order traversal on a Binary Search Tree (BST) visits left subtree, root node, then right subtree, producing strictly sorted numerical order.",
              keyPoints: [
                "Pre-Order (Root, Left, Right): Ideal for copying or serializing trees.",
                "In-Order (Left, Root, Right): Retrieves elements in sorted ascending order for BSTs.",
                "Post-Order (Left, Right, Root): Ideal for tree deletion or bottom-up evaluations.",
                "Level-Order (BFS): Uses a Queue to traverse tree level by level."
              ],
              quizQuestion: {
                question: "Which traversal of a Binary Search Tree (BST) visits nodes in sorted order?",
                options: ["Pre-order", "In-order", "Post-order", "Level-order"],
                correctIndex: 1,
                explanation: "Correct! In-order traversal visits left (smaller), root, then right (larger) nodes."
              }
            }
          }
        ]
      }
    ]
  },
  "system-design-intro": {
    title: "System Design for SDE-2 & Senior Roles",
    category: "System Design",
    level: "Advanced",
    lessonsCount: 28,
    description: "Learn to architect high-throughput, fault-tolerant distributed systems with real case studies.",
    modules: [
      {
        title: "Module 1: Distributed Storage & Caching",
        lessons: [
          {
            id: "sd-1",
            title: "Consistent Hashing & Ring Partitioning",
            duration: "22 min",
            completed: true,
            content: {
              timeComplexity: "O(log N) Ring Node Lookup",
              spaceComplexity: "O(K) Virtual Node Map",
              codeSnippet: `import hashlib\n\nclass ConsistentHashRing:\n    """\n    Consistent Hashing maps both servers and keys onto a 2^32 hash ring.\n    Adding/removing a server only re-maps K/N keys instead of re-hashing all keys.\n    """\n    def __init__(self, nodes=None, replicas=3):\n        self.replicas = replicas\n        self.ring = {}\n        self.sorted_keys = []\n        for node in (nodes or []):\n            self.add_node(node)\n\n    def _hash(self, key):\n        return int(hashlib.md5(key.encode('utf-8')).hexdigest(), 16) & 0xFFFFFFFF\n\n    def add_node(self, node):\n        for i in range(self.replicas):\n            virtual_key = self._hash(f"{node}-replica-{i}")\n            self.ring[virtual_key] = node\n            self.sorted_keys.append(virtual_key)\n        self.sorted_keys.sort()\n\nring = ConsistentHashRing(["Node-A", "Node-B", "Node-C"])\nprint(f"Ring Replicas Initialized: {len(ring.sorted_keys)} Virtual Nodes")`,
              sampleOutput: "Ring Replicas Initialized: 9 Virtual Nodes\nExecution time: 0.35ms\nMemory used: 4.5MB",
              explanation: "Consistent Hashing solves the massive cache invalidation problem in distributed systems. Unlike traditional hash(key) % N which invalidates 100% of keys when N changes, Consistent Hashing only moves ~1/N of keys during node addition or failure.",
              keyPoints: [
                "2^32 Hash Ring: Key and server node locations mapped on identical hash circular range.",
                "Virtual Nodes: Prevents hot-spots and data skew by creating multiple virtual node positions per physical server.",
                "Minimal Rebalancing: Adding a server node takes load uniformly from adjacent neighbors.",
                "Used In: Cassandra, DynamoDB, Memcached routing, CDN edge distribution."
              ],
              quizQuestion: {
                question: "Why is Consistent Hashing preferred over traditional modulo hashing (key % N)?",
                options: [
                  "Modulo hashing requires double the storage",
                  "Consistent Hashing minimizes key movement (~1/N keys remapped) when servers join or fail",
                  "Consistent Hashing turns all database queries into O(1)",
                  "Consistent Hashing disables caching"
                ],
                correctIndex: 1,
                explanation: "Correct! Adding or removing a node in Consistent Hashing only affects adjacent ring segments instead of re-hashing all keys."
              }
            }
          }
        ]
      }
    ]
  }
};

export default function CourseDetailsPage({ params }: { params: Promise<{ trackId: string }> }) {
  const resolvedParams = use(params);
  const trackId = resolvedParams.trackId;
  const course = DETAILED_COURSES[trackId] || DETAILED_COURSES["dsa-core"];

  const [activeLesson, setActiveLesson] = useState<Lesson>(course.modules[0].lessons[0]);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({ "arr-1": true, "arr-2": true });

  const handleRunCode = () => {
    setRunning(true);
    setConsoleOutput(null);
    setTimeout(() => {
      setConsoleOutput(activeLesson.content.sampleOutput);
      setRunning(false);
    }, 400);
  };

  const handleSelectLesson = (les: Lesson) => {
    setActiveLesson(les);
    setConsoleOutput(null);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
  };

  const handleQuizCheck = () => {
    setQuizSubmitted(true);
  };

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentQuiz = activeLesson.content.quizQuestion;
  const isQuizCorrect = selectedQuizIndex === currentQuiz.correctIndex;

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        {/* Top Navbar */}
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/learn" style={{ textDecoration: "none", color: "var(--nex-text-2)", fontSize: "14px", fontWeight: "600" }}>
              ← Learn Hub
            </Link>
            <span style={{ color: "var(--nex-border)" }}>/</span>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>{course.title}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <span className="badge badge-primary" style={{ fontSize: "11px" }}>{course.category}</span>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Header Banner */}
          <div className="glass glow-primary" style={{ padding: "24px", borderRadius: "18px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary" style={{ fontSize: "11px" }}>Level: {course.level}</span>
              <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>• {course.lessonsCount} Lessons</span>
            </div>
            <h1 style={{ fontSize: "26px", fontWeight: "900", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              {course.title}
            </h1>
            <p style={{ color: "var(--nex-text-2)", fontSize: "14px", maxWidth: "700px", lineHeight: "1.6" }}>
              {course.description}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "20px" }}>
            {/* Sidebar Modules List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {course.modules.map((mod: Module, idx: number) => (
                <div key={idx} className="glass" style={{ padding: "16px", borderRadius: "14px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#a5b4fc", marginBottom: "10px" }}>
                    {mod.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {mod.lessons.map((les: Lesson) => {
                      const isDone = !!completedLessons[les.id];
                      const isActive = activeLesson.id === les.id;
                      return (
                        <button
                          key={les.id}
                          onClick={() => handleSelectLesson(les)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "10px 12px", borderRadius: "10px",
                            border: isActive ? "1px solid var(--nex-primary)" : "1px solid transparent",
                            background: isActive ? "rgba(99,102,241,0.15)" : "var(--nex-surface)",
                            cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s"
                          }}
                        >
                          <div>
                            <div style={{
                              fontSize: "13px",
                              fontWeight: isActive ? "700" : "500",
                              color: isActive ? "#a5b4fc" : "var(--nex-text-1)",
                              display: "flex", alignItems: "center", gap: "6px"
                            }}>
                              <span style={{ color: isDone ? "var(--nex-success)" : "var(--nex-text-3)", fontSize: "12px" }}>
                                {isDone ? "✓" : "○"}
                              </span>
                              <span>{les.title}</span>
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginTop: "3px", paddingLeft: "18px" }}>
                              ⏱ {les.duration}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Lesson Card */}
              <div className="glass" style={{ padding: "28px", borderRadius: "18px" }}>
                {/* Title & Badges */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--nex-text-1)", marginBottom: "8px" }}>
                      {activeLesson.title}
                    </h2>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span className="badge badge-primary" style={{ fontSize: "11px" }}>
                        ⏱ {activeLesson.duration}
                      </span>
                      <span style={{
                        fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "999px",
                        background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.25)"
                      }}>
                        ⚡ {activeLesson.content.timeComplexity}
                      </span>
                      <span style={{
                        fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "999px",
                        background: "rgba(139,92,246,0.12)", color: "#c084fc", border: "1px solid rgba(139,92,246,0.25)"
                      }}>
                        💾 {activeLesson.content.spaceComplexity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleComplete(activeLesson.id)}
                    style={{
                      padding: "8px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600",
                      background: completedLessons[activeLesson.id] ? "rgba(16,185,129,0.15)" : "var(--nex-surface)",
                      color: completedLessons[activeLesson.id] ? "var(--nex-success)" : "var(--nex-text-2)",
                      border: `1px solid ${completedLessons[activeLesson.id] ? "rgba(16,185,129,0.3)" : "var(--nex-border)"}`,
                      cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    {completedLessons[activeLesson.id] ? "✓ Completed" : "Mark as Done"}
                  </button>
                </div>

                {/* Explanation text */}
                <div style={{ fontSize: "14px", color: "var(--nex-text-2)", lineHeight: "1.7", marginBottom: "20px" }}>
                  {activeLesson.content.explanation}
                </div>

                {/* Code Snippet Box */}
                <div style={{
                  borderRadius: "14px", background: "#090b14",
                  border: "1px solid rgba(99,102,241,0.25)", overflow: "hidden", marginBottom: "20px"
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 16px", background: "rgba(15,17,26,0.9)", borderBottom: "1px solid var(--nex-border)"
                  }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#a5b4fc", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>📄</span> Python 3 Implementation
                    </div>
                    <button
                      onClick={handleRunCode}
                      disabled={running}
                      className="btn-primary btn-sm"
                      style={{ padding: "4px 12px", fontSize: "12px" }}
                    >
                      {running ? "▶ Executing..." : "▶ Run Code Sample"}
                    </button>
                  </div>

                  <pre style={{
                    padding: "18px", margin: 0,
                    fontFamily: "Fira Code, monospace, consolas", fontSize: "13px", lineHeight: "1.6",
                    color: "#e0e7ff", whiteSpace: "pre-wrap", overflowX: "auto"
                  }}>
                    {activeLesson.content.codeSnippet}
                  </pre>
                </div>

                {/* Console Output */}
                {consoleOutput && (
                  <div style={{
                    padding: "14px 16px", borderRadius: "12px",
                    background: "#04060c", border: "1px solid rgba(16,185,129,0.3)",
                    marginBottom: "20px", fontFamily: "Fira Code, monospace", fontSize: "12px", color: "#34d399"
                  }}>
                    <div style={{ fontSize: "11px", color: "var(--nex-text-3)", marginBottom: "4px", textTransform: "uppercase" }}>
                      Terminal Output:
                    </div>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{consoleOutput}</pre>
                  </div>
                )}

                {/* Key Points Checklist */}
                <div style={{
                  padding: "18px", borderRadius: "12px",
                  background: "var(--nex-surface)", border: "1px solid var(--nex-border)", marginBottom: "24px"
                }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--nex-text-1)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    🎯 Key Architecture Takeaways
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {activeLesson.content.keyPoints.map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--nex-text-2)" }}>
                        <span style={{ color: "var(--nex-primary)", fontWeight: "700" }}>✦</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Knowledge Verification Quiz */}
                <div style={{
                  padding: "20px", borderRadius: "14px",
                  background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "16px" }}>🧠</span>
                    <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--nex-text-1)" }}>
                      Knowledge Check (+25 XP)
                    </h3>
                  </div>

                  <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--nex-text-1)", marginBottom: "14px" }}>
                    {currentQuiz.question}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                    {currentQuiz.options.map((opt, i) => {
                      const isSelected = selectedQuizIndex === i;
                      let borderColor = "var(--nex-border)";
                      let bg = "var(--nex-surface)";

                      if (isSelected) {
                        borderColor = "var(--nex-primary)";
                        bg = "rgba(99,102,241,0.15)";
                      }
                      if (quizSubmitted) {
                        if (i === currentQuiz.correctIndex) {
                          borderColor = "var(--nex-success)";
                          bg = "rgba(16,185,129,0.15)";
                        } else if (isSelected && !isQuizCorrect) {
                          borderColor = "var(--nex-danger)";
                          bg = "rgba(239,68,68,0.15)";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => { setSelectedQuizIndex(i); setQuizSubmitted(false); }}
                          style={{
                            padding: "10px 14px", borderRadius: "10px",
                            border: `1px solid ${borderColor}`, background: bg,
                            textAlign: "left", fontSize: "13px", color: "var(--nex-text-1)",
                            cursor: "pointer", transition: "all 0.2s"
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selectedQuizIndex !== null && !quizSubmitted && (
                    <button onClick={handleQuizCheck} className="btn-primary btn-sm">
                      Check Answer
                    </button>
                  )}

                  {quizSubmitted && (
                    <div style={{
                      padding: "12px 14px", borderRadius: "10px", fontSize: "13px",
                      background: isQuizCorrect ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                      border: `1px solid ${isQuizCorrect ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                      color: isQuizCorrect ? "#34d399" : "#fca5a5"
                    }}>
                      <div style={{ fontWeight: "700", marginBottom: "4px" }}>
                        {isQuizCorrect ? "🎉 Correct! +25 XP Earned" : "❌ Incorrect"}
                      </div>
                      <div>{currentQuiz.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
