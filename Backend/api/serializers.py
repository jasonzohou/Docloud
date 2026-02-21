from rest_framework import serializers
from django.contrib.auth.models import User
from .models.pdf_mod import Pdf
from django.core.validators import FileExtensionValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already used.")
        return value


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class PdfSerializer(serializers.ModelSerializer):
    file = serializers.FileField(validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    owner_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Pdf
        fields = ('id', 'title','file', 'owner_name', 'created_at')
