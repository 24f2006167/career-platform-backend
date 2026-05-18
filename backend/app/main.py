from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.routers.auth_router import router as auth_router

from app.models.user import User
from app.utils.security import hash_password

from app.core.database import (
    SessionLocal,
    Base,
    engine
)

# CREATE DATABASE TABLES
Base.metadata.create_all(bind=engine)

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

# CREATE ADMIN
def create_admin():

    db: Session = SessionLocal()

    admin_email = "laptop18122022@gmail.com"

    existing_admin = (
        db.query(User)
        .filter(User.email == admin_email)
        .first()
    )

    if not existing_admin:

        admin = User(
            name="Platform Owner",
            email=admin_email,
            password=hash_password(
                "Admin@123"
            ),
            role="admin"
        )

        db.add(admin)

        db.commit()

        print(
            "✅ Admin account created"
        )

    else:

        print(
            "✅ Admin already exists"
        )

    db.close()

# RUN ADMIN CREATION
create_admin()

# ROUTERS
app.include_router(auth_router)

# HOME
@app.get("/")
def home():

    return {
        "message":
        "Backend Running Successfully"
    }