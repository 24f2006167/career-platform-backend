import time
from typing import Dict, Tuple
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    In-memory rate limiting middleware per IP address.
    Allows up to requests_per_minute calls in a rolling 60-second window.
    """

    def __init__(self, app, requests_per_minute: int = 120):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        # Storage: ip -> list of timestamps
        self.ip_tracker: Dict[str, list] = {}

    async def dispatch(self, request: Request, call_next) -> Response:
        # Skip health check & static paths
        if request.url.path in ["/health", "/docs", "/openapi.json"]:
            return await call_next(request)

        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        window_start = now - 60.0

        # Clean old timestamps
        timestamps = [t for t in self.ip_tracker.get(client_ip, []) if t > window_start]

        if len(timestamps) >= self.requests_per_minute:
            return JSONResponse(
                status_code=429,
                content={
                    "error": True,
                    "message": "Rate limit exceeded. Please try again in a minute.",
                    "limit": self.requests_per_minute,
                },
            )

        timestamps.append(now)
        self.ip_tracker[client_ip] = timestamps

        return await call_next(request)
