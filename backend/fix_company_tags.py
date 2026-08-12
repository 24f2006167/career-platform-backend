"""
Fix Company Tags in Postgres DB
Only keep company_tags for authentic real-world interview problems.
"""

from app.core.database import SessionLocal
from app.models.problem import Problem

REAL_INTERVIEW_SLUGS = {
  "two-sum": ["Google", "Amazon", "Meta"],
  "valid-parentheses": ["Amazon", "Google", "Microsoft"],
  "maximum-subarray": ["Amazon", "Google", "Microsoft"],
  "binary-search": ["Google", "Amazon", "Meta"],
  "reverse-linked-list": ["Amazon", "Apple", "Google"],
  "array-sum": ["Adobe", "Microsoft", "Uber"],
  "count-vowels": ["Airbnb", "Meta"],
  "find-max-element": ["Airbnb", "Apple"],
  "check-palindrome": ["Meta", "Google"],
  "reverse-words": ["Amazon", "Microsoft"],
  "contains-duplicate": ["Apple", "Google"],
  "valid-anagram": ["Google", "Amazon"],
  "missing-number": ["Amazon", "Microsoft"],
  "single-number": ["Google", "Apple"],
  "climbing-stairs": ["Amazon", "Google"],
  "longest-substring-without-repeating": ["Amazon", "Google", "Meta"],
  "three-sum": ["Meta", "Amazon", "Google"],
  "container-with-most-water": ["Google", "Amazon"],
  "group-anagrams": ["Amazon", "Google"],
  "longest-palindromic-substring": ["Amazon", "Microsoft"],
  "number-of-islands": ["Amazon", "Google", "Meta"],
  "coin-change": ["Amazon", "Google"],
  "course-schedule": ["Google", "Amazon"],
  "product-of-array-except-self": ["Amazon", "Meta"],
  "kth-largest-element": ["Meta", "Amazon"],
  "trapping-rain-water": ["Google", "Amazon"],
  "median-of-two-sorted-arrays": ["Google", "Microsoft"],
  "minimum-window-substring": ["Meta", "Google"],
  "merge-k-sorted-lists": ["Google", "Amazon"],
  "binary-tree-maximum-path-sum": ["Meta", "Google"],
  "word-search-ii": ["Amazon", "Google"],
  "alien-dictionary": ["Google", "Meta"],
  "n-queens": ["Google", "Amazon"]
}

def fix_tags():
  db = SessionLocal()
  problems = db.query(Problem).all()
  updated = 0

  for p in problems:
    if p.slug in REAL_INTERVIEW_SLUGS:
      p.company_tags = REAL_INTERVIEW_SLUGS[p.slug]
    else:
      p.company_tags = []
    updated += 1

  db.commit()
  print(f"✅ Updated {updated} problems in DB! Company tags filtered strictly to real interview questions.")

if __name__ == "__main__":
  fix_tags()
