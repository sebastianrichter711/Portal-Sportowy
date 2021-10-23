from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

# API Serializers

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user
        
class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'name',
            "moderator_id"
        )
