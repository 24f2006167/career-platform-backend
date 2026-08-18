# Nexvora AI Developer Career Platform 🚀

[![Build & Deploy](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://career-platform-backend.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/PostgreSQL-16+-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Nexvora** is an AI-powered developer career platform, interactive skill verifier, mock interview suite, comprehensive 34-day DSA sheet, and online coding judge. Built with **Next.js 16 (React 19, TypeScript, TailwindCSS 4)** and a **FastAPI (Python, SQLAlchemy ORM, Pydantic, Native Bcrypt, JWT)** backend service.

---

## 🔗 Live Application & API Links

- **Live Production App (Vercel)**: [https://career-platform-backend.vercel.app](https://career-platform-backend.vercel.app)
- **Alternate Production URL**: [https://career-platform-backend-rzja.vercel.app](https://career-platform-backend-rzja.vercel.app)
- **GitHub Repository**: [https://github.com/24f2006167/career-platform-backend](https://github.com/24f2006167/career-platform-backend)
- **Local Dev Frontend**: `http://localhost:3000`
- **Local Dev Backend API**: `http://127.0.0.1:8001`
- **API Swagger Documentation**: `http://127.0.0.1:8001/docs`

---

## 🔑 Test Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Candidate** | `dpeeuuit2024@gmail.com` | `Password123` | Dashboard, Practice, DSA Sheet, Roadmaps, Interviews |
| **Candidate** | `dpeeuitt2024@gmail.com` | `Password123` | Dashboard, Practice, DSA Sheet, Roadmaps, Interviews |
| **Candidate** | `dpeeuitt2025@gmail.com` | `Password123` | Dashboard, Practice, DSA Sheet, Roadmaps, Interviews |
| **Admin** | `laptop18122022@gmail.com` | `Admin@123` | Full Admin Console, User Management, Problem Seeding |

---

## ✨ Key Features & Modules

### 1. 📑 34-Day Complete DSA Sheet & DP Sheet (Apna College / Striver Alignment)
- **34 Structured Days** covering Arrays (5 parts), Strings (2 parts), Binary Search, Recursion & Backtracking, Linked Lists, Stacks & Queues, Binary Trees (4 parts), BST (3 parts), Heaps, Tries, Graphs (4 parts), Dynamic Programming (4 parts), Greedy, and Miscellaneous.
- **Accordion UX**: All days closed by default; click any day to smoothly expand and view questions with timer, difficulty, and company tags.
- **Direct Practice Links**: Each question connects to verified LeetCode & GeeksForGeeks problem pages.
- **Article & Editorial**: Direct links to TakeUForward in-depth editorial explanations.
- **Dedicated DP Sheet**: 1D DP, 0-1 Knapsack, LCS, Catalan Numbers, Grid DP, Matrix Chain Multiplication (MCM), Stock DP, and Miscellaneous.
- **Downloadable Study Notes**: Direct PDF resources for Computer Networks, DBMS, OOPs, Operating Systems, Python, Java, and JavaScript.

### 2. 💻 Coding Judge & 1,000+ Problem Bank
- **1,000+ Verified Coding Questions** categorized into Easy (350+), Medium (340+), and Hard (350+).
- **Real Company SVG Logos**: Google, Amazon, Meta, Apple, Microsoft, Netflix, Uber, Stripe, Airbnb, Bloomberg, Goldman Sachs, Adobe, ByteDance, and LinkedIn.
- **Filterable by Topic & Company**: Arrays, Strings, Dynamic Programming, Binary Search, Trees, Graphs, Two Pointers, Sliding Window, Linked List, Stack, Heap, Backtracking, and Tries.
- **Monaco Code Editor**: VS Code Dark+ theme, multi-language support (Python 3, JavaScript, C++17, Java 17), live test case runner, submission history, and AI complexity evaluation.

### 3. 🗺️ 6-Track Career Learning Roadmaps
- Complete step-by-step career path guides for:
  1. **Software Engineer**
  2. **Backend Engineer**
  3. **Frontend Engineer**
  4. **Full Stack Developer**
  5. **Data Engineer**
  6. **DevOps Engineer**
- Progress readiness meters, skill tag breakdown, and weekly actionable study plans.

### 4. 🧠 Interactive Learn & Concept Sandboxing
- Multi-language interactive quizzes with instant score tracking and XP rewards.
- Live VS Code sandboxes with complexity badges (O(n), O(log n)) for hands-on learning.

---

## 🛠️ Tech Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│              Next.js 16 App Router (Vercel)             │
│        React 19 • TypeScript • TailwindCSS • Monaco     │
└──────────────────────────┬─────────────────────────────┘
                           │ (Single-domain proxy / API rewrites)
                           ▼
┌────────────────────────────────────────────────────────┐
│                  FastAPI Backend Server                │
│         Python 3.11 • SQLAlchemy ORM • Pydantic        │
│          Native Bcrypt • JWT Security • Uvicorn        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                  PostgreSQL 16 Database                │
│   Users • 1,055 Problems • Test Cases • Submissions    │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run FastAPI server on port 8001
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to access the application.

---

© 2026 Nexvora Platform. All rights reserved.
