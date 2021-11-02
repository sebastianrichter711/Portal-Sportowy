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
#from news import download_article 

from bs4.element import Script
import requests
from bs4 import BeautifulSoup
#from sport24app.models import Article, Section

def download_article(url):
    #url = 'https://www.sport.pl/pilka/7,65041,27757263,dlaczego-gazprom-placi-setki-milionow-euro-na-europejski-futbol.html#do_w=107&do_v=314&do_st=RS&do_sid=677&do_a=677&s=SMT_Link_2'
    data = requests.get(url)

    html = BeautifulSoup(data.text, 'html.parser')
    title = html.find("h1", {"id": "article_title"})
    date = html.find("span", {"class": "article_date"})
    lead_text = html.find("div", {"id": "gazeta_article_lead"})
    main_text = html.find_all("p", {"class": "art_paragraph"})

    main_text_to_DB = ""
    for item in main_text:
        main_text_to_DB += item.text

    date_index = date.text.find("0")
    new_date = date.text[date_index:date_index+16]
    print(title.text)
    print(new_date)
    print(lead_text.text)
    print(main_text_to_DB)

    images = html.find_all("script")
    str_img = str(images)
    split_images = str_img.split('<script>')

    images2 = ""
    for item in split_images:
        if "galleryInArticleData" in item:
            images2 = item

    print(images2)

    imagesUrl = images2.find("url:")
    imagesTitle = images2.find("title:")
    newText = images2[imagesUrl:imagesTitle]
    https = newText.find("https:")
    jpg = newText.find("',")
    fullUrl = newText[https:jpg]
    print(fullUrl)

    return title.text, new_date, lead_text.text, main_text_to_DB, fullUrl

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
def discipline_games(request, name):
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

@csrf_exempt
def delete_comment(request,id):
    if request.method=='DELETE':
        comment=Comment.objects.get(comment_id=id)
        if comment:
            comment.delete()
            return JsonResponse("Komentarz usunięty.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto komentarza!", safe=False, status = status.HTTP_404_NOT_FOUND)  

@csrf_exempt
def download_articles(request, section_name):
    if request.method == "POST":
        data=JSONParser().parse(request)
        download_data = download_article(data["url"])
        section = Section.objects.get(name=section_name)
        new_article = Article.objects.create(title=download_data[0], date_of_create = download_data[1],
               lead_text = download_data[2], text = download_data[3], big_title_photo = download_data[4], section_id = section)
        if new_article:
            new_article.save()
            return JsonResponse("Dodano artykuł/-y.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie dodano artykułu/-ów!", safe=False, status = status.HTTP_404_NOT_FOUND)
        