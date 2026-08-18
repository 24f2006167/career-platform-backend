# Nexvora AI Developer Career Platform 🚀

[![Build & Deploy](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel)](https://career-platform-backend-rzja.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/SQLAlchemy-2.0+-red?style=for-the-badge&logo=sqlite)](https://www.sqlalchemy.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**Nexvora** is an AI-powered developer career platform, interactive skill verifier, mock interview suite, and online coding judge. Built with **Next.js 16 (React 19, TypeScript, TailwindCSS 4)** and a **FastAPI (Python, SQLAlchemy ORM, Pydantic, JWT)** backend service.

---

## 🔗 Live Application & API Links

- **Live Production App (Vercel)**: [https://career-platform-backend-rzja.vercel.app](https://career-platform-backend-rzja.vercel.app)
- **GitHub Repository**: [https://github.com/24f2006167/career-platform-backend](https://github.com/24f2006167/career-platform-backend)
- **Local Dev Frontend**: `http://localhost:3000`
- **Local Dev Backend API**: `http://127.0.0.1:8001`
- **API Swagger Documentation**: `http://127.0.0.1:8001/docs`
- **Health Check Endpoint**: `http://127.0.0.1:8001/health`

---

## 📁 Repository Directory Structure

```
career_platform/
├── backend/
│   ├── alembic.ini                    # Database migrations configuration
│   ├── Procfile                       # Production web process definition
│   ├── render.yaml                    # Render Blueprint deployment definition
│   ├── requirements.txt               # Backend dependencies
│   ├── tests/
│   │   └── test_app.py                # Automated pytest & unittest suite
│   └── app/
│       ├── main.py                    # FastAPI application initialization & routes
│       ├── core/                      # Configuration, security, constants & exceptions
│       │   ├── config.py              # Environment settings
│       │   ├── constants.py           # Application enums & limits
│       │   ├── database.py            # SQLAlchemy engine & SessionLocal
│       │   ├── exceptions.py          # Custom exceptions & FastAPI handlers
│       │   └── security.py            # Password hashing & JWT token logic
│       ├── db/                        # Database mixins & sessions
│       │   ├── mixins.py              # UUIDMixin & TimestampMixin
│       │   └── session.py             # Session context manager helpers
│       ├── dependencies/              # Dependency injection
│       │   ├── auth.py                # User auth dependencies
│       │   ├── permissions.py         # Permission checker guard
│       │   └── roles.py               # Role guard (Admin, Candidate, Recruiter)
│       ├── middleware/                # Custom ASGI Middlewares
│       │   ├── auth_middleware.py     # JWT Header extractor
│       │   ├── logging_middleware.py  # HTTP execution time logger
│       │   └── rate_limit_middleware.py # Rolling window rate limiter
│       ├── models/                    # SQLAlchemy ORM Data Models
│       │   ├── achievement.py         # Achievements & user Badges
│       │   ├── ai_feedback.py         # AI feedback & resume score models
│       │   ├── exam.py                # Exam, Question, Option & Results
│       │   ├── leaderboard.py         # Leaderboard snapshots & user ranks
│       │   ├── problem.py             # Coding problems & difficulty
│       │   ├── progress.py            # Contests & User progress
│       │   ├── roadmap.py             # Role roadmaps & steps
│       │   ├── role.py                # System roles
│       │   ├── skill.py               # Skill definitions & categories
│       │   ├── submission.py          # Judge solution submissions
│       │   ├── test_case.py           # Problem hidden test cases
│       │   ├── user.py                # User accounts & Elo rating
│       │   └── user_skill.py          # User skill proficiency
│       ├── repositories/              # Repository Data Access Layer
│       │   ├── exam_repository.py     # Exam & result queries
│       │   ├── skill_repository.py    # Skill & category queries
│       │   └── user_repository.py     # User CRUD & XP tracking
│       ├── routers/                   # API Route Controllers
│       │   ├── admin_router.py        # Admin panel & AI generation endpoints
│       │   ├── ai_learning_router.py  # AI concept tutoring & practice
│       │   ├── auth_router.py         # Register, Login, Refresh tokens
│       │   ├── candidate_role_router.py # Target role & candidate roadmaps
│       │   ├── interview_router.py    # AI Mock interview room endpoints
│       │   ├── resume_router.py       # ATS resume analysis endpoints
│       │   ├── role_router.py         # System roles list
│       │   └── skill_router.py        # Skill catalog & user progression
│       ├── services/                  # Business Logic Layer
│       │   ├── ai/                    # LLM (Groq) integration services
│       │   ├── judge/                 # Subprocess sandbox code execution
│       │   └── token_service.py       # JWT creation & verification
│       └── utils/                     # Formatting, validation & helpers
│           ├── formatters.py          # Score, currency, text sanitizers
│           ├── helpers.py             # Slugs, pagination & tokens
│           └── validators.py          # Email, password strength & file validators
└── frontend/
    ├── app/                           # Next.js App Router pages
    │   ├── ai-learning/               # AI learning tutor page
    │   ├── contests/                  # Competitive coding contests page
    │   ├── dashboard/                 # Candidate, Recruiter & Admin dashboards
    │   ├── discussions/               # Developer discussion forums page
    │   ├── interviews/                # AI mock interview prep page
    │   ├── leaderboard/               # Elo rating leaderboards page
    │   ├── learn/                     # Track learning pages
    │   ├── login/                     # User login page
    │   ├── problems/                  # Online judge & Monaco editor pages
    │   ├── profile/                   # User profile & achievements page
    │   ├── roadmap/                   # Dynamic career roadmap page
    │   ├── roles/                     # Job role explorer pages
    │   ├── signup/                    # User registration page
    │   ├── layout.tsx                 # Root UI layout & navigation
    │   └── page.tsx                   # Platform homepage
    ├── components/                    # Reusable React Components
    ├── lib/                           # Axios API client setup (`api.ts`)
    ├── services/                      # Frontend API Service layer
    ├── vercel.json                    # Vercel deployment configuration
    └── package.json                   # Frontend dependencies & scripts
```

---

## 🔥 Core Capabilities & Features

### 1. 🎓 Personalized AI Career Roadmaps
- Customized step-by-step career roadmaps for Software Engineer (SDE), Frontend, Backend, Full Stack, Data Engineer, and DevOps roles.
- Dynamic skill acquisition tracking, readiness scoring (0-100%), and interactive roadmap progression.

### 2. 💻 Online Coding Judge & Monaco Editor
- Integrated Monaco Code Editor supporting Python, JavaScript, C++, and Java.
- Multi-testcase judge execution engine enforcing CPU time and memory bounds.
- Live test results, status diagnostics (`ACCEPTED`, `WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, `COMPILATION_ERROR`), and Elo rating updates.

### 3. 🎤 AI Mock Interview Preparation Room
- Dynamic technical questions tailored to specific job roles and skill trees.
- Automated evaluation scoring based on technical depth, problem-solving structure, and clarity.

### 4. 📄 AI Resume & ATS Analyzer
- Resume parsing (PDF / DOCX) evaluating ATS readability scores, skill coverage, missing keywords, and role alignment.

### 5. 🛡️ System Administration & AI Content Engine
- Admin control panel for managing users, permission sets, platform statistics, and database records.
- LLM-assisted role and skill roadmap generation for instant expansion of platform tracks.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & UI** | Vanilla CSS, TailwindCSS 4, Lucide React Icons |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Backend Framework** | Python 3.14, FastAPI, Pydantic v2, Uvicorn |
| **Database & ORM** | PostgreSQL / SQLite, SQLAlchemy 2.0 ORM, Alembic |
| **Authentication** | Passlib (Bcrypt), PyJWT (Bearer Tokens), Role-Based Access Control |
| **AI Services** | Groq API (Llama 3.1 8B Instant) |
| **Deployment** | Vercel (Frontend), Render / Railway / Procfile (Backend) |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/24f2006167/career-platform-backend.git
cd career-platform-backend
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Launch FastAPI Backend Server
python3 -m uvicorn app.main:app --reload --port 8001
```
The backend API will run live at `http://127.0.0.1:8001`.
View interactive API docs at `http://127.0.0.1:8001/docs`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start Next.js Development Server
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🌐 Production Web Deployment

### Deploying Frontend to Vercel (Recommended)
1. Go to **[vercel.com/new](https://vercel.com/new)** and import repository `24f2006167/career-platform-backend`.
2. Set **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Next.js`.
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your live backend API URL (e.g. `https://nexvora-backend.onrender.com`)
5. Click **Deploy**.

### Deploying Backend to Render / Railway
1. Import repository on **[render.com](https://render.com)**.
2. Select **Blueprint** using `backend/render.yaml` OR create a Web Service with Root Directory `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Deploy!

---

## 🧪 Running Automated Test Suite

```bash
cd backend
python3 -m unittest tests/test_app.py
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
