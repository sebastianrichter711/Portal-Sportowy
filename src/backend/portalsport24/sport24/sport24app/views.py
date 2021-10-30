from datetime import datetime
from typing import ItemsView
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets, status
from knox.models import AuthToken
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from decimal import Decimal
import datetime
import json
from rest_framework.permissions import IsAuthenticated  

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return JsonResponse({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class ChangePasswordView(generics.UpdateAPIView):
    # An endpoint for changing password.

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return JsonResponse({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return JsonResponse(response)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@csrf_exempt
def sections_api(request, id = 0):
    if request.method == "GET":
        sections = Section.objects.all()
        sections_serial = GetSectionSerializer(sections, many = True)
        return JsonResponse(sections_serial.data, safe=False, status=status.HTTP_200_OK)

    if request.method == "POST":
        section_data=JSONParser().parse(request)
        section_serial = PostSectionSerializer(data=section_data)
        if section_serial.is_valid():
            section_serial.save()
            return JsonResponse(section_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano sekcji.", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def disciplines_api(request, id = 0):
    if request.method == "GET":
        disciplines = Discipline.objects.all()
        disciplines_serial = DisciplineSerializer(disciplines, many = True)
        return JsonResponse(disciplines_serial.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == "POST":
        discipline_data=JSONParser().parse(request)
        discipline_serial = DisciplineSerializer(data=discipline_data)
        if discipline_serial.is_valid():
            discipline_serial.save()
            return JsonResponse(discipline_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano dyscypliny.", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_discipline_games(request, name):
    if request.method == "GET":
        games = Game.objects.filter(discipline_id__name=name)
        games_serial = GameSerializer(games, many = True)
        return JsonResponse(games_serial.data, safe=False, status=status.HTTP_200_OK)

@csrf_exempt
def user_api(request, id):
    if request.method == "GET":
        user = Profile.objects.get(user__id=id)
        if user:
            user_data = {}
            user_data['login'] = user.user.username
            user_data['email'] = user.user.email
            user_data['first_name'] = user.user.first_name
            user_data['last_name'] = user.user.last_name
            user_data['sex'] = user.sex
            user_data['birth_date'] = user.birth_date
            user_data['phone_number'] = user.phone_number
            user_data['comments_number'] = user.comments_number
            return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

    elif request.method=='DELETE':
        user=User.objects.get(id=id)
        if user:
            user.delete()
            return JsonResponse("Użytkownik usunięty.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)   


@csrf_exempt
def get_short_user_data(request, id):
    if request.method == "GET":
        user = Profile.objects.get(user__id=id)
        if user:
            user_data = {}
            user_data['login'] = user.user.username
            user_data['email'] = user.user.email
            user_data['avatar'] = str(user.avatar)
            return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

# @csrf_exempt
# def get_article(request, id):
#     if request.method == "GET":
#         article = Article.objects.get(article_id = id)
#         if article:
#             article_serial = ArticleSerializer(article, many = True)
#             return JsonResponse(article_serial, safe=False, status = status.HTTP_200_OK)
#         return JsonResponse("Nie znaleziono artykułu o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def delete_section(request,id):
    if request.method=='DELETE':
        section=Section.objects.get(section_id=id)
        if section:
            section.delete()
            return JsonResponse("Sekcja usunięta.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto sekcji!", safe=False, status = status.HTTP_404_NOT_FOUND)  