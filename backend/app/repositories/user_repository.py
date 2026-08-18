from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.models.user import User


class UserRepository:
    """
    Data Access Repository for User entity.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email.lower()).first()

    def get_by_username(self, username: str) -> Optional[User]:
        return self.db.query(User).filter(User.username == username.lower()).first()

    def create(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User, update_data: dict) -> User:
        for key, value in update_data.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete(self, user: User) -> None:
        self.db.delete(user)
        self.db.commit()

    def list_users(self, skip: int = 0, limit: int = 20) -> Tuple[List[User], int]:
        query = self.db.query(User)
        total = query.count()
        users = query.offset(skip).limit(limit).all()
        return users, total

    def add_xp(self, user_id: str, xp_amount: int) -> Optional[User]:
        user = self.get_by_id(user_id)
        if user:
            user.xp = (user.xp or 0) + xp_amount
            # Level formula: level = 1 + (xp // 1000)
            user.level = 1 + (user.xp // 1000)
            self.db.commit()
            self.db.refresh(user)
        return user
