from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool
from app.core.config import settings

# Database URL from environment
DATABASE_URL = settings.DATABASE_URL or "sqlite:///./career_platform.db"

# Render provides postgres:// which SQLAlchemy 2.0 requires as postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine_kwargs = {
    "future": True,
    "echo": False
}

if not DATABASE_URL.startswith("sqlite"):
    engine_kwargs.update({
        "poolclass": QueuePool,
        "pool_size": 10,
        "max_overflow": 20,
        "pool_timeout": 30,
        "pool_recycle": 1800,
    })

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    **engine_kwargs
)

# Database session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all database models
Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
