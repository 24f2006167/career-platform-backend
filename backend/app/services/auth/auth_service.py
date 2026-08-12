# from sqlalchemy.orm import Session

# from app.models.user import User
# from app.models.role import Role

# from app.schemas.auth.register_schema import (
#     RegisterSchema
# )

# from app.schemas.auth.login_schema import (
#     LoginSchema
# )

# from app.core.security import (
#     hash_password,
#     verify_password,
#     create_access_token
# )


# # REGISTER USER
# def register_user(
#     db: Session,
#     user_data: RegisterSchema
# ):

#     # Check existing email
#     existing_email = (
#         db.query(User)
#         .filter(User.email == user_data.email)
#         .first()
#     )

#     if existing_email:
#         raise Exception(
#             "Email already registered"
#         )

#     # Check existing username
#     existing_username = (
#         db.query(User)
#         .filter(
#             User.username == user_data.username
#         )
#         .first()
#     )

#     if existing_username:
#         raise Exception(
#             "Username already taken"
#         )

#     # Get default candidate role
#     candidate_role = (
#         db.query(Role)
#         .filter(Role.name == "candidate")
#         .first()
#     )

#     # Create role if missing
#     if not candidate_role:

#         candidate_role = Role(
#             name="candidate",
#             description="Platform Candidate"
#         )

#         db.add(candidate_role)

#         db.commit()

#         db.refresh(candidate_role)

#     # Create new user
#     new_user = User(
#         full_name=user_data.full_name,
#         username=user_data.username,
#         email=user_data.email,
#         password_hash=hash_password(
#             user_data.password
#         ),
#         role_id=candidate_role.id
#     )

#     db.add(new_user)

#     db.commit()

#     db.refresh(new_user)

#     return new_user


# # LOGIN USER
# def login_user(
#     db: Session,
#     login_data: LoginSchema
# ):

#     user = (
#         db.query(User)
#         .filter(User.email == login_data.email)
#         .first()
#     )

#     if not user:
#         raise Exception(
#             "Invalid email or password"
#         )

#     password_valid = verify_password(
#         login_data.password,
#         user.password_hash
#     )

#     if not password_valid:
#         raise Exception(
#             "Invalid email or password"
#         )

#     token = create_access_token({
#         "sub": str(user.id),
#         "email": user.email,
#         "role_id": str(user.role_id)
#     })

#     return {
#         "access_token": token,
#         "token_type": "bearer"
#     }


from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role

from app.schemas.auth.register_schema import (
    RegisterSchema
)

from app.schemas.auth.login_schema import (
    LoginSchema
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


# REGISTER USER
def register_user(
    db: Session,
    user_data: RegisterSchema
):

    clean_email = user_data.email.lower().strip()
    clean_username = user_data.username.strip()
    clean_full_name = user_data.full_name.strip()
    selected_role_name = user_data.role

    # Check existing email
    existing_email = (
        db.query(User)
        .filter(User.email == clean_email)
        .first()
    )

    if existing_email:
        raise Exception(
            "Email already registered"
        )

    # Check existing username
    existing_username = (
        db.query(User)
        .filter(User.username == clean_username)
        .first()
    )

    if existing_username:
        raise Exception(
            "Username already taken"
        )

    # Get selected role
    selected_role = (
        db.query(Role)
        .filter(Role.name == selected_role_name)
        .first()
    )

    # Create role if missing
    if not selected_role:

        selected_role = Role(
            name=selected_role_name,
            description=f"Platform {selected_role_name.title()}"
        )

        db.add(selected_role)

        db.commit()

        db.refresh(selected_role)

    # Create new user
    new_user = User(
        full_name=clean_full_name,
        username=clean_username,
        email=clean_email,
        password_hash=hash_password(
            user_data.password
        ),
        role_id=selected_role.id
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


# LOGIN USER
def login_user(
    db: Session,
    login_data: LoginSchema
):

    clean_email = login_data.email.lower().strip()

    user = (
        db.query(User)
        .filter(User.email == clean_email)
        .first()
    )

    if not user:
        raise Exception(
            "Invalid email or password"
        )

    password_valid = verify_password(
        login_data.password,
        user.password_hash
    )

    if not password_valid:
        raise Exception(
            "Invalid email or password"
        )

    role_name = user.role.name if user.role else "candidate"

    token = create_access_token({
        "sub": str(user.id),
        "email": user.email,
        "role_id": str(user.role_id),
        "role": role_name
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }