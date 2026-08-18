import re
import secrets
import string
from typing import Any, Dict, List, Tuple


def generate_slug(text: str) -> str:
    """Generate a clean URL-friendly slug from text."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")


def generate_random_token(length: int = 32) -> str:
    """Generate a secure cryptographically random hexadecimal token."""
    return secrets.token_hex(length // 2)


def generate_random_code(length: int = 6) -> str:
    """Generate a numeric OTP or alphanumeric verification code."""
    digits = string.digits
    return "".join(secrets.choice(digits) for _ in range(length))


def paginate_list(items: List[Any], page: int = 1, page_size: int = 20) -> Tuple[List[Any], Dict[str, Any]]:
    """Paginate an in-memory list and return sliced items with meta information."""
    page = max(1, page)
    page_size = max(1, min(100, page_size))
    total_items = len(items)
    total_pages = (total_items + page_size - 1) // page_size if total_items > 0 else 1

    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    sliced_items = items[start_idx:end_idx]

    meta = {
        "page": page,
        "page_size": page_size,
        "total_items": total_items,
        "total_pages": total_pages,
        "has_next": page < total_pages,
        "has_prev": page > 1,
    }
    return sliced_items, meta


def dict_omit(d: Dict[str, Any], keys: List[str]) -> Dict[str, Any]:
    """Return a shallow copy of a dictionary omitting specified keys."""
    return {k: v for k, v in d.items() if k not in keys}
