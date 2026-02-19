from django.urls import path
from .views import RegisterView, PdfListCreateView, PdfDeleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # PDF
    path('documents/', PdfListCreateView.as_view(), name='pdf_list_create'),
    path('documents/<int:pk>/', PdfDeleteView.as_view(), name='pdf_delete'),
]
