from jose import jwt
from datetime import datetime, timedelta, timezone

# SECRET
SECRET_KEY = "SUPER_SECRET_KEY"

# ALGORITHM
ALGORITHM = "HS256"

# ACCESS TOKEN
ACCESS_TOKEN_EXPIRE_MINUTES = 15

# REFRESH TOKEN
REFRESH_TOKEN_EXPIRE_DAYS = 7


# CREATE ACCESS TOKEN
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire,
        "type": "access"
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# CREATE REFRESH TOKEN
def create_refresh_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        days=REFRESH_TOKEN_EXPIRE_DAYS
    )

    to_encode.update({
        "exp": expire,
        "type": "refresh"
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# VERIFY TOKEN
def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # INVALID TYPE
        if payload.get("type") not in [
            "access",
            "refresh"
        ]:

            return None

        return payload

    except jwt.ExpiredSignatureError:

        print("Token expired")

        return None

    except jwt.JWTError:

        print("Invalid token")

        return None

    except Exception as error:

        print(
            "Token verification error:",
            error
        )

        return None