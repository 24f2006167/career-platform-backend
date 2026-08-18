import re
from typing import List, Optional, Tuple

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
SLUG_REGEX = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
URL_REGEX = re.compile(r"^https?://(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$")


def validate_email_format(email: str) -> bool:
    """Validate string format of an email address."""
    if not email or len(email) > 255:
        return False
    return bool(EMAIL_REGEX.match(email.strip()))


def validate_password_strength(password: str) -> Tuple[bool, List[str]]:
    """
    Validate password strength requirements.
    Returns (is_valid, list_of_errors).
    """
    errors = []
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")
    if not re.search(r"[A-Z]", password):
        errors.append("Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        errors.append("Password must contain at least one lowercase letter")
    if not re.search(r"[0-9]", password):
        errors.append("Password must contain at least one number")
    return len(errors) == 0, errors


def validate_slug(slug: str) -> bool:
    """Validate URL slug format."""
    if not slug or len(slug) > 100:
        return False
    return bool(SLUG_REGEX.match(slug.strip()))


def validate_file_extension(filename: str, allowed_extensions: List[str]) -> bool:
    """Validate file extension against an allowed list (e.g. ['pdf', 'docx'])."""
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in [e.lower().lstrip(".") for e in allowed_extensions]


def validate_url_format(url: Optional[str]) -> bool:
    """Validate web URL format."""
    if not url:
        return True  # Optional URL
    return bool(URL_REGEX.match(url.strip()))
