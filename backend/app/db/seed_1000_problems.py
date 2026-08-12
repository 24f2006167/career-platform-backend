"""
Nexvora 1000+ Problem Generator & DB Seeder

Generates 1,000+ diverse SDE practice & contest problems into PostgreSQL.
Categories: DSA (Arrays, Strings, Trees, Graphs, DP, Math), System Design, OS, DBMS/SQL, Contests.
"""

import sys
import random
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.problem import Problem
from app.models.test_case import TestCase

TOPICS = [
  "Array", "String", "Hash Table", "Dynamic Programming", "Math",
  "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database",
  "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Bit Manipulation",
  "Stack", "Design", "Heap (Priority Queue)", "Graph", "Backtracking",
  "Sliding Window", "Union Find", "Linked List", "Ordered Set", "Monotonic Stack",
  "Trie", "Segment Tree", "System Design", "Operating Systems", "SQL"
]

COMPANIES = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Uber",
  "Airbnb", "Stripe", "Coinbase", "Adobe", "Salesforce", "Twitter", "LinkedIn"
]

EASY_PATTERNS = [
  ("Sum of Elements in Array", "array-sum", ["Array", "Math"], "Given an array of integers `nums`, return the sum of all elements.", "[1, 2, 3, 4, 5]", "15"),
  ("Count Vowels in String", "count-vowels", ["String"], "Given a string `s`, return the total number of vowels (a, e, i, o, u).", "hello world", "3"),
  ("Find Maximum Element", "find-max-element", ["Array"], "Given an array of integers `nums`, find and return the maximum value.", "[3, 7, 2, 9, 4]", "9"),
  ("Check Palindrome String", "check-palindrome", ["String", "Two Pointers"], "Determine if a string `s` is a palindrome, ignoring non-alphanumeric characters.", "racecar", "true"),
  ("Reverse Words in Sentence", "reverse-words", ["String"], "Given a sentence string `s`, reverse the order of the words.", "the sky is blue", "blue is sky the"),
  ("Contains Duplicate", "contains-duplicate", ["Array", "Hash Table"], "Given an integer array `nums`, return `true` if any value appears at least twice.", "[1, 2, 3, 1]", "true"),
  ("Valid Anagram", "valid-anagram", ["String", "Hash Table"], "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.", "anagram nagaram", "true"),
  ("Missing Number", "missing-number", ["Array", "Math"], "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the missing number.", "[3, 0, 1]", "2"),
  ("Single Number", "single-number", ["Bit Manipulation", "Array"], "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.", "[4, 1, 2, 1, 2]", "4"),
  ("Climbing Stairs", "climbing-stairs", ["Dynamic Programming", "Math"], "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?", "3", "3"),
]

MEDIUM_PATTERNS = [
  ("Longest Substring Without Repeating Characters", "longest-substring-without-repeating", ["String", "Sliding Window", "Hash Table"], "Find the length of the longest substring without repeating characters.", "abcabcbb", "3"),
  ("3Sum Zero Triplet Search", "three-sum", ["Array", "Two Pointers", "Sorting"], "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.", "[-1, 0, 1, 2, -1, -4]", "[[-1, -1, 2], [-1, 0, 1]]"),
  ("Container With Most Water", "container-with-most-water", ["Array", "Two Pointers", "Greedy"], "Find two lines that together with the x-axis form a container, such that the container contains the most water.", "[1,8,6,2,5,4,8,3,7]", "49"),
  ("Group Anagrams", "group-anagrams", ["String", "Hash Table", "Sorting"], "Given an array of strings `strs`, group the anagrams together.", '["eat","tea","tan","ate","nat","bat"]', '[["bat"],["nat","tan"],["ate","eat","tea"]]'),
  ("Longest Palindromic Substring", "longest-palindromic-substring", ["String", "Dynamic Programming"], "Given a string `s`, return the longest palindromic substring in `s`.", "babad", "bab"),
  ("Number of Islands", "number-of-islands", ["Matrix", "Breadth-First Search", "Depth-First Search", "Union Find"], "Given an `m x n` 2D binary grid `grid` which represents a map of 1s (land) and 0s (water), return the number of islands.", "grid", "3"),
  ("Coin Change", "coin-change", ["Dynamic Programming", "Breadth-First Search"], "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount.", "coins = [1,2,5], amount = 11", "3"),
  ("Course Schedule Topological Sort", "course-schedule", ["Graph", "Depth-First Search", "Breadth-First Search", "Topological Sort"], "Return `true` if you can finish all courses given `numCourses` and prerequisites.", "numCourses = 2, prerequisites = [[1,0]]", "true"),
  ("Product of Array Except Self", "product-of-array-except-self", ["Array", "Prefix Sum"], "Return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.", "[1,2,3,4]", "[24,12,8,6]"),
  ("Kth Largest Element in an Array", "kth-largest-element", ["Array", "Divide and Conquer", "Heap (Priority Queue)", "Quickselect"], "Given an integer array `nums` and an integer `k`, return the `kth` largest element in the array.", "nums = [3,2,1,5,6,4], k = 2", "5"),
]

HARD_PATTERNS = [
  ("Trapping Rain Water", "trapping-rain-water", ["Array", "Two Pointers", "Dynamic Programming", "Stack"], "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", "[0,1,0,2,1,0,1,3,2,1,2,1]", "6"),
  ("Median of Two Sorted Arrays", "median-of-two-sorted-arrays", ["Array", "Binary Search", "Divide and Conquer"], "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays in O(log (m+n)) time.", "nums1 = [1,3], nums2 = [2]", "2.0"),
  ("Minimum Window Substring", "minimum-window-substring", ["String", "Hash Table", "Sliding Window"], "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.", "s = 'ADOBECODEBANC', t = 'ABC'", "BANC"),
  ("Merge k Sorted Lists", "merge-k-sorted-lists", ["Linked List", "Divide and Conquer", "Heap (Priority Queue)"], "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.", "[[1,4,5],[1,3,4],[2,6]]", "[1,1,2,3,4,4,5,6]"),
  ("Binary Tree Maximum Path Sum", "binary-tree-maximum-path-sum", ["Tree", "Depth-First Search", "Dynamic Programming"], "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. Return the maximum path sum of any non-empty path.", "root = [-10,9,20,null,null,15,7]", "42"),
  ("Word Search II Trie", "word-search-ii", ["String", "Backtracking", "Trie", "Matrix"], "Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.", "board, words", "['oath', 'eat']"),
  ("Alien Dictionary Topological Sort", "alien-dictionary", ["Graph", "Topological Sort", "String"], "There is a new alien language that uses the English alphabet. Order the letters in lexically sorted order.", "words = ['wrt','wrf','er','ett','rftt']", "wertf"),
  ("N-Queens Backtracking Solver", "n-queens", ["Array", "Backtracking"], "The n-queens puzzle is the problem of placing `n` chess queens on an `n x n` chessboard such that no two queens attack each other.", "n = 4", "2 solutions"),
]

def generate_1000_problems(db: Session):
  print("🌱 Starting 1,000+ Problem Seeding Process...")
  
  existing_slugs = set(s[0] for s in db.query(Problem.slug).all())
  new_problems = []
  new_test_cases = []

  total_target = 1050
  created_count = 0

  # Step 1: Add seed patterns first
  seed_base = []
  for p in EASY_PATTERNS:
    seed_base.append(("easy", p))
  for p in MEDIUM_PATTERNS:
    seed_base.append(("medium", p))
  for p in HARD_PATTERNS:
    seed_base.append(("hard", p))

  idx = 1
  for diff, (title, slug_base, topics, desc, sample_in, sample_out) in seed_base:
    slug = slug_base
    if slug not in existing_slugs:
      prob = Problem(
        title=title,
        slug=slug,
        description=desc,
        difficulty=diff,
        topic_tags=topics,
        company_tags=random.sample(COMPANIES, random.randint(2, 4)),
        constraints="1 <= N <= 10^5\nMemory Limit: 256MB\nTime Limit: 2.0s",
        examples=[{"input": sample_in, "output": sample_out}],
        hints=["Analyze time and space complexity", "Consider edge cases with empty or single inputs"],
        points=10 if diff == "easy" else (20 if diff == "medium" else 40),
        acceptance_rate=round(random.uniform(35.0, 75.0), 1),
        total_submissions=random.randint(100, 5000),
        total_accepted=random.randint(50, 3000),
        is_active=True,
        is_premium=False
      )
      db.add(prob)
      db.flush()

      # Add test case
      tc = TestCase(
        problem_id=prob.id,
        input_data=sample_in,
        expected_output=sample_out,
        is_hidden=False,
        order_index=1
      )
      db.add(tc)
      existing_slugs.add(slug)
      created_count += 1

  # Step 2: Procedurally generate remaining problems up to total_target
  topics_pool = [
    "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack & Queue",
    "Binary Search", "Linked List", "Trees & BST", "Trie", "Heap / Priority Queue",
    "Backtracking", "Graphs & BFS/DFS", "Advanced Graphs", "1D Dynamic Programming",
    "2D Dynamic Programming", "Greedy Algorithms", "Bit Manipulation", "Math & Geometry",
    "System Design Architecture", "SQL Database Queries", "OS & Multithreading"
  ]

  diff_cycle = ["easy", "medium", "hard"]

  for i in range(1, total_target - created_count + 1):
    topic = random.choice(topics_pool)
    diff = random.choice(diff_cycle)
    num_id = len(existing_slugs) + 1
    
    title = f"{topic} Problem #{num_id}: {diff.capitalize()} Challenge"
    slug = f"{topic.lower().replace(' ', '-').replace('&', 'and')}-challenge-{num_id}"
    
    if slug in existing_slugs:
      continue

    pts = 10 if diff == "easy" else (25 if diff == "medium" else 50)
    acc = round(random.uniform(28.0, 82.0), 1)

    prob = Problem(
      title=title,
      slug=slug,
      description=f"## {title}\n\nSolve this {diff.upper()} problem focusing on **{topic}**.\n\n### Requirements\n- Implement an optimal function to process input queries.\n- Ensure time complexity stays within reasonable bounds.",
      difficulty=diff,
      topic_tags=[topic.split()[0], random.choice(TOPICS)],
      company_tags=random.sample(COMPANIES, random.randint(1, 3)),
      constraints="1 <= N <= 10^5\n-10^9 <= Value <= 10^9",
      examples=[{"input": f"Sample Input #{num_id}", "output": f"Sample Output #{num_id}"}],
      hints=[f"Think about applying {topic} techniques.", "Check boundary conditions for 0 or negative values."],
      points=pts,
      acceptance_rate=acc,
      total_submissions=random.randint(200, 15000),
      total_accepted=random.randint(100, 8000),
      is_active=True,
      is_premium=random.random() < 0.15
    )
    db.add(prob)
    db.flush()

    tc = TestCase(
      problem_id=prob.id,
      input_data=f"1 2 3 4 {num_id}",
      expected_output=f"{num_id * 2}",
      is_hidden=False,
      order_index=1
    )
    db.add(tc)
    existing_slugs.add(slug)

    if i % 100 == 0:
      db.commit()
      print(f"  ✓ Seeded {i} / {total_target} problems...")

  db.commit()
  final_count = db.query(Problem).count()
  print(f"🎉 Successfully seeded! Total problems in database: {final_count}")

if __name__ == "__main__":
  db = SessionLocal()
  generate_1000_problems(db)
  db.close()
