"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { CompanyLogo } from "@/app/problems/page";

/* ─── TYPES ─── */
interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  articleUrl: string | null;
  leetcodeUrl: string | null;
  level: "Beginner" | "Pro";
}

interface DaySheet {
  day: number;
  title: string;
  problems: Problem[];
}

/* ─── HELPER ─── */
function p(
  id: string,
  title: string,
  difficulty: "Easy" | "Medium" | "Hard",
  companies: string[],
  leetcodeUrl: string | null = null,
  articleUrl: string | null = null,
  level: "Beginner" | "Pro" = "Beginner"
): Problem {
  return { id, title, difficulty, companies, articleUrl, leetcodeUrl, level };
}

/* ─── DATA ─── */
const DSA_SHEET: DaySheet[] = [
  {
    day: 1, title: "Day 1 : Array (Part 1)",
    problems: [
      p("d1p1", "Majority Element", "Easy", ["Amazon", "Google"], "https://leetcode.com/problems/majority-element/", "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/"),
      p("d1p2", "Repeat & Missing Number", "Easy", ["Amazon"], "https://leetcode.com/problems/find-missing-and-repeated-values/", "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/"),
      p("d1p3", "Merge 2 Sorted Arrays Without Extra Space", "Medium", ["Google", "Microsoft"], "https://leetcode.com/problems/merge-sorted-array/", null),
      p("d1p4", "Single Number", "Easy", ["Apple", "Amazon", "Meta"], "https://leetcode.com/problems/single-number/", "https://takeuforward.org/data-structure/single-number-xor/"),
      p("d1p5", "Stock Buy & Sell", "Easy", ["Google", "Meta"], "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "https://takeuforward.org/data-structure/stock-buy-and-sell/"),
      p("d1p6", "Pow (x^n)", "Medium", ["LinkedIn", "Amazon"], "https://leetcode.com/problems/powx-n/", null, "Pro"),
    ],
  },
  {
    day: 2, title: "Day 2 : Array (Part 2)",
    problems: [
      p("d2p1", "Kadane's Algorithm — Maximum Subarray", "Medium", ["Microsoft", "Meta"], "https://leetcode.com/problems/maximum-subarray/", "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/", "Pro"),
      p("d2p2", "Container With Most Water", "Medium", ["Amazon", "Zepto"], "https://leetcode.com/problems/container-with-most-water/", null),
      p("d2p3", "Sort Array of 0s 1s & 2s (Dutch Flag)", "Medium", ["Myntra", "Amazon"], "https://leetcode.com/problems/sort-colors/", "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/"),
      p("d2p4", "3Sum", "Medium", ["Myntra", "Google"], "https://leetcode.com/problems/3sum/", null, "Pro"),
      p("d2p5", "4Sum", "Medium", ["Amazon", "Uber"], "https://leetcode.com/problems/4sum/", null, "Pro"),
      p("d2p6", "Search in 2D Matrix", "Medium", ["Microsoft", "Google"], "https://leetcode.com/problems/search-a-2d-matrix/", null),
    ],
  },
  {
    day: 3, title: "Day 3 : Array (Part 3)",
    problems: [
      p("d3p1", "Next Permutation", "Medium", ["Google", "Amazon"], "https://leetcode.com/problems/next-permutation/", "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/", "Pro"),
      p("d3p2", "Merge Overlapping Intervals", "Medium", ["Google"], "https://leetcode.com/problems/merge-intervals/", "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/"),
      p("d3p3", "Longest Substring Without Repeating Characters", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/longest-substring-without-repeating-characters/", null),
      p("d3p4", "Set Matrix Zeroes", "Medium", ["Amazon"], "https://leetcode.com/problems/set-matrix-zeroes/", null),
      p("d3p5", "Word Search", "Medium", ["Ola", "Google"], "https://leetcode.com/problems/word-search/", null),
      p("d3p6", "Product of Array Except Self", "Medium", ["Ola", "Google"], "https://leetcode.com/problems/product-of-array-except-self/", null),
    ],
  },
  {
    day: 4, title: "Day 4 : Array (Part 4)",
    problems: [
      p("d4p1", "Subarray Sum Equals K", "Medium", ["Microsoft", "Google"], "https://leetcode.com/problems/subarray-sum-equals-k/", null, "Pro"),
      p("d4p2", "Find Duplicate", "Medium", ["Apple", "Amazon"], "https://leetcode.com/problems/find-the-duplicate-number/", null),
      p("d4p3", "Count Inversions", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", null),
      p("d4p4", "Spiral Matrix", "Medium", ["Zepto", "Apple"], "https://leetcode.com/problems/spiral-matrix/", null),
      p("d4p5", "Search in Sorted Matrix II", "Medium", ["Google", "Amazon"], "https://leetcode.com/problems/search-a-2d-matrix-ii/", null),
    ],
  },
  {
    day: 5, title: "Day 5 : Array (Part 5)",
    problems: [
      p("d5p1", "Trapping Rainwater", "Hard", ["Samsung", "Amazon"], "https://leetcode.com/problems/trapping-rain-water/", "https://takeuforward.org/data-structure/trapping-rainwater/"),
      p("d5p2", "Sliding Window Maximum", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/sliding-window-maximum/", null, "Pro"),
      p("d5p3", "Largest Rectangle in a Histogram", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/largest-rectangle-in-histogram/", null, "Pro"),
      p("d5p4", "Reverse Pairs", "Hard", ["Amazon"], "https://leetcode.com/problems/reverse-pairs/", null),
    ],
  },
  {
    day: 6, title: "Day 6 : Strings (Part 1)",
    problems: [
      p("d6p1", "Valid Palindrome", "Easy", ["Amazon", "Apple"], "https://leetcode.com/problems/valid-palindrome/", null),
      p("d6p2", "Valid Anagram", "Easy", ["Dunzo", "Microsoft"], "https://leetcode.com/problems/valid-anagram/", null),
      p("d6p3", "Reverse Words in String", "Medium", ["Amazon", "LinkedIn"], "https://leetcode.com/problems/reverse-words-in-a-string/", null, "Pro"),
      p("d6p4", "Remove All Occurrences", "Medium", ["Google"], "https://leetcode.com/problems/remove-all-occurrences-of-a-substring/", null),
      p("d6p5", "Permutation in String", "Medium", ["Amazon", "Uber"], "https://leetcode.com/problems/permutation-in-string/", null),
      p("d6p6", "String Compression", "Medium", ["Google", "Amazon"], "https://leetcode.com/problems/string-compression/", null),
    ],
  },
  {
    day: 7, title: "Day 7 : Strings (Part 2)",
    problems: [
      p("d7p1", "Longest Palindromic Substring", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/longest-palindromic-substring/", null),
      p("d7p2", "Minimum Window Substring", "Hard", ["Amazon", "Meta"], "https://leetcode.com/problems/minimum-window-substring/", null, "Pro"),
      p("d7p3", "Count and Say", "Medium", ["Amazon"], "https://leetcode.com/problems/count-and-say/", null),
      p("d7p4", "Group Anagrams", "Medium", ["Amazon", "Uber"], "https://leetcode.com/problems/group-anagrams/", null),
      p("d7p5", "Encode and Decode Strings", "Medium", ["Google"], "https://leetcode.com/problems/encode-and-decode-strings/", null),
      p("d7p6", "Find All Anagrams in a String", "Medium", ["Meta", "Amazon"], "https://leetcode.com/problems/find-all-anagrams-in-a-string/", null),
    ],
  },
  {
    day: 8, title: "Day 8 : Binary Search",
    problems: [
      p("d8p1", "Binary Search", "Easy", ["Google", "Amazon", "Meta"], "https://leetcode.com/problems/binary-search/", null),
      p("d8p2", "Search in Rotated Sorted Array", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/search-in-rotated-sorted-array/", null),
      p("d8p3", "Find Minimum in Rotated Sorted Array", "Medium", ["Microsoft", "Apple"], "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", null),
      p("d8p4", "Koko Eating Bananas", "Medium", ["Amazon"], "https://leetcode.com/problems/koko-eating-bananas/", null),
      p("d8p5", "Capacity to Ship Packages", "Medium", ["Amazon"], "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", null),
      p("d8p6", "Median of Two Sorted Arrays", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/median-of-two-sorted-arrays/", null, "Pro"),
      p("d8p7", "Aggressive Cows / Book Allocation", "Hard", ["Amazon", "Adobe"], "https://www.geeksforgeeks.org/allocate-minimum-number-pages/", null, "Pro"),
    ],
  },
  {
    day: 9, title: "Day 9 : Recursion & Backtracking",
    problems: [
      p("d9p1", "Subsets", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/subsets/", null),
      p("d9p2", "Subsets II", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/subsets-ii/", null),
      p("d9p3", "Permutations", "Medium", ["Amazon", "LinkedIn"], "https://leetcode.com/problems/permutations/", null),
      p("d9p4", "Combination Sum", "Medium", ["Amazon"], "https://leetcode.com/problems/combination-sum/", null),
      p("d9p5", "Combination Sum II", "Medium", ["Amazon"], "https://leetcode.com/problems/combination-sum-ii/", null),
      p("d9p6", "Palindrome Partitioning", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/palindrome-partitioning/", null, "Pro"),
    ],
  },
  {
    day: 10, title: "Day 10 : Recursion & Backtracking",
    problems: [
      p("d10p1", "Letter Combinations of a Phone Number", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", null),
      p("d10p2", "N-Queens", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/n-queens/", null),
      p("d10p3", "Sudoku Solver", "Hard", ["Amazon", "Uber"], "https://leetcode.com/problems/sudoku-solver/", null),
      p("d10p4", "Rat in a Maze", "Medium", ["Zoho", "Amazon"], "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/", null),
      p("d10p5", "Word Break", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/word-break/", null, "Pro"),
    ],
  },
  {
    day: 11, title: "Day 11 : Linked List (Part 1)",
    problems: [
      p("d11p1", "Reverse Linked List", "Easy", ["Amazon", "Apple", "Google"], "https://leetcode.com/problems/reverse-linked-list/", "https://takeuforward.org/data-structure/reverse-a-linked-list/"),
      p("d11p2", "Middle of the Linked List", "Easy", ["Amazon"], "https://leetcode.com/problems/middle-of-the-linked-list/", null),
      p("d11p3", "Detect Cycle in Linked List", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/linked-list-cycle/", null),
      p("d11p4", "Find Starting Point of Cycle", "Medium", ["Amazon"], "https://leetcode.com/problems/linked-list-cycle-ii/", null),
      p("d11p5", "Palindrome Linked List", "Easy", ["Amazon", "Apple"], "https://leetcode.com/problems/palindrome-linked-list/", null),
      p("d11p6", "Merge Two Sorted Lists", "Easy", ["Amazon", "Meta"], "https://leetcode.com/problems/merge-two-sorted-lists/", null),
    ],
  },
  {
    day: 12, title: "Day 12 : Linked List (Part 2)",
    problems: [
      p("d12p1", "Remove Nth Node from End", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", null),
      p("d12p2", "Intersection of Two Linked Lists", "Easy", ["Amazon"], "https://leetcode.com/problems/intersection-of-two-linked-lists/", null),
      p("d12p3", "LRU Cache", "Medium", ["Amazon", "Uber"], "https://leetcode.com/problems/lru-cache/", null, "Pro"),
      p("d12p4", "Rotate Linked List", "Medium", ["Amazon"], "https://leetcode.com/problems/rotate-list/", null),
      p("d12p5", "Flatten a Multilevel Doubly Linked List", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", null),
      p("d12p6", "Copy List with Random Pointer", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/copy-list-with-random-pointer/", null),
    ],
  },
  {
    day: 13, title: "Day 13 : Stacks & Queues (Part 1)",
    problems: [
      p("d13p1", "Valid Parentheses", "Easy", ["Amazon", "Google", "Microsoft"], "https://leetcode.com/problems/valid-parentheses/", null),
      p("d13p2", "Min Stack", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/min-stack/", null),
      p("d13p3", "Next Greater Element", "Medium", ["Amazon"], "https://leetcode.com/problems/next-greater-element-i/", null),
      p("d13p4", "Daily Temperatures", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/daily-temperatures/", null),
      p("d13p5", "Evaluate Reverse Polish Notation", "Medium", ["Amazon"], "https://leetcode.com/problems/evaluate-reverse-polish-notation/", null),
      p("d13p6", "Implement Queue using Stacks", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/implement-queue-using-stacks/", null),
    ],
  },
  {
    day: 14, title: "Day 14 : Stacks & Queues (Part 2)",
    problems: [
      p("d14p1", "Largest Rectangle in Histogram", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/largest-rectangle-in-histogram/", null, "Pro"),
      p("d14p2", "Maximal Rectangle", "Hard", ["Amazon"], "https://leetcode.com/problems/maximal-rectangle/", null),
      p("d14p3", "Asteroid Collision", "Medium", ["Amazon"], "https://leetcode.com/problems/asteroid-collision/", null),
      p("d14p4", "Online Stock Span", "Medium", ["Amazon"], "https://leetcode.com/problems/online-stock-span/", null),
      p("d14p5", "132 Pattern", "Medium", ["Amazon"], "https://leetcode.com/problems/132-pattern/", null, "Pro"),
    ],
  },
  {
    day: 15, title: "Day 15 : Stacks & Queues (Part 3)",
    problems: [
      p("d15p1", "Design Browser History", "Medium", ["Amazon"], "https://leetcode.com/problems/design-browser-history/", null),
      p("d15p2", "Maximum Frequency Stack", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/maximum-frequency-stack/", null, "Pro"),
      p("d15p3", "Sliding Window Maximum", "Hard", ["Amazon", "Lyft"], "https://leetcode.com/problems/sliding-window-maximum/", null),
      p("d15p4", "Car Fleet", "Medium", ["Google"], "https://leetcode.com/problems/car-fleet/", null),
      p("d15p5", "Largest Rectangle in Histogram (Monotonic)", "Hard", ["Amazon"], "https://leetcode.com/problems/largest-rectangle-in-histogram/", null, "Pro"),
    ],
  },
  {
    day: 16, title: "Day 16 : Binary Trees (Part 1)",
    problems: [
      p("d16p1", "Binary Tree Inorder Traversal", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/binary-tree-inorder-traversal/", null),
      p("d16p2", "Binary Tree Level Order Traversal", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/binary-tree-level-order-traversal/", null),
      p("d16p3", "Maximum Depth of Binary Tree", "Easy", ["Amazon", "LinkedIn"], "https://leetcode.com/problems/maximum-depth-of-binary-tree/", null),
      p("d16p4", "Symmetric Tree", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/symmetric-tree/", null),
      p("d16p5", "Path Sum", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/path-sum/", null),
      p("d16p6", "Invert Binary Tree", "Easy", ["Amazon", "Apple"], "https://leetcode.com/problems/invert-binary-tree/", null),
    ],
  },
  {
    day: 17, title: "Day 17 : Binary Trees (Part 2)",
    problems: [
      p("d17p1", "Diameter of Binary Tree", "Easy", ["Amazon", "Google"], "https://leetcode.com/problems/diameter-of-binary-tree/", null),
      p("d17p2", "Binary Tree Maximum Path Sum", "Hard", ["Amazon", "Meta"], "https://leetcode.com/problems/binary-tree-maximum-path-sum/", null, "Pro"),
      p("d17p3", "Count Complete Tree Nodes", "Medium", ["Google"], "https://leetcode.com/problems/count-complete-tree-nodes/", null),
      p("d17p4", "Balanced Binary Tree", "Easy", ["Amazon"], "https://leetcode.com/problems/balanced-binary-tree/", null),
      p("d17p5", "Lowest Common Ancestor", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", null),
      p("d17p6", "Zigzag Level Order Traversal", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", null),
    ],
  },
  {
    day: 18, title: "Day 18 : Binary Trees (Part 3)",
    problems: [
      p("d18p1", "Construct Tree from Preorder & Inorder", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", null),
      p("d18p2", "Serialize and Deserialize Binary Tree", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", null, "Pro"),
      p("d18p3", "Flatten Binary Tree to Linked List", "Medium", ["Amazon"], "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", null),
      p("d18p4", "Maximum Width of Binary Tree", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/maximum-width-of-binary-tree/", null),
      p("d18p5", "All Nodes Distance K in Binary Tree", "Medium", ["Amazon", "Flipkart"], "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", null),
      p("d18p6", "Burning Tree Problem", "Hard", ["Amazon", "Flipkart"], "https://www.geeksforgeeks.org/burning-tree/", null, "Pro"),
    ],
  },
  {
    day: 19, title: "Day 19 : Binary Trees (Part 4)",
    problems: [
      p("d19p1", "Right View of Binary Tree", "Medium", ["Amazon", "Flipkart"], "https://leetcode.com/problems/binary-tree-right-side-view/", null),
      p("d19p2", "Left View of Binary Tree", "Medium", ["Amazon"], "https://www.geeksforgeeks.org/print-left-view-binary-tree/", null),
      p("d19p3", "Top View of Binary Tree", "Medium", ["Amazon"], "https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/", null),
      p("d19p4", "Bottom View of Binary Tree", "Medium", ["Flipkart", "Amazon"], "https://www.geeksforgeeks.org/bottom-view-binary-tree/", null),
      p("d19p5", "Vertical Order Traversal", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", null),
      p("d19p6", "Count Nodes in Complete Binary Tree", "Medium", ["Google"], "https://leetcode.com/problems/count-complete-tree-nodes/", null),
    ],
  },
  {
    day: 20, title: "Day 20 : BST (Part 1)",
    problems: [
      p("d20p1", "Search in a BST", "Easy", ["Amazon", "Google"], "https://leetcode.com/problems/search-in-a-binary-search-tree/", null),
      p("d20p2", "Insert into a BST", "Medium", ["Amazon"], "https://leetcode.com/problems/insert-into-a-binary-search-tree/", null),
      p("d20p3", "Delete Node in BST", "Medium", ["Amazon"], "https://leetcode.com/problems/delete-node-in-a-bst/", null),
      p("d20p4", "Validate BST", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/validate-binary-search-tree/", null),
      p("d20p5", "Kth Smallest Element in BST", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", null),
    ],
  },
  {
    day: 21, title: "Day 21 : BST (Part 2)",
    problems: [
      p("d21p1", "Inorder Successor in BST", "Medium", ["Amazon", "Microsoft"], "https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/", null),
      p("d21p2", "Floor and Ceil in BST", "Medium", ["Flipkart", "Amazon"], "https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/", null),
      p("d21p3", "Two Sum in BST", "Easy", ["Amazon"], "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", null),
      p("d21p4", "BST to Greater Sum Tree", "Medium", ["Amazon"], "https://leetcode.com/problems/convert-bst-to-greater-tree/", null),
      p("d21p5", "Recover BST", "Hard", ["Amazon"], "https://leetcode.com/problems/recover-binary-search-tree/", null, "Pro"),
    ],
  },
  {
    day: 22, title: "Day 22 : BST (Part 3)",
    problems: [
      p("d22p1", "Construct BST from Preorder", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", null),
      p("d22p2", "Convert Sorted Array to BST", "Easy", ["Amazon"], "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", null),
      p("d22p3", "Merge Two BSTs", "Hard", ["Amazon", "Uber"], "https://www.geeksforgeeks.org/merge-two-bsts-with-limited-extra-space/", null, "Pro"),
      p("d22p4", "Largest BST in Binary Tree", "Hard", ["Amazon"], "https://www.geeksforgeeks.org/largest-bst-binary-tree/", null),
      p("d22p5", "BST Iterator", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/binary-search-tree-iterator/", null),
    ],
  },
  {
    day: 23, title: "Day 23 : Heaps",
    problems: [
      p("d23p1", "Kth Largest Element in an Array", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/kth-largest-element-in-an-array/", null),
      p("d23p2", "Top K Frequent Elements", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/top-k-frequent-elements/", null),
      p("d23p3", "K Closest Points to Origin", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/k-closest-points-to-origin/", null),
      p("d23p4", "Find Median from Data Stream", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/find-median-from-data-stream/", null, "Pro"),
      p("d23p5", "Merge K Sorted Lists", "Hard", ["Amazon", "Microsoft"], "https://leetcode.com/problems/merge-k-sorted-lists/", null),
      p("d23p6", "Task Scheduler", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/task-scheduler/", null),
    ],
  },
  {
    day: 24, title: "Day 24 : Tries",
    problems: [
      p("d24p1", "Implement Trie", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/implement-trie-prefix-tree/", null),
      p("d24p2", "Add and Search Word", "Medium", ["Amazon"], "https://leetcode.com/problems/design-add-and-search-words-data-structure/", null),
      p("d24p3", "Word Search II", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/word-search-ii/", null, "Pro"),
      p("d24p4", "Longest Word in Dictionary", "Medium", ["Amazon"], "https://leetcode.com/problems/longest-word-in-dictionary/", null),
      p("d24p5", "Maximum XOR of Two Numbers", "Medium", ["Amazon"], "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", null, "Pro"),
    ],
  },
  {
    day: 25, title: "Day 25 : Graphs (Part 1)",
    problems: [
      p("d25p1", "Number of Islands", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/number-of-islands/", null),
      p("d25p2", "Flood Fill", "Easy", ["Amazon", "Microsoft"], "https://leetcode.com/problems/flood-fill/", null),
      p("d25p3", "Clone Graph", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/clone-graph/", null),
      p("d25p4", "Rotten Oranges (BFS)", "Medium", ["Amazon", "Uber"], "https://leetcode.com/problems/rotting-oranges/", null),
      p("d25p5", "01 Matrix", "Medium", ["Amazon"], "https://leetcode.com/problems/01-matrix/", null),
      p("d25p6", "Surrounded Regions", "Medium", ["Amazon"], "https://leetcode.com/problems/surrounded-regions/", null),
    ],
  },
  {
    day: 26, title: "Day 26 : Graphs (Part 2)",
    problems: [
      p("d26p1", "Detect Cycle in Undirected Graph (BFS/DFS)", "Medium", ["Amazon", "Google"], "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", null),
      p("d26p2", "Detect Cycle in Directed Graph", "Medium", ["Amazon"], "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/", null),
      p("d26p3", "Topological Sort (BFS — Kahn's Algorithm)", "Medium", ["Amazon", "Microsoft"], "https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/", null),
      p("d26p4", "Course Schedule", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/course-schedule/", null),
      p("d26p5", "Course Schedule II", "Medium", ["Amazon", "Meta"], "https://leetcode.com/problems/course-schedule-ii/", null),
      p("d26p6", "Bipartite Graph Check", "Medium", ["Amazon"], "https://leetcode.com/problems/is-graph-bipartite/", null),
    ],
  },
  {
    day: 27, title: "Day 27 : Graphs (Part 3)",
    problems: [
      p("d27p1", "Number of Connected Components", "Medium", ["LinkedIn", "Amazon"], "https://www.geeksforgeeks.org/connected-components-in-an-undirected-graph/", null),
      p("d27p2", "Redundant Connection", "Medium", ["Amazon"], "https://leetcode.com/problems/redundant-connection/", null),
      p("d27p3", "Dijkstra's Shortest Path", "Medium", ["Amazon", "Google"], "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", null, "Pro"),
      p("d27p4", "Bellman-Ford Algorithm", "Medium", ["Amazon"], "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", null, "Pro"),
      p("d27p5", "Network Delay Time", "Medium", ["Amazon", "Flipkart"], "https://leetcode.com/problems/network-delay-time/", null),
      p("d27p6", "Swim in Rising Water", "Hard", ["Google"], "https://leetcode.com/problems/swim-in-rising-water/", null, "Pro"),
      p("d27p7", "Cheapest Flights Within K Stops", "Medium", ["Google", "Lyft"], "https://leetcode.com/problems/cheapest-flights-within-k-stops/", null),
    ],
  },
  {
    day: 28, title: "Day 28 : Graphs (Part 4)",
    problems: [
      p("d28p1", "Word Ladder", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/word-ladder/", null),
      p("d28p2", "Alien Dictionary (Topological Sort)", "Hard", ["Google", "Amazon"], "https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/", null, "Pro"),
      p("d28p3", "Critical Connections in Network", "Hard", ["Amazon"], "https://leetcode.com/problems/critical-connections-in-a-network/", null, "Pro"),
      p("d28p4", "Pacific Atlantic Water Flow", "Medium", ["Salesforce", "Google"], "https://leetcode.com/problems/pacific-atlantic-water-flow/", null),
      p("d28p5", "Strongly Connected Components (Kosaraju)", "Hard", ["Amazon", "Google"], "https://www.geeksforgeeks.org/strongly-connected-components/", null),
      p("d28p6", "Minimum Spanning Tree (Kruskal & Prim)", "Medium", ["Amazon"], "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", null),
      p("d28p7", "Accounts Merge", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/accounts-merge/", null),
    ],
  },
  {
    day: 29, title: "Day 29 : DP (Part 1) — 1D DP",
    problems: [
      p("d29p1", "Climbing Stairs", "Easy", ["Amazon", "Google"], "https://leetcode.com/problems/climbing-stairs/", null),
      p("d29p2", "House Robber", "Medium", ["Amazon"], "https://leetcode.com/problems/house-robber/", null),
      p("d29p3", "House Robber II", "Medium", ["Amazon"], "https://leetcode.com/problems/house-robber-ii/", null),
      p("d29p4", "Frog Jump (Min Cost)", "Medium", ["Amazon", "Google"], "https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/", null),
      p("d29p5", "Min Cost Climbing Stairs", "Easy", ["Google"], "https://leetcode.com/problems/min-cost-climbing-stairs/", null),
    ],
  },
  {
    day: 30, title: "Day 30 : DP (Part 2) — Knapsack",
    problems: [
      p("d30p1", "0-1 Knapsack Problem", "Medium", ["Amazon", "Google"], "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", null, "Pro"),
      p("d30p2", "Coin Change Problem", "Medium", ["Amazon", "Apple"], "https://leetcode.com/problems/coin-change/", null),
      p("d30p3", "Partition Equal Subset Sum", "Medium", ["Amazon"], "https://leetcode.com/problems/partition-equal-subset-sum/", null),
      p("d30p4", "Target Sum", "Medium", ["Google"], "https://leetcode.com/problems/target-sum/", null),
      p("d30p5", "Last Stone Weight II", "Medium", ["Google"], "https://leetcode.com/problems/last-stone-weight-ii/", null),
      p("d30p6", "Unbounded Knapsack / Rod Cutting", "Hard", ["Amazon"], "https://www.geeksforgeeks.org/rod-cutting-dp-13/", null, "Pro"),
    ],
  },
  {
    day: 31, title: "Day 31 : DP (Part 3) — LCS & Grid DP",
    problems: [
      p("d31p1", "Longest Common Subsequence", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/longest-common-subsequence/", null, "Pro"),
      p("d31p2", "Edit Distance", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/edit-distance/", null, "Pro"),
      p("d31p3", "Unique Paths", "Medium", ["Amazon"], "https://leetcode.com/problems/unique-paths/", null),
      p("d31p4", "Minimum Path Sum", "Medium", ["Amazon"], "https://leetcode.com/problems/minimum-path-sum/", null),
      p("d31p5", "Maximal Square", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/maximal-square/", null),
    ],
  },
  {
    day: 32, title: "Day 32 : DP (Part 4) — Advanced",
    problems: [
      p("d32p1", "Longest Increasing Subsequence", "Medium", ["Amazon", "Microsoft"], "https://leetcode.com/problems/longest-increasing-subsequence/", null, "Pro"),
      p("d32p2", "Burst Balloons (MCM)", "Hard", ["Google"], "https://leetcode.com/problems/burst-balloons/", null, "Pro"),
      p("d32p3", "Best Time to Buy and Sell Stock III", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", null),
      p("d32p4", "Regular Expression Matching", "Hard", ["Google", "Meta"], "https://leetcode.com/problems/regular-expression-matching/", null, "Pro"),
      p("d32p5", "Egg Drop Problem", "Hard", ["Google", "Amazon"], "https://leetcode.com/problems/super-egg-drop/", null, "Pro"),
    ],
  },
  {
    day: 33, title: "Day 33 : Greedy",
    problems: [
      p("d33p1", "Jump Game", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/jump-game/", null),
      p("d33p2", "Jump Game II", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/jump-game-ii/", null),
      p("d33p3", "Gas Station", "Medium", ["Amazon", "Google"], "https://leetcode.com/problems/gas-station/", null),
      p("d33p4", "Hand of Straights", "Medium", ["Amazon"], "https://leetcode.com/problems/hand-of-straights/", null),
      p("d33p5", "Merge Triplets to Form Target", "Medium", ["Amazon"], "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/", null),
      p("d33p6", "Activity Selection Problem", "Medium", ["Amazon", "Google"], "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", null),
    ],
  },
  {
    day: 34, title: "Day 34 : Miscellaneous",
    problems: [
      p("d34p1", "Meeting Rooms II", "Medium", ["Amazon", "Snapchat"], "https://leetcode.com/problems/meeting-rooms-ii/", null),
      p("d34p2", "Find Median from Data Stream", "Hard", ["Amazon", "Google"], "https://leetcode.com/problems/find-median-from-data-stream/", null),
      p("d34p3", "Design Twitter", "Medium", ["Twitter", "Meta"], "https://leetcode.com/problems/design-twitter/", null),
      p("d34p4", "Maximum Points on a Line", "Hard", ["Amazon"], "https://leetcode.com/problems/max-points-on-a-line/", null),
      p("d34p5", "Bit Manipulation Tricks (XOR, Shifts)", "Easy", ["Amazon", "Google"], "https://www.geeksforgeeks.org/bits-manipulation-important-tactics/", null),
    ],
  },
];

const NOTES_RESOURCES = [
  { title: "CS Fundamentals", desc: "Computer Networks, DBMS, OOPs, OS", icon: "🖥️", color: "#4f46e5", url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/" },
  { title: "Python Notes", desc: "8 Files • Complete Python Guide", icon: "🐍", color: "#3b82f6", url: "https://docs.python.org/3/tutorial/" },
  { title: "Java Notes", desc: "1 File • Java Core Concepts", icon: "☕", color: "#ef4444", url: "https://dev.java/learn/" },
  { title: "HTML / CSS", desc: "1 File • Web Fundamentals", icon: "🌐", color: "#f97316", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { title: "JavaScript", desc: "9 Files • The Modern JS Tutorial", icon: "⚡", color: "#eab308", url: "https://javascript.info/" },
  { title: "Git Cheatsheet", desc: "1 File • Git Commands Reference", icon: "🐙", color: "#6b7280", url: "https://education.github.com/git-cheat-sheet-education.pdf" },
  { title: "SQL Notes", desc: "1 File • SQL Queries & Concepts", icon: "🗄️", color: "#06b6d4", url: "https://www.sqltutorial.org/sql-cheat-sheet/" },
  { title: "Web Dev Roadmap", desc: "1 File • Frontend + Backend Path", icon: "🗺️", color: "#10b981", url: "https://roadmap.sh/frontend" },
  { title: "DSA Cheatsheet PDF", desc: "Complete DSA Reference", icon: "📄", color: "#8b5cf6", url: "https://www.geeksforgeeks.org/dsa-cheat-sheet/" },
];

/* ─── COLOR MAP ─── */
const diffColor = (d: string) =>
  d === "Easy"   ? { color: "#34d399", bg: "rgba(16,185,129,0.12)" } :
  d === "Medium" ? { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" } :
                   { color: "#ef4444", bg: "rgba(239,68,68,0.12)" };

/* ─── COMPONENT ─── */
export default function DSASheetPage() {
  const [activeTab, setActiveTab] = useState<"DSA Sheet" | "DP Sheet" | "Interview Experience" | "Downloadable Notes">("DSA Sheet");
  const [searchQuery, setSearchQuery] = useState("");
  const [proMode, setProMode] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  
  // ALL 34 DAYS CLOSED BY DEFAULT
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(
    () => new Set(DSA_SHEET.map(d => `d${d.day}`))
  );

  const allProblems = DSA_SHEET.flatMap(d => d.problems);
  const totalCount = allProblems.length;
  const doneCount = allProblems.filter(pr => completedMap[pr.id]).length;

  const toggleCollapse = (key: string) => setCollapsedDays(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  const toggleExpandAll = () => {
    if (collapsedDays.size === 0) {
      // Collapse all
      setCollapsedDays(new Set(DSA_SHEET.map(d => `d${d.day}`)));
    } else {
      // Expand all
      setCollapsedDays(new Set());
    }
  };

  return (
    <div className="layout-sidebar">
      <Sidebar />
      <div className="main-content" style={{ display: "flex", flexDirection: "column" }}>

        {/* ─── TOPBAR ─── */}
        <div className="topbar" style={{ gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "15px", fontWeight: "800" }}>📑 DSA Sheet</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Beginner / Pro Level */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 12px", borderRadius: "999px",
              background: "var(--nex-surface)", border: "1px solid var(--nex-border)", fontSize: "12px", fontWeight: "700"
            }}>
              <button onClick={() => setProMode(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: !proMode ? "#f97316" : "var(--nex-text-3)", fontWeight: "700" }}>Beginner</button>
              <span style={{ color: "var(--nex-border)" }}>/</span>
              <button onClick={() => setProMode(true)} style={{ background: "transparent", border: "none", cursor: "pointer", color: proMode ? "#f97316" : "var(--nex-text-3)", fontWeight: "700" }}>Pro Level</button>
              <span style={{ fontSize: "14px" }}>🔥</span>
            </div>

            {/* Saved toggle */}
            <button
              onClick={() => setActiveTab(activeTab === "Downloadable Notes" ? "DSA Sheet" : "Downloadable Notes")}
              style={{ padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)", cursor: "pointer" }}>
              🔖 Saved
            </button>

            {/* Score */}
            <div style={{
              padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "800",
              background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316"
            }}>
              {doneCount}/{totalCount} ✓
            </div>
          </div>
        </div>

        {/* ─── HERO / TAB HEADER ─── */}
        <div style={{ padding: "20px 24px 0" }}>
          <div className="glass" style={{ padding: "20px 24px", borderRadius: "14px", marginBottom: "16px", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, right: 0, width: "300px", height: "100%",
              background: "radial-gradient(ellipse at right, rgba(249,115,22,0.08) 0%, transparent 70%)",
              pointerEvents: "none"
            }} />
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "6px" }}>
                  <span style={{ color: "#f97316" }}>
                    {activeTab === "DP Sheet" ? "DP Sheet" : activeTab === "Downloadable Notes" ? "Study Material" : activeTab === "Interview Experience" ? "Interview Experience" : "DSA Sheet"}
                  </span>
                  {" — "}
                  <span style={{ color: "var(--nex-text-1)" }}>
                    {activeTab === "DP Sheet" ? "Important DP Patterns for Interviews" :
                     activeTab === "Downloadable Notes" ? "Notes, PDFs & Cheat Sheets" :
                     activeTab === "Interview Experience" ? "Tier-1 Company Interview Breakdowns" :
                     "Most Important Interview Questions"}
                  </span>
                </h2>
                <div style={{ display: "flex", gap: "16px", fontSize: "13px", fontWeight: "700", marginBottom: "8px" }}>
                  <span style={{ color: "#34d399" }}>• Easy: 41</span>
                  <span style={{ color: "#f59e0b" }}>| Medium: 119</span>
                  <span style={{ color: "#ef4444" }}>| Hard: 33</span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>439+ engineers currently solving · Updated August 2026</div>
              </div>
              {/* Tabs (right side) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "175px" }}>
                {([
                  { id: "DSA Sheet", icon: "📄" },
                  { id: "DP Sheet", icon: "⚡" },
                  { id: "Interview Experience", icon: "💼" },
                  { id: "Downloadable Notes", icon: "📥" },
                ] as const).map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    padding: "8px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                    textAlign: "left", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
                    background: activeTab === tab.id ? "rgba(249,115,22,0.12)" : "transparent",
                    color: activeTab === tab.id ? "#f97316" : "var(--nex-text-3)",
                    borderLeft: activeTab === tab.id ? "3px solid #f97316" : "3px solid transparent",
                  }}>
                    {tab.icon} {tab.id}
                  </button>
                ))}
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: "14px", height: "3px", borderRadius: "999px", background: "var(--nex-surface)" }}>
              <div style={{ height: "100%", width: `${(doneCount / totalCount) * 100}%`, background: "linear-gradient(90deg, #f97316, #ef4444)", borderRadius: "999px", transition: "width 0.4s" }} />
            </div>
          </div>

          {/* Search & Accordion Controls */}
          {(activeTab === "DSA Sheet" || activeTab === "DP Sheet") && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: "420px" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--nex-text-3)", fontSize: "14px" }}>🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search problem, algorithm, company..."
                  className="nex-input"
                  style={{ paddingLeft: "36px", paddingRight: "16px", fontSize: "13px" }}
                />
              </div>
              <button
                onClick={toggleExpandAll}
                className="btn-ghost btn-sm"
                style={{ borderRadius: "8px", fontSize: "12px", fontWeight: "700", border: "1px solid var(--nex-border)" }}
              >
                {collapsedDays.size === 0 ? "📁 Collapse All Days" : "📂 Expand All Days"}
              </button>
              <span style={{ fontSize: "12px", color: "var(--nex-text-3)" }}>
                💡 Click any day below to expand and view its questions
              </span>
            </div>
          )}
        </div>

        {/* ─── CONTENT AREA ─── */}
        <div style={{ padding: "0 24px 24px", flex: 1, overflowY: "auto" }}>

          {/* ══ DSA SHEET ══ */}
          {activeTab === "DSA Sheet" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {DSA_SHEET.map(day => {
                const key = `d${day.day}`;
                const collapsed = collapsedDays.has(key);
                const filtered = day.problems.filter(pr => {
                  if (proMode && pr.level !== "Pro") return false;
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return pr.title.toLowerCase().includes(q) || pr.companies.some(c => c.toLowerCase().includes(q));
                });
                if (filtered.length === 0 && searchQuery) return null;
                const done = day.problems.filter(pr => completedMap[pr.id]).length;

                return (
                  <div key={key} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--nex-border)", background: "var(--nex-bg-2)" }}>
                    {/* Day header */}
                    <button onClick={() => toggleCollapse(key)} style={{
                      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 20px", background: collapsed ? "transparent" : "var(--nex-surface)", border: "none", cursor: "pointer",
                      transition: "background 0.2s"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "800", color: "#f97316" }}>{day.title}</span>
                        <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: "rgba(249,115,22,0.1)", color: "#f97316", fontWeight: "700" }}>
                          {day.problems.length} Questions
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ height: "5px", width: "90px", borderRadius: "999px", background: "var(--nex-surface)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${done / day.problems.length * 100}%`, background: "#f97316", borderRadius: "999px" }} />
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--nex-text-3)", minWidth: "40px", fontWeight: "600" }}>{done}/{day.problems.length}</span>
                        <span style={{ color: "#f97316", fontSize: "13px", fontWeight: "900" }}>{collapsed ? "▼ Expand" : "▲ Close"}</span>
                      </div>
                    </button>

                    {!collapsed && (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                          <thead>
                            <tr style={{ borderTop: "1px solid var(--nex-border)", color: "var(--nex-text-3)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                              {["", "Problem", "Article", "Practice", "Level", "Timer", "Company", "Save"].map((h, i) => (
                                <th key={i} style={{ padding: "10px 14px", textAlign: i > 1 ? "center" : "left", fontWeight: "700", background: "rgba(255,255,255,0.02)" }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filtered.map(pr => {
                              const done = !!completedMap[pr.id];
                              const saved = !!bookmarkedMap[pr.id];
                              const dc = diffColor(pr.difficulty);
                              return (
                                <tr key={pr.id} style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: done ? "rgba(16,185,129,0.02)" : "transparent" }}>
                                  {/* Checkbox */}
                                  <td style={{ padding: "12px 14px", width: "36px" }}>
                                    <input type="checkbox" checked={done}
                                      onChange={() => setCompletedMap(p => ({ ...p, [pr.id]: !p[pr.id] }))}
                                      style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#f97316" }} />
                                  </td>
                                  {/* Title */}
                                  <td style={{ padding: "12px 14px", maxWidth: "280px" }}>
                                    <span style={{ fontWeight: "700", color: done ? "var(--nex-text-3)" : "var(--nex-text-1)", textDecoration: done ? "line-through" : "none", lineHeight: "1.4" }}>
                                      {pr.title}
                                    </span>
                                  </td>
                                  {/* Article */}
                                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                    {pr.articleUrl ? (
                                      <a href={pr.articleUrl} target="_blank" rel="noreferrer"
                                        title="Read article (TakeUForward)"
                                        style={{
                                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                                          width: "32px", height: "32px", borderRadius: "50%",
                                          background: "var(--nex-surface)", border: "1px solid var(--nex-border)",
                                          color: "var(--nex-text-2)", fontSize: "11px", fontWeight: "800", textDecoration: "none"
                                        }}>
                                        M≡
                                      </a>
                                    ) : (
                                      <span style={{ fontSize: "10px", color: "var(--nex-text-3)", lineHeight: "1.2" }}>Coming<br />Soon</span>
                                    )}
                                  </td>
                                  {/* Practice — LeetCode */}
                                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                    {pr.leetcodeUrl ? (
                                      <a href={pr.leetcodeUrl} target="_blank" rel="noreferrer"
                                        title="Practice on LeetCode / GFG"
                                        style={{
                                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                                          width: "32px", height: "32px", borderRadius: "50%",
                                          background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)",
                                          color: "#f97316", fontSize: "12px", fontWeight: "800", textDecoration: "none"
                                        }}>
                                        {"</>"}
                                      </a>
                                    ) : (
                                      <span style={{ fontSize: "10px", color: "var(--nex-text-3)" }}>—</span>
                                    )}
                                  </td>
                                  {/* Level */}
                                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "800", padding: "3px 9px", borderRadius: "6px", color: dc.color, background: dc.bg }}>
                                      {pr.difficulty}
                                    </span>
                                  </td>
                                  {/* Timer */}
                                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                    <span style={{ fontSize: "11px", color: "var(--nex-text-3)", fontWeight: "600" }}>30Min</span>
                                  </td>
                                  {/* Company with Real Brand Logos */}
                                  <td style={{ padding: "12px 14px" }}>
                                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                      {pr.companies.slice(0, 3).map((c, i) => (
                                        <span key={i} title={c} style={{
                                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                                          width: "22px", height: "22px", borderRadius: "50%",
                                          background: "var(--nex-surface)", border: "1px solid var(--nex-border)"
                                        }}>
                                          <CompanyLogo name={c} size={13} />
                                        </span>
                                      ))}
                                      {pr.companies.length > 3 && (
                                        <span style={{ fontSize: "10px", color: "var(--nex-text-3)", fontWeight: "700" }}>+{pr.companies.length - 3}</span>
                                      )}
                                    </div>
                                  </td>
                                  {/* Save */}
                                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                    <button onClick={() => setBookmarkedMap(p => ({ ...p, [pr.id]: !p[pr.id] }))}
                                      style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "15px", color: saved ? "#f97316" : "var(--nex-text-3)" }}
                                      title={saved ? "Bookmarked" : "Bookmark"}>
                                      🔖
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ══ DP SHEET ══ */}
          {activeTab === "DP Sheet" && (
            <div className="glass" style={{ padding: "24px", borderRadius: "14px" }}>
              <p style={{ color: "var(--nex-text-2)", fontSize: "13px", marginBottom: "20px" }}>
                Curated Dynamic Programming problems grouped by pattern. Master all DP patterns for Tier-1 placements.
              </p>
              {[
                { section: "1D DP", problems: [
                  { title: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number/", diff: "Easy" as const },
                  { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", diff: "Easy" as const },
                  { title: "House Robber", url: "https://leetcode.com/problems/house-robber/", diff: "Medium" as const },
                  { title: "Frog Jump", url: "https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/", diff: "Medium" as const },
                  { title: "Min Cost Climbing Stairs", url: "https://leetcode.com/problems/min-cost-climbing-stairs/", diff: "Easy" as const },
                  { title: "House Robber II", url: "https://leetcode.com/problems/house-robber-ii/", diff: "Medium" as const },
                ]},
                { section: "Knapsack", problems: [
                  { title: "0-1 Knapsack Problem", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", diff: "Medium" as const },
                  { title: "Last Stone Weight II", url: "https://leetcode.com/problems/last-stone-weight-ii/", diff: "Medium" as const },
                  { title: "Unbounded Knapsack", url: "https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/", diff: "Medium" as const },
                  { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/", diff: "Medium" as const },
                  { title: "Partition Equal Subset Sum", url: "https://leetcode.com/problems/partition-equal-subset-sum/", diff: "Medium" as const },
                  { title: "Target Sum", url: "https://leetcode.com/problems/target-sum/", diff: "Medium" as const },
                  { title: "Rod Cutting DP", url: "https://www.geeksforgeeks.org/rod-cutting-dp-13/", diff: "Hard" as const },
                ]},
                { section: "LCS", problems: [
                  { title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/", diff: "Medium" as const },
                  { title: "Edit Distance", url: "https://leetcode.com/problems/edit-distance/", diff: "Hard" as const },
                  { title: "Longest Palindromic Subsequence", url: "https://leetcode.com/problems/longest-palindromic-subsequence/", diff: "Medium" as const },
                  { title: "Distinct Subsequences", url: "https://leetcode.com/problems/distinct-subsequences/", diff: "Hard" as const },
                  { title: "Wildcard Matching", url: "https://leetcode.com/problems/wildcard-matching/", diff: "Hard" as const },
                  { title: "Shortest Common Supersequence", url: "https://leetcode.com/problems/shortest-common-supersequence/", diff: "Hard" as const },
                ]},
                { section: "Grid DP", problems: [
                  { title: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/", diff: "Medium" as const },
                  { title: "Unique Paths II", url: "https://leetcode.com/problems/unique-paths-ii/", diff: "Medium" as const },
                  { title: "Minimum Path Sum", url: "https://leetcode.com/problems/minimum-path-sum/", diff: "Medium" as const },
                  { title: "Triangle", url: "https://leetcode.com/problems/triangle/", diff: "Medium" as const },
                  { title: "Maximal Square", url: "https://leetcode.com/problems/maximal-square/", diff: "Medium" as const },
                  { title: "Cherry Pickup", url: "https://leetcode.com/problems/cherry-pickup/", diff: "Hard" as const },
                  { title: "Dungeon Game", url: "https://leetcode.com/problems/dungeon-game/", diff: "Hard" as const },
                ]},
                { section: "Stock DP", problems: [
                  { title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", diff: "Easy" as const },
                  { title: "Best Time to Buy II", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", diff: "Medium" as const },
                  { title: "Best Time to Buy III", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", diff: "Hard" as const },
                  { title: "Best Time to Buy IV", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", diff: "Hard" as const },
                  { title: "Best Time with Cooldown", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", diff: "Medium" as const },
                ]},
              ].map(({ section, problems }) => (
                <div key={section} style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#f97316", marginBottom: "8px", paddingBottom: "6px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                    {section} <span style={{ color: "var(--nex-text-3)", fontWeight: "600" }}>({problems.length})</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {problems.map((pr) => {
                      const dc = diffColor(pr.diff);
                      return (
                        <div key={pr.title} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", borderRadius: "8px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)" }}>
                          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--nex-text-1)", flex: 1 }}>{pr.title}</span>
                          <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "4px", color: dc.color, background: dc.bg }}>{pr.diff}</span>
                          <a href={pr.url} target="_blank" rel="noreferrer"
                            style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", textDecoration: "none" }}>
                            Practice &lt;/&gt;
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ INTERVIEW EXPERIENCE ══ */}
          {activeTab === "Interview Experience" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { company: "Google SDE-1 (L3)", rounds: "4 Coding Rounds + Googlyness & Leadership", date: "Aug 2026", tags: ["Graph BFS/DFS", "DP on Trees", "System Design", "Behavioral"], color: "#4285f4" },
                { company: "Amazon SDE-2", rounds: "3 Coding Rounds + Bar Raiser + LP Deep Dives", date: "Jul 2026", tags: ["Two Pointers", "Sliding Window", "Leadership Principles", "LLD"], color: "#ff9900" },
                { company: "Meta Production Engineer", rounds: "Systems Coding + Architecture + Cross-Functional", date: "Aug 2026", tags: ["Consistent Hashing", "Cache Invalidation", "Load Balancer Design"], color: "#1877f2" },
                { company: "Microsoft SDE-2", rounds: "2 Technical + 1 System Design + 1 Hiring Manager", date: "Jul 2026", tags: ["Binary Trees", "Graph Traversal", "OOP Design Patterns"], color: "#00a1f1" },
                { company: "Flipkart SDE-1", rounds: "1 Machine Coding + 2 DS/Algo + 1 System Design", date: "Jun 2026", tags: ["Arrays & DP", "Machine Coding Round", "HLD Basics"], color: "#f7c948" },
              ].map((exp, i) => (
                <div key={i} className="glass" style={{ padding: "18px 20px", borderRadius: "12px", borderLeft: `3px solid ${exp.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--nex-text-1)" }}>{exp.company}</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{exp.date}</span>
                      <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "5px", background: "rgba(16,185,129,0.12)", color: "#34d399", fontWeight: "700" }}>✓ Offer</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--nex-text-2)", marginBottom: "10px" }}>{exp.rounds}</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {exp.tags.map(t => (
                      <span key={t} style={{ padding: "2px 9px", borderRadius: "999px", fontSize: "11px", background: "var(--nex-surface)", border: "1px solid var(--nex-border)", color: "var(--nex-text-2)", fontWeight: "600" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ DOWNLOADABLE NOTES ══ */}
          {activeTab === "Downloadable Notes" && (
            <div>
              <p style={{ color: "var(--nex-text-3)", fontSize: "13px", marginBottom: "16px" }}>
                Browse notes, PDFs, cheat sheets, and learning materials. Click &ldquo;View&rdquo; to open in a new tab.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {NOTES_RESOURCES.map(cat => (
                  <div key={cat.title} style={{ padding: "16px", borderRadius: "12px", background: "var(--nex-bg-2)", border: "1px solid var(--nex-border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "24px" }}>{cat.icon}</span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--nex-text-1)" }}>{cat.title}</div>
                        <div style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>{cat.desc}</div>
                      </div>
                    </div>
                    <a href={cat.url} target="_blank" rel="noreferrer"
                      style={{
                        display: "block", textAlign: "center", padding: "6px 12px", borderRadius: "7px",
                        fontSize: "12px", fontWeight: "700", textDecoration: "none",
                        background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316"
                      }}>
                      📥 View / Download →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── BACK TO PROBLEMS LINK ─── */}
        <div style={{ padding: "12px 24px", borderTop: "1px solid var(--nex-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/problems" style={{ fontSize: "12px", color: "var(--nex-text-3)", textDecoration: "none" }}>← All Problems</Link>
          <span style={{ fontSize: "11px", color: "var(--nex-text-3)" }}>Nexvora DSA Sheet • 34 Days • 193 Problems</span>
        </div>
      </div>
    </div>
  );
}
