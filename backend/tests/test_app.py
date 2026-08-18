import unittest
from fastapi.testclient import TestClient
from app.main import app
from app.utils.formatters import format_currency, format_score, sanitize_text, format_bytes
from app.utils.validators import validate_email_format, validate_password_strength, validate_slug
from app.utils.helpers import generate_slug, generate_random_token, paginate_list

client = TestClient(app)


class TestNexvoraBackend(unittest.TestCase):
    def test_home_endpoint(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Backend Running Successfully")
        self.assertEqual(data["app"], "Nexvora AI Career Platform")

    def test_health_check_endpoint(self):
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status", data)
        self.assertEqual(data["backend"], "running")
        self.assertEqual(data["ai_learning"], "enabled")

    def test_candidate_role_endpoint(self):
        # Without auth header, candidate role endpoint will return unauthorized or error gracefully
        response = client.get("/api/candidate/role")
        self.assertIn(response.status_code, [200, 401, 403])

    def test_utils_formatters(self):
        self.assertEqual(format_currency(1234.5, "USD"), "$1,234.50")
        self.assertEqual(format_score(85, 100), "85.0%")
        self.assertEqual(
            sanitize_text("  <script>alert('xss')</script>  "),
            "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;",
        )
        self.assertEqual(format_bytes(2048), "2.0 KB")

    def test_utils_validators(self):
        self.assertTrue(validate_email_format("test@example.com"))
        self.assertFalse(validate_email_format("invalid-email"))

        is_valid, errors = validate_password_strength("StrongP@ss1")
        self.assertTrue(is_valid)

        self.assertTrue(validate_slug("python-developer"))
        self.assertFalse(validate_slug("Python Developer!!"))

    def test_utils_helpers(self):
        self.assertEqual(generate_slug("Full Stack Web Developer!"), "full-stack-web-developer")
        token = generate_random_token(16)
        self.assertEqual(len(token), 16)

        items = list(range(50))
        sliced, meta = paginate_list(items, page=2, page_size=10)
        self.assertEqual(len(sliced), 10)
        self.assertEqual(sliced[0], 10)
        self.assertEqual(meta["total_items"], 50)
        self.assertEqual(meta["total_pages"], 5)


if __name__ == "__main__":
    unittest.main()
