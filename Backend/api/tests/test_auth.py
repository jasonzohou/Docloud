from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status

class RegisterTests(APITestCase):

    def test_register_success(self):
        response = self.client.post("/api/register/", {
            "username": "newuser",
            "email": "new@test.com",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().username, "newuser")

    def test_register_username_already_used(self):
        User.objects.create_user(
            username="existing",
            email="existing@test.com",
            password="password123"
        )

        response = self.client.post("/api/register/", {
            "username": "existing",
            "email": "new@test.com",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertIn("username", response.data)

    def test_register_email_already_used(self):
        User.objects.create_user(
            username="existing",
            email="existing@test.com",
            password="password123"
        )

        response = self.client.post("/api/register/", {
            "username": "newuser",
            "email": "existing@test.com",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertIn("email", response.data)

    def test_register_empty_username(self):
        response = self.client.post("/api/register/", {
            "username": "",
            "email": "test@test.com",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_register_empty_email(self):
        response = self.client.post("/api/register/", {
            "username": "user",
            "email": "",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_register_empty_password(self):
        response = self.client.post("/api/register/", {
            "username": "user",
            "email": "test@test.com",
            "password": ""
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_register_invalid_email_format(self):
        response = self.client.post("/api/register/", {
            "username": "user",
            "email": "trytui",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)




class LoginTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@test.com",
            password="password123"
        )

    def test_login_success(self):
        response = self.client.post("/api/login/", {
            "username": "testuser",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_login_bad_password(self):
        response = self.client.post("/api/login/", {
            "username": "testuser",
            "password": "yzerbizt"
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.data)

    def test_login_user_not_found(self):
        response = self.client.post("/api/login/", {
            "username": "reyr_",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.data)

    def test_login_empty_username(self):
        response = self.client.post("/api/login/", {
            "username": "",
            "password": "password123"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_empty_password(self):
        response = self.client.post("/api/login/", {
            "username": "testuser",
            "password": ""
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_no_data(self):
        response = self.client.post("/api/login/", {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
