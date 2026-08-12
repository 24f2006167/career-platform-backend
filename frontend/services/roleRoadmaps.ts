export interface RoadmapConcept {
  id: string;
  title: string;
  description: string;
  type: "learning" | "practice" | "interview";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Job Ready";
}

export interface RoadmapSkill {
  id: string;
  title: string;
  description: string;
  category: string;
  concepts: RoadmapConcept[];
}

export interface CareerRoadmap {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  skills: RoadmapSkill[];
}

export const careerRoadmaps: CareerRoadmap[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    description:
      "Learn Excel, SQL, Python, statistics, dashboards, and business analysis for data analyst roles.",
    type: "analytics",
    difficulty: "Beginner to Advanced",
    skills: [
      {
        id: "excel",
        title: "Excel",
        category: "Data Tools",
        description: "Master spreadsheets, formulas, cleaning, and reporting.",
        concepts: [
          {
            id: "excel-basics",
            title: "Excel Basics",
            description: "Cells, tables, formulas, sorting, filtering.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "excel-practice",
            title: "Excel Practice",
            description: "Clean and summarize a dataset.",
            type: "practice",
            difficulty: "Intermediate",
          },
          {
            id: "excel-interview",
            title: "Excel Interview Questions",
            description: "Common Excel questions for analyst roles.",
            type: "interview",
            difficulty: "Job Ready",
          },
        ],
      },
      {
        id: "sql",
        title: "SQL",
        category: "Database",
        description: "Query databases using SELECT, JOIN, GROUP BY, and filters.",
        concepts: [
          {
            id: "sql-basics",
            title: "SQL Basics",
            description: "SELECT, WHERE, ORDER BY, LIMIT.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "sql-joins",
            title: "SQL Joins",
            description: "INNER JOIN, LEFT JOIN, and relationship queries.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "sql-practice",
            title: "SQL Practice",
            description: "Solve real business query tasks.",
            type: "practice",
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: "python-data-analysis",
        title: "Python for Data Analysis",
        category: "Programming",
        description: "Use Python, pandas, and basic visualization.",
        concepts: [
          {
            id: "python-basics",
            title: "Python Basics",
            description: "Variables, lists, loops, functions.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "pandas-basics",
            title: "Pandas Basics",
            description: "DataFrames, cleaning, grouping, filtering.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "data-analysis-practice",
            title: "Data Analysis Practice",
            description: "Analyze a CSV dataset using Python.",
            type: "practice",
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description:
      "Prepare for frontend roles with HTML, CSS, JavaScript, React, Next.js, UI design, and API integration.",
    type: "frontend",
    difficulty: "Beginner to Advanced",
    skills: [
      {
        id: "html-css",
        title: "HTML & CSS",
        category: "Frontend Basics",
        description: "Build clean, semantic, responsive web pages.",
        concepts: [
          {
            id: "semantic-html",
            title: "Semantic HTML",
            description: "Use meaningful HTML tags for structure and accessibility.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "css-layout",
            title: "CSS Layout",
            description: "Flexbox, Grid, spacing, and responsive layout.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "responsive-page-practice",
            title: "Responsive Page Practice",
            description: "Build a responsive landing page.",
            type: "practice",
            difficulty: "Intermediate",
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        category: "Programming",
        description: "Master JS fundamentals for frontend development.",
        concepts: [
          {
            id: "js-basics",
            title: "JavaScript Basics",
            description: "Variables, functions, arrays, objects, loops.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "dom-events",
            title: "DOM & Events",
            description: "Handle clicks, forms, and dynamic UI changes.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "async-js",
            title: "Async JavaScript",
            description: "Promises, async/await, and API calls.",
            type: "learning",
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: "react-nextjs",
        title: "React & Next.js",
        category: "Frontend Frameworks",
        description: "Build modern frontend apps using React and Next.js.",
        concepts: [
          {
            id: "react-components",
            title: "React Components",
            description: "Props, state, component structure.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "nextjs-routing",
            title: "Next.js Routing",
            description: "App Router, pages, layouts, navigation.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "api-integration",
            title: "API Integration",
            description: "Connect frontend with backend APIs using Axios/fetch.",
            type: "practice",
            difficulty: "Advanced",
          },
        ],
      },
    ],
  },

  {
    id: "backend-developer",
    title: "Backend Developer",
    description:
      "Prepare for backend roles with Python, FastAPI, databases, authentication, APIs, and deployment.",
    type: "backend",
    difficulty: "Beginner to Advanced",
    skills: [
      {
        id: "python-fastapi",
        title: "Python & FastAPI",
        category: "Backend",
        description: "Build backend APIs using Python and FastAPI.",
        concepts: [
          {
            id: "python-backend-basics",
            title: "Python Backend Basics",
            description: "Functions, modules, request-response flow.",
            type: "learning",
            difficulty: "Beginner",
          },
          {
            id: "fastapi-routes",
            title: "FastAPI Routes",
            description: "Create GET, POST, PUT, DELETE API endpoints.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "fastapi-practice",
            title: "FastAPI Practice",
            description: "Build a CRUD API.",
            type: "practice",
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: "database",
        title: "Database",
        category: "Backend Storage",
        description: "Store and query application data.",
        concepts: [
          {
            id: "sqlalchemy-basics",
            title: "SQLAlchemy Basics",
            description: "Models, sessions, queries, relationships.",
            type: "learning",
            difficulty: "Intermediate",
          },
          {
            id: "database-relationships",
            title: "Database Relationships",
            description: "One-to-many and many-to-many relationships.",
            type: "learning",
            difficulty: "Advanced",
          },
          {
            id: "database-practice",
            title: "Database Practice",
            description: "Create models and connect them to APIs.",
            type: "practice",
            difficulty: "Advanced",
          },
        ],
      },
      {
        id: "auth-deployment",
        title: "Authentication & Deployment",
        category: "Production",
        description: "Secure and deploy backend applications.",
        concepts: [
          {
            id: "jwt-auth",
            title: "JWT Authentication",
            description: "Login, tokens, protected routes.",
            type: "learning",
            difficulty: "Advanced",
          },
          {
            id: "role-based-access",
            title: "Role Based Access",
            description: "Admin, recruiter, candidate permissions.",
            type: "learning",
            difficulty: "Advanced",
          },
          {
            id: "backend-deployment",
            title: "Backend Deployment",
            description: "Prepare backend for production hosting.",
            type: "interview",
            difficulty: "Job Ready",
          },
        ],
      },
    ],
  },
];

export const getRoadmapByRoleTitle = (
  roleTitle: string | null | undefined
): CareerRoadmap => {
  const normalized = (roleTitle || "").toLowerCase().trim();

  if (normalized.includes("frontend")) {
    return careerRoadmaps.find((role) => role.id === "frontend-developer")!;
  }

  if (normalized.includes("backend")) {
    return careerRoadmaps.find((role) => role.id === "backend-developer")!;
  }

  if (normalized.includes("data")) {
    return careerRoadmaps.find((role) => role.id === "data-analyst")!;
  }

  return careerRoadmaps[0];
};