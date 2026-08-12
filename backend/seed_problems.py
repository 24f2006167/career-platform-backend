"""
Nexvora — Seed starter problems

Run: python seed_problems.py (from backend/ directory with venv active)
"""
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

from app.core.database import SessionLocal
from app.models.problem import Problem
from app.models.test_case import TestCase

PROBLEMS = [
    {
        "title": "Two Sum",
        "slug": "two-sum",
        "description": """## Problem

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Input Format
- First line: space-separated integers (the array)
- Second line: target integer

## Output Format
- Two space-separated integers (0-indexed positions)

## Constraints
- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- Only one valid answer exists.
""",
        "difficulty": "easy",
        "topic_tags": ["Array", "Hash Map"],
        "company_tags": ["Google", "Amazon", "Facebook"],
        "constraints": "2 <= nums.length <= 10⁴, -10⁹ <= nums[i] <= 10⁹",
        "examples": [
            {"input": "[2,7,11,15]\n9", "output": "0 1", "explanation": "nums[0] + nums[1] = 2 + 7 = 9"},
            {"input": "[3,2,4]\n6", "output": "1 2", "explanation": "nums[1] + nums[2] = 2 + 4 = 6"},
        ],
        "hints": [
            "Think about how to find the complement of each number.",
            "Can you store previously seen values in a data structure for O(1) lookup?",
            "A hash map (dictionary) gives O(1) average lookup time.",
        ],
        "points": 10,
        "test_cases": [
            {"input": "[2,7,11,15]\n9", "output": "0 1", "hidden": False, "explanation": "Basic case"},
            {"input": "[3,2,4]\n6", "output": "1 2", "hidden": False},
            {"input": "[3,3]\n6", "output": "0 1", "hidden": True},
            {"input": "[1,2,3,4,5]\n9", "output": "3 4", "hidden": True},
            {"input": "[-1,-2,-3,-4,-5]\n-8", "output": "2 4", "hidden": True},
        ],
        "starter_code": """# Read input
line1 = input().strip()
line2 = input().strip()

# Parse array: "[2,7,11,15]" -> [2,7,11,15]
nums = list(map(int, line1.strip('[]').split(',')))
target = int(line2)

# Your solution here
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

result = twoSum(nums, target)
print(result[0], result[1])
""",
    },
    {
        "title": "Valid Parentheses",
        "slug": "valid-parentheses",
        "description": """## Problem

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Input Format
- A single string of bracket characters

## Output Format
- `True` if valid, `False` otherwise

## Constraints
- `1 <= s.length <= 10⁴`
- `s` consists of parentheses only `'()[]{}'`
""",
        "difficulty": "easy",
        "topic_tags": ["String", "Stack"],
        "company_tags": ["Amazon", "Google", "Microsoft"],
        "constraints": "1 <= s.length <= 10⁴",
        "examples": [
            {"input": "()", "output": "True"},
            {"input": "()[]{}", "output": "True"},
            {"input": "(]", "output": "False"},
        ],
        "hints": [
            "Use a stack to track opening brackets.",
            "When you see a closing bracket, check if the top of the stack is its matching opener.",
            "At the end, the stack must be empty for the string to be valid.",
        ],
        "points": 10,
        "test_cases": [
            {"input": "()", "output": "True", "hidden": False},
            {"input": "()[]{}", "output": "True", "hidden": False},
            {"input": "(]", "output": "False", "hidden": False},
            {"input": "([)]", "output": "False", "hidden": True},
            {"input": "{[]}", "output": "True", "hidden": True},
            {"input": "", "output": "True", "hidden": True},
            {"input": "((((", "output": "False", "hidden": True},
        ],
    },
    {
        "title": "Reverse Linked List",
        "slug": "reverse-linked-list",
        "description": """## Problem

Given the head of a singly linked list, reverse the list, and return the reversed list.

For this problem, the linked list is represented as space-separated integers. Output the reversed sequence.

## Input Format
- Space-separated integers representing the linked list (or "null" for empty)

## Output Format
- Space-separated integers of the reversed list

## Constraints
- The number of nodes in the list is in the range `[0, 5000]`
- `-5000 <= Node.val <= 5000`
""",
        "difficulty": "easy",
        "topic_tags": ["Linked List", "Recursion"],
        "company_tags": ["Amazon", "Apple", "Google"],
        "constraints": "0 <= n <= 5000, -5000 <= val <= 5000",
        "examples": [
            {"input": "1 2 3 4 5", "output": "5 4 3 2 1"},
            {"input": "1 2", "output": "2 1"},
            {"input": "null", "output": "null"},
        ],
        "hints": [
            "Think about keeping track of the previous node.",
            "You need three pointers: prev, current, next.",
            "Iterative solution is straightforward; recursive is elegant.",
        ],
        "points": 10,
        "test_cases": [
            {"input": "1 2 3 4 5", "output": "5 4 3 2 1", "hidden": False},
            {"input": "1 2", "output": "2 1", "hidden": False},
            {"input": "null", "output": "null", "hidden": False},
            {"input": "1", "output": "1", "hidden": True},
            {"input": "1 2 3 4 5 6 7 8 9 10", "output": "10 9 8 7 6 5 4 3 2 1", "hidden": True},
        ],
    },
    {
        "title": "Maximum Subarray",
        "slug": "maximum-subarray",
        "description": """## Problem

Given an integer array `nums`, find the subarray with the largest sum, and return its sum.

## Input Format
- Space-separated integers

## Output Format
- A single integer (the maximum subarray sum)

## Constraints
- `1 <= nums.length <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`

## Follow-up
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
""",
        "difficulty": "medium",
        "topic_tags": ["Array", "Dynamic Programming", "Divide and Conquer"],
        "company_tags": ["Amazon", "Google", "Microsoft", "LinkedIn"],
        "constraints": "1 <= n <= 10⁵, -10⁴ <= nums[i] <= 10⁴",
        "examples": [
            {"input": "-2 1 -3 4 -1 2 1 -5 4", "output": "6", "explanation": "[4,-1,2,1] has the largest sum = 6"},
            {"input": "1", "output": "1"},
            {"input": "5 4 -1 7 8", "output": "23"},
        ],
        "hints": [
            "Think about Kadane's algorithm.",
            "At each position, decide: extend the current subarray or start fresh?",
            "current_max = max(nums[i], current_max + nums[i])",
        ],
        "points": 20,
        "test_cases": [
            {"input": "-2 1 -3 4 -1 2 1 -5 4", "output": "6", "hidden": False},
            {"input": "1", "output": "1", "hidden": False},
            {"input": "5 4 -1 7 8", "output": "23", "hidden": False},
            {"input": "-1", "output": "-1", "hidden": True},
            {"input": "-2 -1", "output": "-1", "hidden": True},
            {"input": "1 2 3 4 5", "output": "15", "hidden": True},
            {"input": "-3 -2 -1 -4", "output": "-1", "hidden": True},
        ],
    },
    {
        "title": "Binary Search",
        "slug": "binary-search",
        "description": """## Problem

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`.

If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

## Input Format
- First line: space-separated sorted integers
- Second line: target integer

## Output Format
- Index of target (0-indexed), or -1 if not found

## Constraints
- `1 <= nums.length <= 10⁴`
- `-10⁴ < nums[i], target < 10⁴`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.
""",
        "difficulty": "easy",
        "topic_tags": ["Array", "Binary Search"],
        "company_tags": ["Google", "Amazon", "Facebook"],
        "constraints": "1 <= n <= 10⁴",
        "examples": [
            {"input": "-1 0 3 5 9 12\n9", "output": "4"},
            {"input": "-1 0 3 5 9 12\n2", "output": "-1"},
        ],
        "hints": [
            "Keep track of left and right boundaries.",
            "Calculate mid = (left + right) // 2 to avoid overflow.",
            "Narrow the search space by half each iteration.",
        ],
        "points": 10,
        "test_cases": [
            {"input": "-1 0 3 5 9 12\n9", "output": "4", "hidden": False},
            {"input": "-1 0 3 5 9 12\n2", "output": "-1", "hidden": False},
            {"input": "5\n5", "output": "0", "hidden": True},
            {"input": "1 2 3 4 5 6 7 8 9 10\n1", "output": "0", "hidden": True},
            {"input": "1 2 3 4 5 6 7 8 9 10\n10", "output": "9", "hidden": True},
            {"input": "1 2 3 4 5 6 7 8 9 10\n6", "output": "5", "hidden": True},
            {"input": "1 3 5 7 9\n8", "output": "-1", "hidden": True},
        ],
    },
]


def seed():
    db = SessionLocal()
    seeded = 0

    try:
        for p_data in PROBLEMS:
            existing = db.query(Problem).filter(Problem.slug == p_data["slug"]).first()
            if existing:
                print(f"⏭️  Skipping '{p_data['title']}' (already exists)")
                continue

            problem = Problem(
                title=p_data["title"],
                slug=p_data["slug"],
                description=p_data["description"],
                difficulty=p_data["difficulty"],
                topic_tags=p_data.get("topic_tags", []),
                company_tags=p_data.get("company_tags", []),
                constraints=p_data.get("constraints"),
                examples=p_data.get("examples", []),
                hints=p_data.get("hints", []),
                points=p_data.get("points", 10),
            )
            db.add(problem)
            db.flush()

            for i, tc in enumerate(p_data.get("test_cases", [])):
                test_case = TestCase(
                    problem_id=problem.id,
                    input_data=tc["input"],
                    expected_output=tc["output"],
                    is_hidden=tc.get("hidden", True),
                    order_index=i,
                    explanation=tc.get("explanation"),
                )
                db.add(test_case)

            seeded += 1
            print(f"✅ Seeded: {p_data['title']} ({p_data['difficulty']}) — {len(p_data.get('test_cases', []))} test cases")

        db.commit()
        print(f"\n🎉 Done! Seeded {seeded} problems.")

    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
