# Nexvora AI Career Platform 🚀

**Nexvora** is an AI-powered career roadmap, interactive learning, mock interview, and online coding judge platform built with **Next.js 16 (React 19, TypeScript, TailwindCSS)** and a **FastAPI (Python, SQLAlchemy, JWT)** microservices backend.

---

## 🌟 Development & Production Deployment Links

- **Frontend Platform (Vercel)**: [Deploy to Vercel](https://vercel.com/new) | Local Dev: `http://localhost:3000`
- **Backend Platform (Render / Railway)**: [Deploy to Render](https://render.com) | Live API: `http://127.0.0.1:8000`
- **API Interactive Swagger Documentation**: `http://127.0.0.1:8000/docs`
- **System Health Monitor Endpoint**: `http://127.0.0.1:8000/health`

---

## 🔥 Key Platform Features

### 1. 🎓 AI Learning & Career Roadmaps
- **Dynamic Skill Trees**: Customized step-by-step career roadmaps for SDE-1, SDE-2, Full Stack, Data Engineer, and DevOps roles.
- **AI Concept Tutor**: Interactive AI-assisted learning modules with practice questions, instant verification, and XP progression.

### 2. 💻 Online Coding Judge & Monaco Editor
- **Multi-Language Sandbox**: Monaco Code Editor supporting Python, JavaScript, C++, and Java with auto-save and code restore.
- **Live Code Execution**: Fast execution against hidden test cases with runtime (ms) and memory (KB) benchmarking.
- **Complexity Analyzer**: Interactive SVG time & space complexity line graphs and live execution visualizations.

### 3. 🎤 AI Interview Preparation Room
- **Role-Gated Question Engine**: AI mock interviews generated dynamically from selected role roadmap skills.
- **Real-Time Evaluation**: Instant feedback, hints, and scoring based on technical accuracy and clarity.

### 4. 📄 AI Resume & ATS Analyzer
- **Parser & Keyword Matcher**: Upload resumes (PDF/DOCX) for ATS readability scores, tech stack gap identification, and recommended bullet points.

### 5. 🛡️ Admin & Role Management Console
- **System Health Monitor**: Real-time operational checks for FastAPI core, PostgreSQL, sandbox judge, and AI engines.
- **AI Role Generator**: One-click generation of new career roles and skill trees using LLM capabilities.
- **User & Directory Management**: Manage user permissions, activity status, rating metrics, and level progression.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend UI** | Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4, Monaco Editor, Lucide React |
| **Backend API** | Python 3.14, FastAPI, Pydantic, Uvicorn, Gunicorn |
| **Database & ORM** | PostgreSQL / SQLite, SQLAlchemy ORM, Alembic |
| **Security & Auth** | Passlib (Bcrypt), PyJWT (JSON Web Tokens), CORS Middleware |
| **Deployment** | Vercel (`vercel.json`), Render Blueprint (`render.yaml`), Docker/Procfile |

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- Git

### 1. Clone Repository
```bash
git clone https://github.com/ShitanshuChaurasiya/career_platform.git
cd career_platform
```

### 2. Backend Setup & Run
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Backend API will be running on `http://127.0.0.1:8000`.

### 3. Frontend Setup & Run
```bash
cd ../frontend
npm install

# Run Next.js dev server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Production Platforms

### Deploying Frontend to Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set Framework Preset to **Next.js**.
4. Configure Environment Variable: `NEXT_PUBLIC_API_BASE_URL` -> your live FastAPI backend URL.
5. Deploy!

### Deploying Backend to Render
1. Connect your repository to [Render](https://render.com).
2. Choose **Blueprint** and select `backend/render.yaml` OR create a new **Web Service** with Root Directory `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Deploy!

---

## 👤 Author

**Shitanshu Chaurasiya**  
*BS Data Science Student at IIT Madras*  
GitHub: [@ShitanshuChaurasiya](https://github.com/ShitanshuChaurasiya)
