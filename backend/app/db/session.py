from contextlib import contextmanager
from typing import Generator
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base, get_db


@contextmanager
def db_session() -> Generator[Session, None, None]:
    """
    Context manager for database sessions outside of FastAPI request lifecycle.
    """
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


__all__ = ["get_db", "SessionLocal", "engine", "Base", "db_session"]
