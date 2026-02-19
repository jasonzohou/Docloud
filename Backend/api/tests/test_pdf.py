from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile

class PDFUploadTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="password123"
        )

        response = self.client.post("/api/login/", {
            "username": "testuser",
            "password": "password123"
        })

        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
    
    def test_upload_valid_pdf(self):
        file = SimpleUploadedFile(
            "test.pdf",
            b"%PDF-1.4 test content",
            content_type="application/pdf"
        )

        response = self.client.post("/api/documents/", {
            "file": file
        }, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_upload_without_auth(self):
        self.client.credentials()  # remove auth

        file = SimpleUploadedFile(
            "test.pdf",
            b"%PDF-1.4 test content",
            content_type="application/pdf"
        )

        response = self.client.post("/api/documents/", {
            "file": file
        }, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_upload_wrong_file_type(self):
        file = SimpleUploadedFile(
            "test.txt",
            b"not a pdf",
            content_type="text/plain"
        )

        response = self.client.post("/api/documents/", {
            "file": file
        }, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_upload_no_file(self):
        response = self.client.post("/api/documents/", {}, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_upload_empty_file(self):
        file = SimpleUploadedFile(
            "empty.pdf",
            b"",
            content_type="application/pdf"
        )

        response = self.client.post("/api/documents/", {
            "file": file
        }, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)






