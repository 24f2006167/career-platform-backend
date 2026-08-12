from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError

from passlib.context import CryptContext

from app.core.config import settings


# Password hashing configuration
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# JWT Configuration
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# HASH PASSWORD
def hash_password(password: str) -> str:

    return pwd_context.hash(password)


# VERIFY PASSWORD
def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# CREATE ACCESS TOKEN
def create_access_token(
    data: dict
) -> str:

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# VERIFY ACCESS TOKEN
def verify_access_token(
    token: str
):

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None