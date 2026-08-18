"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";

/* ─────────────── TYPES ─────────────── */
interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  hasArticle: boolean;
  hasVideo: boolean;
  timer: string;
  level: "Beginner" | "Pro";
}

interface DaySheet {
  day: number;
  title: string;
  problems: Problem[];
}

interface DPSection {
  title: string;
  problems: Problem[];
}

/* ─────────────── HELPERS ─────────────── */
function p(
  id: string,
  title: string,
  difficulty: "Easy" | "Medium" | "Hard",
  companies: string[],
  hasArticle = true,
  level: "Beginner" | "Pro" = "Beginner"
): Problem {
  return {
    id,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    difficulty,
    companies,
    hasArticle,
    hasVideo: true,
    timer: "30Min",
    level,
  };
}

/* ─────────────── DSA SHEET DATA (34 Days) ─────────────── */
const DSA_SHEET: DaySheet[] = [
  {
    day: 1, title: "Day 1 : Array (Part 1)",
    problems: [
      p("d1p1", "Majority Element", "Easy", ["Amazon", "Google"]),
      p("d1p2", "Repeat & missing number", "Easy", ["Amazon"]),
      p("d1p3", "Merge 2 sorted array without extra space", "Medium", ["Qualcomm", "Google"], false),
      p("d1p4", "Single Number", "Easy", ["Apple", "Amazon", "Meta"]),
      p("d1p5", "Stock Buy & Sell", "Easy", ["Google", "Meta"], false),
      p("d1p6", "Pow (x^n)", "Medium", ["LinkedIn", "Amazon"], false, "Pro"),
    ],
  },
  {
    day: 2, title: "Day 2 : Array (Part 2)",
    problems: [
      p("d2p1", "Kadane's Algorithm", "Medium", ["Microsoft", "Meta"], true, "Pro"),
      p("d2p2", "Container with most water", "Medium", ["Amazon", "Zepto"]),
      p("d2p3", "Sort array of 0s 1s & 2s", "Medium", ["Myntra", "Amazon"]),
      p("d2p4", "3Sum", "Medium", ["Myntra", "Google"], true, "Pro"),
      p("d2p5", "4Sum", "Medium", ["Amazon", "Uber"], true, "Pro"),
      p("d2p6", "Search in 2d matrix", "Medium", ["Microsoft", "Google"], false),
    ],
  },
  {
    day: 3, title: "Day 3 : Array (Part 3)",
    problems: [
      p("d3p1", "Next permutation", "Medium", ["Google", "Ola", "Amazon"], true, "Pro"),
      p("d3p2", "Merge overlapping intervals", "Medium", ["Google"]),
      p("d3p3", "Longest substring without repeating", "Medium", ["Amazon", "Google"]),
      p("d3p4", "Set matrix zeroes", "Medium", ["Amazon"]),
      p("d3p5", "Word search", "Medium", ["Ola", "Google"]),
      p("d3p6", "Product of array except self", "Medium", ["Ola", "Google"]),
    ],
  },
  {
    day: 4, title: "Day 4 : Array (Part 4)",
    problems: [
      p("d4p1", "Subarray sum equals k", "Medium", ["Microsoft", "Google"], true, "Pro"),
      p("d4p2", "Find Duplicate", "Medium", ["Apple", "Amazon"]),
      p("d4p3", "Count Inversions", "Hard", ["Google", "Amazon"]),
      p("d4p4", "Spiral Matrix", "Medium", ["Zepto", "Apple"], false),
      p("d4p5", "Search in Sorted matrix II", "Medium", ["Google", "Amazon"], false),
    ],
  },
  {
    day: 5, title: "Day 5 : Array (Part 5)",
    problems: [
      p("d5p1", "Trapping Rainwater", "Hard", ["Samsung"]),
      p("d5p2", "Sliding Window Maximum", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d5p3", "Largest Rectangle in a Histogram", "Hard", ["Google", "Amazon"], true, "Pro"),
      p("d5p4", "Reverse Pairs", "Hard", ["Amazon"]),
    ],
  },
  {
    day: 6, title: "Day 6 : Strings (Part 1)",
    problems: [
      p("d6p1", "Valid Palindrome", "Easy", ["Amazon", "Apple"]),
      p("d6p2", "Valid Anagram", "Easy", ["Dunzo", "Microsoft"]),
      p("d6p3", "Reverse Words in String", "Medium", ["Amazon", "LinkedIn"], true, "Pro"),
      p("d6p4", "Remove All Occurrences", "Medium", ["Google"], false),
      p("d6p5", "Permutation in String", "Medium", ["Amazon", "Uber"]),
      p("d6p6", "String Compression", "Medium", ["Google", "Amazon"]),
    ],
  },
  {
    day: 7, title: "Day 7 : Strings (Part 2)",
    problems: [
      p("d7p1", "Longest Palindromic Substring", "Medium", ["Amazon", "Microsoft"]),
      p("d7p2", "Minimum Window Substring", "Hard", ["Amazon", "Meta"], true, "Pro"),
      p("d7p3", "Count and Say", "Medium", ["Amazon"]),
      p("d7p4", "Group Anagrams", "Medium", ["Amazon", "Uber"]),
      p("d7p5", "Encode and Decode Strings", "Medium", ["Google"]),
      p("d7p6", "Find All Anagrams in a String", "Medium", ["Meta", "Amazon"]),
    ],
  },
  {
    day: 8, title: "Day 8 : Binary Search",
    problems: [
      p("d8p1", "Binary Search", "Easy", ["Google", "Amazon", "Meta"]),
      p("d8p2", "Search in Rotated Sorted Array", "Medium", ["Amazon", "Microsoft"]),
      p("d8p3", "Find Minimum in Rotated Sorted Array", "Medium", ["Microsoft", "Apple"]),
      p("d8p4", "Koko Eating Bananas", "Medium", ["Amazon"]),
      p("d8p5", "Capacity to Ship Packages", "Medium", ["Amazon"]),
      p("d8p6", "Median of Two Sorted Arrays", "Hard", ["Google", "Amazon"], true, "Pro"),
      p("d8p7", "Aggressive Cows / Book Allocation", "Hard", ["Amazon", "Adobe"], true, "Pro"),
    ],
  },
  {
    day: 9, title: "Day 9 : Recursion & Backtracking",
    problems: [
      p("d9p1", "Subsets", "Medium", ["Amazon", "Google"]),
      p("d9p2", "Subsets II", "Medium", ["Amazon", "Google"]),
      p("d9p3", "Permutations", "Medium", ["Amazon", "LinkedIn"]),
      p("d9p4", "Combination Sum", "Medium", ["Amazon"]),
      p("d9p5", "Combination Sum II", "Medium", ["Amazon"]),
      p("d9p6", "Palindrome Partitioning", "Medium", ["Amazon", "Google"], true, "Pro"),
    ],
  },
  {
    day: 10, title: "Day 10 : Recursion & Backtracking",
    problems: [
      p("d10p1", "Letter Combinations Phone Number", "Medium", ["Amazon", "Google"]),
      p("d10p2", "N-Queens", "Hard", ["Google", "Amazon"]),
      p("d10p3", "Sudoku Solver", "Hard", ["Amazon", "Uber"]),
      p("d10p4", "Rat in a Maze", "Medium", ["Zoho", "Amazon"]),
      p("d10p5", "Word Break", "Medium", ["Amazon", "Google"], true, "Pro"),
    ],
  },
  {
    day: 11, title: "Day 11 : Linked List (Part 1)",
    problems: [
      p("d11p1", "Reverse Linked List", "Easy", ["Amazon", "Apple", "Google"]),
      p("d11p2", "Middle of the Linked List", "Easy", ["Amazon"]),
      p("d11p3", "Detect Cycle in Linked List", "Easy", ["Amazon", "Microsoft"]),
      p("d11p4", "Find Starting Point of Cycle", "Medium", ["Amazon"]),
      p("d11p5", "Palindrome Linked List", "Easy", ["Amazon", "Apple"]),
      p("d11p6", "Merge Two Sorted Lists", "Easy", ["Amazon", "Meta"]),
    ],
  },
  {
    day: 12, title: "Day 12 : Linked List (Part 2)",
    problems: [
      p("d12p1", "Remove Nth Node from End", "Medium", ["Amazon", "Microsoft"]),
      p("d12p2", "Intersection of Two Linked Lists", "Easy", ["Amazon"]),
      p("d12p3", "LRU Cache", "Medium", ["Amazon", "Uber"], true, "Pro"),
      p("d12p4", "Rotate Linked List", "Medium", ["Amazon"]),
      p("d12p5", "Flatten a Linked List", "Medium", ["Amazon", "Google"]),
      p("d12p6", "Copy List with Random Pointer", "Medium", ["Amazon", "Meta"]),
    ],
  },
  {
    day: 13, title: "Day 13 : Stacks & Queues (Part 1)",
    problems: [
      p("d13p1", "Valid Parentheses", "Easy", ["Amazon", "Google", "Microsoft"]),
      p("d13p2", "Min Stack", "Medium", ["Amazon", "Google"]),
      p("d13p3", "Next Greater Element", "Medium", ["Amazon"]),
      p("d13p4", "Daily Temperatures", "Medium", ["Amazon", "Google"]),
      p("d13p5", "Evaluate Reverse Polish Notation", "Medium", ["Amazon"]),
      p("d13p6", "Implement Queue using Stacks", "Easy", ["Amazon", "Microsoft"]),
    ],
  },
  {
    day: 14, title: "Day 14 : Stacks & Queues (Part 2)",
    problems: [
      p("d14p1", "Largest Rectangle in Histogram", "Hard", ["Google", "Amazon"], true, "Pro"),
      p("d14p2", "Maximal Rectangle", "Hard", ["Amazon"]),
      p("d14p3", "Asteroid Collision", "Medium", ["Amazon"]),
      p("d14p4", "Online Stock Span", "Medium", ["Amazon"]),
      p("d14p5", "132 Pattern", "Medium", ["Amazon"], true, "Pro"),
    ],
  },
  {
    day: 15, title: "Day 15 : Stacks & Queues (Part 3)",
    problems: [
      p("d15p1", "Design Browser History", "Medium", ["Amazon"]),
      p("d15p2", "Number of Recent Calls", "Easy", ["Google"]),
      p("d15p3", "Maximum Frequency Stack", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d15p4", "Sliding Window Maximum", "Hard", ["Amazon", "Lyft"]),
      p("d15p5", "Monotonic Queue", "Medium", ["Amazon", "Google"]),
    ],
  },
  {
    day: 16, title: "Day 16 : Binary Trees (Part 1)",
    problems: [
      p("d16p1", "Binary Tree Inorder Traversal", "Easy", ["Amazon", "Microsoft"]),
      p("d16p2", "Binary Tree Level Order Traversal", "Medium", ["Amazon", "Meta"]),
      p("d16p3", "Maximum Depth of Binary Tree", "Easy", ["Amazon", "LinkedIn"]),
      p("d16p4", "Symmetric Tree", "Easy", ["Amazon", "Microsoft"]),
      p("d16p5", "Path Sum", "Easy", ["Amazon", "Microsoft"]),
      p("d16p6", "Invert Binary Tree", "Easy", ["Amazon", "Apple"]),
    ],
  },
  {
    day: 17, title: "Day 17 : Binary Trees (Part 2)",
    problems: [
      p("d17p1", "Diameter of Binary Tree", "Easy", ["Amazon", "Google"]),
      p("d17p2", "Binary Tree Maximum Path Sum", "Hard", ["Amazon", "Meta"], true, "Pro"),
      p("d17p3", "Count Complete Tree Nodes", "Medium", ["Google"]),
      p("d17p4", "Balanced Binary Tree", "Easy", ["Amazon"]),
      p("d17p5", "Lowest Common Ancestor", "Medium", ["Amazon", "Meta"]),
      p("d17p6", "Zigzag Level Order Traversal", "Medium", ["Amazon", "Microsoft"]),
    ],
  },
  {
    day: 18, title: "Day 18 : Binary Trees (Part 3)",
    problems: [
      p("d18p1", "Construct Tree from Preorder Inorder", "Medium", ["Amazon", "Microsoft"]),
      p("d18p2", "Construct Tree from Postorder Inorder", "Medium", ["Amazon"]),
      p("d18p3", "Serialize and Deserialize Binary Tree", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d18p4", "Flatten Binary Tree to Linked List", "Medium", ["Amazon"]),
      p("d18p5", "Maximum Width of Binary Tree", "Medium", ["Amazon", "Google"]),
      p("d18p6", "Sum of Nodes at K Distance", "Medium", ["Amazon", "Flipkart"]),
    ],
  },
  {
    day: 19, title: "Day 19 : Binary Trees (Part 4)",
    problems: [
      p("d19p1", "Right View of Binary Tree", "Medium", ["Amazon", "Flipkart"]),
      p("d19p2", "Left View of Binary Tree", "Medium", ["Amazon"]),
      p("d19p3", "Top View of Binary Tree", "Medium", ["Amazon"]),
      p("d19p4", "Bottom View of Binary Tree", "Medium", ["Flipkart", "Amazon"]),
      p("d19p5", "Vertical Order Traversal", "Hard", ["Amazon", "Google"]),
      p("d19p6", "Burning Tree Problem", "Hard", ["Amazon", "Flipkart"], true, "Pro"),
    ],
  },
  {
    day: 20, title: "Day 20 : BST (Part 1)",
    problems: [
      p("d20p1", "Search in a BST", "Easy", ["Amazon", "Google"]),
      p("d20p2", "Insert into a BST", "Medium", ["Amazon"]),
      p("d20p3", "Delete Node in BST", "Medium", ["Amazon"]),
      p("d20p4", "Validate BST", "Medium", ["Amazon", "Microsoft"]),
      p("d20p5", "Kth Smallest Element in BST", "Medium", ["Amazon", "Meta"]),
    ],
  },
  {
    day: 21, title: "Day 21 : BST (Part 2)",
    problems: [
      p("d21p1", "Inorder Successor in BST", "Medium", ["Amazon", "Microsoft"]),
      p("d21p2", "Floor and Ceil in BST", "Medium", ["Flipkart", "Amazon"]),
      p("d21p3", "Two Sum in BST", "Easy", ["Amazon"]),
      p("d21p4", "BST to Greater Sum Tree", "Medium", ["Amazon"]),
      p("d21p5", "Recover BST", "Hard", ["Amazon"], true, "Pro"),
    ],
  },
  {
    day: 22, title: "Day 22 : BST (Part 3)",
    problems: [
      p("d22p1", "Construct BST from Preorder", "Medium", ["Amazon", "Microsoft"]),
      p("d22p2", "Convert Sorted Array to BST", "Easy", ["Amazon"]),
      p("d22p3", "Merge Two BSTs", "Hard", ["Amazon", "Uber"], true, "Pro"),
      p("d22p4", "Largest BST in Binary Tree", "Hard", ["Amazon"]),
      p("d22p5", "BST Iterator", "Medium", ["Amazon", "Meta"]),
    ],
  },
  {
    day: 23, title: "Day 23 : Heaps",
    problems: [
      p("d23p1", "Kth Largest Element in an Array", "Medium", ["Amazon", "Microsoft"]),
      p("d23p2", "Top K Frequent Elements", "Medium", ["Amazon", "Meta"]),
      p("d23p3", "K Closest Points to Origin", "Medium", ["Amazon", "Meta"]),
      p("d23p4", "Find Median from Data Stream", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d23p5", "Merge K Sorted Lists", "Hard", ["Amazon", "Microsoft"]),
      p("d23p6", "Task Scheduler", "Medium", ["Amazon", "Microsoft"]),
    ],
  },
  {
    day: 24, title: "Day 24 : Tries",
    problems: [
      p("d24p1", "Implement Trie", "Medium", ["Amazon", "Google"]),
      p("d24p2", "Add and Search Word", "Medium", ["Amazon"]),
      p("d24p3", "Word Search II", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d24p4", "Longest Word in Dictionary", "Medium", ["Amazon"]),
      p("d24p5", "Maximum XOR of Two Numbers", "Medium", ["Amazon"], true, "Pro"),
    ],
  },
  {
    day: 25, title: "Day 25 : Graphs (Part 1)",
    problems: [
      p("d25p1", "Number of Islands", "Medium", ["Amazon", "Microsoft"]),
      p("d25p2", "Flood Fill", "Easy", ["Amazon", "Microsoft"]),
      p("d25p3", "Clone Graph", "Medium", ["Amazon", "Meta"]),
      p("d25p4", "BFS of Graph", "Easy", ["Amazon"]),
      p("d25p5", "DFS of Graph", "Easy", ["Amazon"]),
      p("d25p6", "Rotten Oranges", "Medium", ["Amazon", "Uber"]),
    ],
  },
  {
    day: 26, title: "Day 26 : Graphs (Part 2)",
    problems: [
      p("d26p1", "Detect Cycle in Undirected Graph", "Medium", ["Amazon", "Google"]),
      p("d26p2", "Detect Cycle in Directed Graph", "Medium", ["Amazon"]),
      p("d26p3", "Topological Sort (DFS)", "Medium", ["Amazon", "Google"]),
      p("d26p4", "Topological Sort (BFS / Kahn's)", "Medium", ["Amazon", "Microsoft"]),
      p("d26p5", "Course Schedule", "Medium", ["Amazon", "Microsoft"]),
      p("d26p6", "Course Schedule II", "Medium", ["Amazon", "Meta"]),
    ],
  },
  {
    day: 27, title: "Day 27 : Graphs (Part 3)",
    problems: [
      p("d27p1", "Number of Connected Components", "Medium", ["LinkedIn", "Amazon"]),
      p("d27p2", "Redundant Connection", "Medium", ["Amazon"]),
      p("d27p3", "Dijkstra's Algorithm", "Medium", ["Amazon", "Google"], true, "Pro"),
      p("d27p4", "Bellman-Ford Algorithm", "Medium", ["Amazon"], true, "Pro"),
      p("d27p5", "Prim's MST Algorithm", "Medium", ["Amazon", "Flipkart"]),
      p("d27p6", "Kruskal's MST Algorithm", "Medium", ["Amazon"]),
      p("d27p7", "Cheapest Flights Within K Stops", "Medium", ["Google", "Lyft"]),
    ],
  },
  {
    day: 28, title: "Day 28 : Graphs (Part 4)",
    problems: [
      p("d28p1", "Word Ladder", "Hard", ["Amazon", "Google"]),
      p("d28p2", "Word Ladder II", "Hard", ["Amazon", "Google"]),
      p("d28p3", "Alien Dictionary", "Hard", ["Google", "Amazon"], true, "Pro"),
      p("d28p4", "Critical Connections in Network", "Hard", ["Amazon"], true, "Pro"),
      p("d28p5", "Pacific Atlantic Water Flow", "Medium", ["Salesforce", "Google"]),
      p("d28p6", "Strongly Connected Components (Kosaraju)", "Hard", ["Amazon", "Google"]),
      p("d28p7", "Bipartite Graph Check", "Medium", ["Amazon"]),
    ],
  },
  {
    day: 29, title: "Day 29 : DP (Part 1)",
    problems: [
      p("d29p1", "Climbing Stairs", "Easy", ["Amazon", "Google"]),
      p("d29p2", "Fibonacci Number", "Easy", ["Amazon", "Google"]),
      p("d29p3", "House Robber", "Medium", ["Amazon"]),
      p("d29p4", "House Robber II", "Medium", ["Amazon"]),
      p("d29p5", "Frog Jump", "Medium", ["Amazon", "Google"]),
    ],
  },
  {
    day: 30, title: "Day 30 : DP (Part 2)",
    problems: [
      p("d30p1", "0-1 Knapsack Problem", "Medium", ["Amazon", "Google"], true, "Pro"),
      p("d30p2", "Coin Change Problem", "Medium", ["Amazon", "Apple"]),
      p("d30p3", "Longest Common Subsequence", "Medium", ["Amazon", "Google"]),
      p("d30p4", "Edit Distance", "Hard", ["Amazon", "Google"], true, "Pro"),
      p("d30p5", "Minimum Path Sum", "Medium", ["Amazon"]),
      p("d30p6", "Unique Paths", "Medium", ["Amazon", "Google"]),
    ],
  },
  {
    day: 31, title: "Day 31 : DP (Part 3)",
    problems: [
      p("d31p1", "Longest Increasing Subsequence", "Medium", ["Amazon", "Microsoft"], true, "Pro"),
      p("d31p2", "Russian Doll Envelopes", "Hard", ["Amazon", "Google"]),
      p("d31p3", "Burst Balloons (MCM)", "Hard", ["Google"], true, "Pro"),
      p("d31p4", "Palindrome Partitioning II", "Hard", ["Amazon"]),
      p("d31p5", "Egg Drop Problem", "Hard", ["Google", "Amazon"]),
    ],
  },
  {
    day: 32, title: "Day 32 : DP (Part 4)",
    problems: [
      p("d32p1", "Best Time to Buy and Sell Stock III", "Hard", ["Amazon", "Google"]),
      p("d32p2", "Best Time to Buy and Sell Stock IV", "Hard", ["Amazon"]),
      p("d32p3", "Regular Expression Matching", "Hard", ["Google", "Meta"], true, "Pro"),
      p("d32p4", "Wildcard Matching", "Hard", ["Amazon", "Meta"]),
      p("d32p5", "Interleaving String", "Hard", ["Google", "Amazon"]),
    ],
  },
  {
    day: 33, title: "Day 33 : Greedy",
    problems: [
      p("d33p1", "Jump Game", "Medium", ["Amazon", "Google"]),
      p("d33p2", "Jump Game II", "Medium", ["Amazon", "Google"]),
      p("d33p3", "Gas Station", "Medium", ["Amazon", "Google"]),
      p("d33p4", "Hand of Straights", "Medium", ["Amazon"]),
      p("d33p5", "Merge Triplets to Form Target", "Medium", ["Amazon"]),
      p("d33p6", "Activity Selection Problem", "Medium", ["Amazon", "Google"]),
    ],
  },
  {
    day: 34, title: "Day 34 : Miscellaneous",
    problems: [
      p("d34p1", "Design Twitter", "Medium", ["Twitter", "Meta"]),
      p("d34p2", "Find Median from Data Stream", "Hard", ["Amazon", "Google"]),
      p("d34p3", "Meeting Rooms II", "Medium", ["Amazon", "Snapchat"]),
      p("d34p4", "Reverse Words in a String", "Medium", ["Amazon"]),
      p("d34p5", "Bit Manipulation Tricks", "Easy", ["Amazon", "Google"]),
    ],
  },
];

/* ─────────────── DP SHEET DATA ─────────────── */
const DP_SHEET: DPSection[] = [
  {
    title: "1D DP",
    problems: [
      p("dp1p1", "Fibonacci", "Easy", ["Amazon"]),
      p("dp1p2", "Climbing Stairs", "Easy", ["Apple", "Microsoft"]),
      p("dp1p3", "House Robber", "Medium", ["Amazon"]),
      p("dp1p4", "Frog Jump", "Medium", ["Google"]),
      p("dp1p5", "Min Cost Climbing Stairs", "Easy", ["Google"]),
      p("dp1p6", "House Robber II", "Medium", ["Amazon"]),
    ],
  },
  {
    title: "Knapsack",
    problems: [
      p("dp2p1", "0-1 Knapsack Problem", "Medium", ["Amazon", "Google"]),
      p("dp2p2", "Last Stones Weight II", "Medium", ["Google"]),
      p("dp2p3", "Unbounded Knapsack Problem", "Medium", ["Amazon", "Google"]),
      p("dp2p4", "Target Sum", "Medium", ["Google"]),
      p("dp2p5", "Coin Change Problem", "Medium", ["Amazon", "Apple"]),
      p("dp2p6", "Partition Equal Subset Sums", "Medium", ["Amazon"]),
      p("dp2p7", "Rod Cutting DP", "Hard", ["Amazon"]),
    ],
  },
  {
    title: "LCS",
    problems: [
      p("dp3p1", "Longest Common Subsequence", "Medium", ["Amazon", "Google"]),
      p("dp3p2", "Edit Distance", "Hard", ["Amazon", "Google"]),
      p("dp3p3", "Shortest Common Supersequence", "Hard", ["Amazon"]),
      p("dp3p4", "Distinct Subsequences", "Hard", ["Amazon"]),
      p("dp3p5", "Longest Palindromic Subsequence", "Medium", ["Amazon"]),
      p("dp3p6", "Wildcard Matching", "Hard", ["Amazon", "Meta"]),
    ],
  },
  {
    title: "Catalan",
    problems: [
      p("dp4p1", "Catalan Number", "Medium", ["Amazon"]),
      p("dp4p2", "Unique Binary Search Trees", "Medium", ["Amazon", "Google"]),
      p("dp4p3", "Count of Balanced Parentheses", "Medium", ["Amazon"]),
      p("dp4p4", "Mountain Ranges", "Medium", ["Amazon"]),
      p("dp4p5", "Polygon Triangulation", "Medium", ["Google"]),
    ],
  },
  {
    title: "Grid DP",
    problems: [
      p("dp5p1", "Unique Paths", "Medium", ["Amazon", "Google"]),
      p("dp5p2", "Unique Paths II", "Medium", ["Amazon"]),
      p("dp5p3", "Minimum Path Sum", "Medium", ["Amazon"]),
      p("dp5p4", "Triangle", "Medium", ["Amazon"]),
      p("dp5p5", "Maximal Square", "Medium", ["Amazon", "Google"]),
      p("dp5p6", "Cherry Pickup", "Hard", ["Google"]),
      p("dp5p7", "Dungeon Game", "Hard", ["Amazon"]),
    ],
  },
  {
    title: "MCM",
    problems: [
      p("dp6p1", "Matrix Chain Multiplication", "Hard", ["Amazon", "Google"]),
      p("dp6p2", "Burst Balloons", "Hard", ["Google"]),
      p("dp6p3", "Palindrome Partitioning II", "Hard", ["Amazon"]),
      p("dp6p4", "Egg Drop Problem", "Hard", ["Google", "Amazon"]),
      p("dp6p5", "Optimal BST", "Hard", ["Amazon"]),
      p("dp6p6", "Boolean Parenthesization", "Hard", ["Amazon"]),
    ],
  },
  {
    title: "Stock DP",
    problems: [
      p("dp7p1", "Best Time to Buy and Sell Stock", "Easy", ["Amazon", "Google"]),
      p("dp7p2", "Best Time to Buy and Sell Stock II", "Medium", ["Amazon"]),
      p("dp7p3", "Best Time to Buy and Sell Stock III", "Hard", ["Amazon", "Google"]),
      p("dp7p4", "Best Time to Buy and Sell Stock IV", "Hard", ["Amazon"]),
      p("dp7p5", "Best Time to Buy and Sell with Cooldown", "Medium", ["Amazon"]),
    ],
  },
  {
    title: "Miscellaneous",
    problems: [
      p("dp8p1", "Longest Increasing Subsequence", "Medium", ["Amazon", "Microsoft"]),
      p("dp8p2", "Russian Doll Envelopes", "Hard", ["Amazon", "Google"]),
      p("dp8p3", "Number of Dice Rolls", "Medium", ["Amazon"]),
      p("dp8p4", "Tallest Billboard", "Hard", ["Google"]),
      p("dp8p5", "Regular Expression Matching", "Hard", ["Google", "Meta"]),
      p("dp8p6", "Interleaving String", "Hard", ["Google", "Amazon"]),
      p("dp8p7", "Maximum Profit in Job Scheduling", "Hard", ["Amazon"]),
      p("dp8p8", "Strange Printer", "Hard", ["Google"]),
    ],
  },
];

/* ─────────────── DOWNLOADABLE NOTES ─────────────── */
const NOTE_CATEGORIES = [
  { title: "CS Fundamentals", description: "Complete Notes of CS Fundamentals", files: 4, icon: "🖥️", color: "#4f46e5" },
  { title: "Python", description: "Detailed Notes of Python", files: 8, icon: "🐍", color: "#3b82f6" },
  { title: "Java", description: "Java Notes", files: 1, icon: "☕", color: "#ef4444" },
  { title: "HTML", description: "HTML Notes", files: 1, icon: "🌐", color: "#f97316" },
  { title: "JavaScript", description: "JavaScript Notes", files: 9, icon: "⚡", color: "#eab308" },
  { title: "Github Cheatsheet", description: "Github Cheatsheet", files: 1, icon: "🐙", color: "#6b7280" },
  { title: "SQL", description: "SQL Notes", files: 1, icon: "🗄️", color: "#06b6d4" },
  { title: "Web Development Roadmap", description: "Complete Roadmap for Web Development", files: 1, icon: "🗺️", color: "#10b981" },
  { title: "Python Crash Course", description: "Complete crash course for learning Python from scratch.", files: 1, icon: "🚀", color: "#8b5cf6" },
];

const CS_FUNDAMENTALS_FILES = [
  { name: "Computer Networks", desc: "Complete Notes of Computer Networks" },
  { name: "DBMS", desc: "Complete Notes of DBMS" },
  { name: "Object Oriented Programming", desc: "Complete Notes of OOPs" },
  { name: "Operating System", desc: "Complete Notes of Operating System" },
];

/* ─────────────── COMPONENT ─────────────── */
export default function DSASheetPage() {
  const [activeTab, setActiveTab] = useState<"DSA Sheet" | "DP Sheet" | "Interview Experience" | "Downloadable Notes">("DSA Sheet");
  const [searchQuery, setSearchQuery] = useState("");
  const [proMode, setProMode] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(["d1", "d2", "d3"]));
  const [selectedNoteCategory, setSelectedNoteCategory] = useState<string | null>(null);

  const allProblems = DSA_SHEET.flatMap((d) => d.problems);
  const totalCount = allProblems.length;
  const doneCount = allProblems.filter((pr) => completedMap[pr.id]).length;

  const toggleComplete = (id: string) => setCompletedMap((p) => ({ ...p, [id]: !p[id] }));
  const toggleBookmark = (id: string) => setBookmarkedMap((p) => ({ ...p, [id]: !p[id] }));
  const toggleDay = (key: string) =>
    setExpandedDays((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const filterProblems = (probs: Problem[]) =>
    probs.filter((pr) => {
      if (activeTab === "Downloadable Notes" || activeTab === "Interview Experience") return true;
      if (proMode && pr.level !== "Pro") return false;
      if (activeTab === "DSA Sheet" && searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          pr.title.toLowerCase().includes(q) ||
          pr.companies.some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });

  const diffColor = (d: string) =>
    d === "Easy" ? { color: "#34d399", bg: "rgba(16,185,129,0.15)" } :
    d === "Medium" ? { color: "#f59e0b", bg: "rgba(245,158,11,0.15)" } :
    { color: "#ef4444", bg: "rgba(239,68,68,0.15)" };

  /* ── Table Row ── */
  const ProblemRow = ({ pr }: { pr: Problem }) => {
    const done = !!completedMap[pr.id];
    const saved = !!bookmarkedMap[pr.id];
    const dc = diffColor(pr.difficulty);
    return (
      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: done ? "rgba(16,185,129,0.03)" : "transparent" }}>
        <td style={{ padding: "12px 14px" }}>
          <input type="checkbox" checked={done} onChange={() => toggleComplete(pr.id)}
            style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#f97316" }} />
        </td>
        <td style={{ padding: "12px 14px", fontWeight: "600", color: done ? "#4b5563" : "#e5e7eb", textDecoration: done ? "line-through" : "none", fontSize: "13px" }}>
          {pr.title}
        </td>
        {/* Article */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          {pr.hasArticle ? (
            <a href={`https://takeuforward.org/`} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#1e1e1e", border: "1px solid #333", color: "#9ca3af", fontSize: "11px", fontWeight: "700", textDecoration: "none" }}>
              M≡
            </a>
          ) : (
            <span style={{ fontSize: "10px", color: "#4b5563" }}>Coming<br />Soon</span>
          )}
        </td>
        {/* Youtube */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          <a href="https://www.youtube.com/@ApnaCollegeOfficial" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#1e1e1e", border: "1px solid #333", color: "#ef4444", fontSize: "13px", textDecoration: "none" }}>
            ▶
          </a>
        </td>
        {/* Practice */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          <Link href={`/problems/${pr.slug}`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#1e1e1e", border: "1px solid #333", color: "#9ca3af", fontSize: "11px", fontWeight: "700", textDecoration: "none" }}>
            {"</>"}
          </Link>
        </td>
        {/* Level / Difficulty */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "6px", color: dc.color, background: dc.bg }}>
            {pr.difficulty}
          </span>
        </td>
        {/* Timer */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "600" }}>30Min</span>
        </td>
        {/* Company */}
        <td style={{ padding: "12px 14px" }}>
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {pr.companies.slice(0, 2).map((c, i) => (
              <span key={i} style={{
                width: "22px", height: "22px", borderRadius: "50%", background: "#1e1e1e",
                border: "1px solid #333", display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "8px", color: "#9ca3af", fontWeight: "700"
              }} title={c}>
                {c[0]}
              </span>
            ))}
            {pr.companies.length > 2 && (
              <span style={{ fontSize: "10px", color: "#6b7280" }}>+{pr.companies.length - 2}</span>
            )}
          </div>
        </td>
        {/* Save */}
        <td style={{ padding: "12px 14px", textAlign: "center" }}>
          <button onClick={() => toggleBookmark(pr.id)} title={saved ? "Saved" : "Save"}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: saved ? "#f97316" : "#4b5563", fontSize: "16px" }}>
            🔖
          </button>
        </td>
      </tr>
    );
  };

  /* ── Table Header ── */
  const TableHead = () => (
    <thead>
      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {["", "Problem", "Article", "Youtube", "Practice", "Level", "Timer", "Company", "Save"].map((h, i) => (
          <th key={i} style={{ padding: "10px 14px", textAlign: i > 1 ? "center" : "left", fontWeight: "600" }}>{h}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <h1 style={{ fontSize: "15px", fontWeight: "800" }}>📑 DSA Sheet</h1>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Beginner / Pro toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "999px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)" }}>
              <span style={{ fontSize: "12px", color: !proMode ? "#f97316" : "#4b5563", fontWeight: "700" }}>Beginner</span>
              <span style={{ fontSize: "11px", color: "#4b5563" }}>/</span>
              <button onClick={() => setProMode(!proMode)} style={{ fontSize: "12px", fontWeight: "700", background: "transparent", border: "none", cursor: "pointer", color: proMode ? "#f97316" : "#4b5563", padding: "0" }}>Pro Level</button>
              <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#1e1e1e", border: "1px solid #333", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#9ca3af" }}>🔥</span>
            </div>

            {/* Group Study */}
            <button style={{ padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)", cursor: "pointer" }}>
              👥 Group Study
            </button>

            {/* Calendar */}
            <button style={{ padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)", cursor: "pointer" }}>
              📅 Calendar
            </button>

            {/* Saved Questions */}
            <button
              onClick={() => setActiveTab("Downloadable Notes")}
              style={{ padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)", cursor: "pointer" }}
            >
              🔖 Saved Questions
            </button>

            {/* Score pill */}
            <div style={{ padding: "5px 12px", borderRadius: "999px", background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", fontSize: "12px", color: "#f97316", fontWeight: "700" }}>
              {doneCount}/{totalCount} ✓
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* ── Hero Section ── */}
          <div style={{
            backgroundImage: "radial-gradient(ellipse at 60% 40%, rgba(249,115,22,0.08) 0%, transparent 60%)",
            border: "1px solid rgba(249,115,22,0.12)", borderRadius: "16px", padding: "28px 32px", marginBottom: "20px"
          }}>
            <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "26px", fontWeight: "900", lineHeight: "1.2", marginBottom: "10px" }}>
                  <span style={{ color: "#f97316" }}>{activeTab === "DP Sheet" ? "DP Sheet" : activeTab === "Downloadable Notes" ? "Downloadable Notes" : "DSA Sheet"}</span>
                  {" "}— {activeTab === "DP Sheet" ? "Important DP Patterns for Interviews" : activeTab === "Downloadable Notes" ? "Browse resources, notes, PDFs, cheat sheets, and learning materials." : "Most Important Interview Questions"}
                </h2>
                <ul style={{ paddingLeft: "16px", color: "var(--nex-text-2)", fontSize: "13px", lineHeight: "2", margin: 0 }}>
                  <li>All DSA topics covered</li>
                  <li>Will this be enough for Placements, is this for me?</li>
                </ul>
                <div style={{ display: "flex", gap: "16px", marginTop: "14px", fontSize: "13px", fontWeight: "700" }}>
                  <span style={{ color: "#34d399" }}>• Easy: 41</span>
                  <span style={{ color: "#f59e0b" }}>| Medium: 119</span>
                  <span style={{ color: "#ef4444" }}>| Hard: 33</span>
                </div>
                <div style={{ marginTop: "10px", fontSize: "12px", color: "#6b7280" }}>🟠🟣🟢🔵 439+ people solving now</div>
              </div>

              {/* Tab Navigation (left sidebar style) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "180px" }}>
                {([
                  { id: "DSA Sheet", icon: "📄" },
                  { id: "DP Sheet", icon: "⚡" },
                  { id: "Interview Experience", icon: "💼" },
                  { id: "Downloadable Notes", icon: "📥" },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", textAlign: "left",
                      border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                      background: activeTab === tab.id ? "rgba(249,115,22,0.12)" : "transparent",
                      color: activeTab === tab.id ? "#f97316" : "#6b7280",
                      borderLeft: activeTab === tab.id ? "3px solid #f97316" : "3px solid transparent",
                    }}
                  >
                    {tab.icon} {tab.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ height: "4px", borderRadius: "999px", background: "#1e1e1e", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(doneCount / totalCount) * 100}%`, background: "linear-gradient(90deg, #f97316, #ef4444)", borderRadius: "999px", transition: "width 0.3s" }} />
              </div>
            </div>
          </div>

          {/* ── Search (only for sheet tabs) ── */}
          {(activeTab === "DSA Sheet" || activeTab === "DP Sheet") && (
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in sheet:- question, company..."
                className="nex-input"
                style={{ padding: "10px 16px", fontSize: "13px", maxWidth: "480px" }}
              />
            </div>
          )}

          {/* ════════════════ DSA SHEET ════════════════ */}
          {activeTab === "DSA Sheet" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {DSA_SHEET.map((day) => {
                const key = `d${day.day}`;
                const filtered = filterProblems(day.problems).filter((pr) => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return pr.title.toLowerCase().includes(q) || pr.companies.some((c) => c.toLowerCase().includes(q));
                });
                const expanded = expandedDays.has(key);
                const done = day.problems.filter((pr) => completedMap[pr.id]).length;

                if (filtered.length === 0 && searchQuery) return null;

                return (
                  <div key={key} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#111113" }}>
                    <button
                      onClick={() => toggleDay(key)}
                      style={{
                        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer"
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "800", color: "#f97316" }}>{day.title}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{done}/{day.problems.length}</span>
                        <span style={{ color: "#6b7280", fontSize: "14px" }}>{expanded ? "∧" : "∨"}</span>
                      </div>
                    </button>

                    {expanded && (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <TableHead />
                          <tbody>
                            {(searchQuery ? filtered : day.problems.filter((pr) => !proMode || pr.level === "Pro")).map((pr) => (
                              <ProblemRow key={pr.id} pr={pr} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════════════ DP SHEET ════════════════ */}
          {activeTab === "DP Sheet" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {DP_SHEET.map((section) => {
                const key = `dp_${section.title}`;
                const expanded = expandedDays.has(key);
                const done = section.problems.filter((pr) => completedMap[pr.id]).length;
                const filtered = filterProblems(section.problems).filter((pr) => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return pr.title.toLowerCase().includes(q) || pr.companies.some((c) => c.toLowerCase().includes(q));
                });
                if (filtered.length === 0 && searchQuery) return null;

                return (
                  <div key={key} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#111113" }}>
                    <button
                      onClick={() => toggleDay(key)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: "800", color: "#f97316" }}>{section.title}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{done}/{section.problems.length}</span>
                        <span style={{ color: "#6b7280" }}>{expanded ? "∧" : "∨"}</span>
                      </div>
                    </button>
                    {expanded && (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <TableHead />
                          <tbody>
                            {(searchQuery ? filtered : section.problems).map((pr) => (
                              <ProblemRow key={pr.id} pr={pr} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════════════ INTERVIEW EXPERIENCE ════════════════ */}
          {activeTab === "Interview Experience" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { company: "Google SDE-1 (L3)", rounds: "4 Coding Rounds + 1 Googlyness & Leadership", date: "Aug 2026", tags: ["Graph BFS/DFS", "DP Tree", "System Design", "Behavioral"], outcome: "Offer Accepted" },
                { company: "Amazon SDE-2", rounds: "3 Coding Rounds + Bar Raiser + LP Rounds", date: "Jul 2026", tags: ["Two Pointers", "Sliding Window", "Leadership Principles", "LLD"], outcome: "Offer Accepted" },
                { company: "Meta Production Engineer", rounds: "Systems Coding + Architecture + Cross-Functional", date: "Aug 2026", tags: ["Consistent Hashing", "Cache Invalidation", "Load Balancer"], outcome: "Offer Accepted" },
                { company: "Microsoft SDE-2", rounds: "2 Technical + 1 Design + 1 Manager + Hiring Manager", date: "Jul 2026", tags: ["Binary Trees", "Graph Traversal", "OOP Design"], outcome: "Offer Accepted" },
                { company: "Flipkart SDE-1", rounds: "1 Machine Coding + 2 DS/Algo + 1 Design", date: "Jun 2026", tags: ["Arrays & DP", "Machine Coding", "HLD"], outcome: "Offer Accepted" },
              ].map((exp, i) => (
                <div key={i} style={{ padding: "20px 24px", borderRadius: "12px", background: "#111113", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#f97316" }}>{exp.company}</div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{exp.date}</span>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(16,185,129,0.12)", color: "#34d399", fontWeight: "700" }}>{exp.outcome}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}>{exp.rounds}</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {exp.tags.map((t) => (
                      <span key={t} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "11px", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", fontWeight: "600" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════════════════ DOWNLOADABLE NOTES ════════════════ */}
          {activeTab === "Downloadable Notes" && !selectedNoteCategory && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "20px", fontWeight: "900", marginBottom: "6px" }}>Downloadable Notes</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Browse resources, notes, PDFs, cheat sheets, and learning materials.</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {NOTE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.title}
                    onClick={() => setSelectedNoteCategory(cat.title)}
                    style={{ padding: "0", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "#111113", cursor: "pointer", textAlign: "left", overflow: "hidden" }}
                  >
                    <div style={{ height: "120px", background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
                      {cat.icon}
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#e5e7eb", marginBottom: "4px" }}>{cat.title}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>{cat.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>{cat.files} {cat.files === 1 ? "File" : "Files"}</span>
                        <span style={{ fontSize: "12px", color: "#f97316", fontWeight: "700" }}>View Files →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CS Fundamentals inner page */}
          {activeTab === "Downloadable Notes" && selectedNoteCategory && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "13px", color: "#6b7280" }}>
                <button onClick={() => setSelectedNoteCategory(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#f97316", fontWeight: "700" }}>DSA Sheet</button>
                <span>›</span>
                <span>Study Material</span>
                <span>›</span>
                <span style={{ color: "#e5e7eb" }}>{selectedNoteCategory}</span>
              </div>
              <div style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>{selectedNoteCategory}</div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
                {NOTE_CATEGORIES.find((c) => c.title === selectedNoteCategory)?.description}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "#f97316" }} /> Select All
                </label>
                <button className="btn-primary btn-sm">📥 Download Selected</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {CS_FUNDAMENTALS_FILES.map((file) => (
                  <div key={file.name} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderRadius: "10px", background: "#111113", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <input type="checkbox" style={{ accentColor: "#f97316", width: "16px", height: "16px" }} />
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📄</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#e5e7eb" }}>{file.name}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{file.desc}</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ padding: "3px 8px", borderRadius: "4px", background: "#1e1e1e", border: "1px solid #333", fontSize: "11px", color: "#9ca3af" }}>pdf</span>
                      <button title="Open" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "16px" }}>↗</button>
                      <button title="Download" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "16px" }}>⬇</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#4b5563" }}>
          <span>Nexvora Platform — DSA Sheet inspired by Apna College</span>
          <span>© 2026 Nexvora. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
