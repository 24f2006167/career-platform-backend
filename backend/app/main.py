
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth_router import router as auth_router
from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import hash_password
from app.core.database import SessionLocal

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


# ROUTERS
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }

create_admin()