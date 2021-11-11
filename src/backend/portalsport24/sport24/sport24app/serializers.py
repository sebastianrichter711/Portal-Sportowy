from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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
        
# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

class ChangePasswordSerializer(serializers.Serializer):
    model = User
   
    #Serializer for password change endpoint.
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class PostSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'name',
            'icon',
            'moderator_id'
        )

class GetSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'name',
            'icon'
        )

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            'name',
            'icon'
        )

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'name',
            'logo'
        )

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'title', 
            'date_of_create',
            'date_of_last_change',
            'text',
            'big_title_photo',
            'small_title_photo',
            'add_photo',
            'page_views',
            'section_id'
        )

class NewArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'date_of_create',
            'title'
        )

class ShortArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'date_of_create',
            'title',
            'lead_text',
            'small_title_photo'
        )

