from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, PdfSerializer, UserInfoSerializer
from .models.pdf_mod import Pdf

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class PdfListCreateView(generics.ListCreateAPIView):
    serializer_class = PdfSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pdf.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PdfDeleteView(generics.DestroyAPIView):
    serializer_class = PdfSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Pdf.objects.all()

    def get_queryset(self):
        return Pdf.objects.filter(user=self.request.user)


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
