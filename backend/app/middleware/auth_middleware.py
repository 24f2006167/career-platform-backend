from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.services.token_service import verify_token


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware that parses the Authorization header, verifies JWT tokens,
    and attaches token payload to request.state.user_payload if valid.
    """

    async def dispatch(self, request: Request, call_next) -> Response:
        auth_header = request.headers.get("Authorization")
        request.state.user_payload = None

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            payload = verify_token(token)
            if payload:
                request.state.user_payload = payload

        response = await call_next(request)
        return response
