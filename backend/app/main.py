# from fastapi import FastAPI 
# from app.core.config import settings 
# from app.core.database import engine, Base

# from app.routers.home_router import router as home_router
# from app.models.user import User 
# from app.routers.auth_router import router as auth_router

# Base.metadata.create_all(bind=engine)

# app = FastAPI(title=settings.APP_NAME)

# app.include_router(home_router)
# app.include_router(auth_router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth_router import router as auth_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }