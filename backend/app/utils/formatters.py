import html
from datetime import datetime
from typing import Optional


def format_datetime(dt: Optional[datetime], fmt: str = "%Y-%m-%d %H:%M:%S") -> str:
    """Format a datetime object to standard string."""
    if not dt:
        return ""
    return dt.strftime(fmt)


def format_currency(amount: float, currency: str = "USD") -> str:
    """Format numerical value as currency string."""
    symbols = {"USD": "$", "INR": "₹", "EUR": "€", "GBP": "£"}
    symbol = symbols.get(currency.upper(), f"{currency} ")
    return f"{symbol}{amount:,.2f}"


def format_score(score: float, max_score: float = 100.0) -> str:
    """Format numerical score as percentage string."""
    if max_score <= 0:
        return "0.0%"
    percentage = (score / max_score) * 100
    return f"{percentage:.1f}%"


def sanitize_text(text: Optional[str]) -> str:
    """Sanitize text input by escaping HTML tags."""
    if not text:
        return ""
    return html.escape(text.strip())


def truncate_text(text: Optional[str], max_length: int = 100, suffix: str = "...") -> str:
    """Truncate string to maximum specified length with suffix."""
    if not text or len(text) <= max_length:
        return text or ""
    return text[: max_length - len(suffix)] + suffix


def format_bytes(size_in_bytes: int) -> str:
    """Format byte size to human readable units."""
    if size_in_bytes < 1024:
        return f"{size_in_bytes} B"
    elif size_in_bytes < 1024 * 1024:
        return f"{size_in_bytes / 1024:.1f} KB"
    elif size_in_bytes < 1024 * 1024 * 1024:
        return f"{size_in_bytes / (1024 * 1024):.1f} MB"
    else:
        return f"{size_in_bytes / (1024 * 1024 * 1024):.1f} GB"
