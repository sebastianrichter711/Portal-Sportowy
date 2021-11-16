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
import datetime, json, random
from rest_framework.permissions import IsAuthenticated 
from news.news import download_article 
from datetime import datetime, timedelta

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
        if sections:
            sections_serial = GetSectionSerializer(sections, many = True)
            return JsonResponse(sections_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono działów!", safe=False, status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        section_data=JSONParser().parse(request)
        section_serial = PostSectionSerializer(data=section_data)
        if section_serial.is_valid():
            section_serial.save()
            return JsonResponse(section_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano działu.", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def disciplines_api(request, id = 0):
    if request.method == "GET":
        disciplines = Discipline.objects.all()
        if disciplines:
            disciplines_serial = DisciplineSerializer(disciplines, many = True)
            return JsonResponse(disciplines_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono dyscyplin!", safe=False, status=status.HTTP_404_NOT_FOUND)

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
        if games:
            games_serial = GameSerializer(games, many = True)
            return JsonResponse(games_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono rozgrywek dla dyscypliny " + name + "!", safe=False, status=status.HTTP_404_NOT_FOUND)

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

@csrf_exempt
def get_article(request, id):
     if request.method == "GET":
         article = Article.objects.get(article_id=id)
         if article:
             article.page_views += 1
             article.save()
             article_serial = ArticleSerializer(article)
             return JsonResponse(article_serial.data, safe=False, status = status.HTTP_200_OK)
         return JsonResponse("Nie znaleziono artykułu o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def delete_section(request, id):
    if request.method=='DELETE':
        section=Section.objects.get(section_id=id)
        if section:
            section.delete()
            return JsonResponse("Sekcja usunięta.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto sekcji!", safe=False, status = status.HTTP_404_NOT_FOUND)  

@csrf_exempt
def delete_comment(request, id):
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
        download_data = download_article(data["url"], section_name)
        if download_data == True:
            return JsonResponse("Dodano artykuł/-y.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie dodano artykułu/-ów!", safe=False, status = status.HTTP_404_NOT_FOUND)
  
@csrf_exempt
def get_newest_articles(request, id=0):
    if request.method == "GET":
        yesterday_time = datetime.now() - timedelta(hours = 24)
        newest_articles = Article.objects.filter(date_of_create__gte=yesterday_time).order_by('-date_of_create')[:10]
        if newest_articles:
            newest_articles_serial = NewArticlesSerializer(newest_articles, many = True)
            return JsonResponse(newest_articles_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono najnowszych artykułów!", safe=False, status = status.HTTP_404_NOT_FOUND)
        
@csrf_exempt
def find_articles_by_keyword(request, keyword):
    if request.method == "GET":
        found_articles = []
        for article in Article.objects.all():
            if keyword in article.title or keyword in article.lead_text or keyword in article.text:
                found_articles.append(article)
        if found_articles:
            found_articles_serial = ShortArticleSerializer(found_articles, many = True)
            return JsonResponse(found_articles_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułów dla słowa " + keyword + "!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_articles_for_section(request, section_name):
    if request.method == "GET":
        section = Section.objects.get(name=section_name)
        if section:
            section_articles = Article.objects.filter(section_id = section)
            if section_articles:
                section_articles_serial = ShortArticleSerializer(section_articles, many = True)
                return JsonResponse(section_articles_serial.data, safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie znaleziono artykułów dla działu " + section_name + "!", safe=False, status = status.HTTP_404_NOT_FOUND)
        return JsonResponse("Nie znaleziono działu " + section_name + "!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_quote(request, id=0):
    if request.method == "GET":
        quotes = list(Quote.objects.all())
        if quotes:
            random_quote = random.choice(quotes)
            random_quote_serial = QuoteSerializer(random_quote)
            return JsonResponse(random_quote_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono cytatów!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_newest_article(request, id=0):
    if request.method == "GET":
        yesterday_time = datetime.now() - timedelta(hours = 24)
        newest_article = Article.objects.filter(date_of_create__gte=yesterday_time).order_by('-date_of_create').first()
        if newest_article:
            newest_article_serial = NewestArticleSerializer(newest_article)
            return JsonResponse(newest_article_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono najnowszego artykułu!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_articles_for_home_page(request, id=0):
    if request.method == "GET":
        yesterday_time = datetime.now() - timedelta(hours = 24)
        football_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Piłka nożna").order_by('-page_views')[:2]
        volleyball_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Siatkówka").order_by('-page_views')[:2]
        basketball_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Koszykówka").order_by('-page_views')[:2]
        athletics_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Lekkoatletyka").order_by('-page_views')[:2]
        tennis_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Tenis").order_by('-page_views')[:2]
        other_sports_articles = Article.objects.filter(date_of_create__gte=yesterday_time, section_id__name="Inne sporty").order_by('-page_views')[:2]
        
        articles_for_home_page = []
        if football_articles:
            for article in football_articles:
                articles_for_home_page.append(article)
        if volleyball_articles:
            for article in volleyball_articles:
                articles_for_home_page.append(article)
        if basketball_articles:
            for article in basketball_articles:
                articles_for_home_page.append(article)
        if athletics_articles:
            for article in athletics_articles:
                articles_for_home_page.append(article)
        if tennis_articles:
            for article in tennis_articles:
                articles_for_home_page.append(article)
        if other_sports_articles:
            for article in other_sports_articles:
                articles_for_home_page.append(article)
          
        if articles_for_home_page: 
            articles_for_home_page_serial = HomePageArticlesSerializer(articles_for_home_page, many=True)
            return JsonResponse(articles_for_home_page_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułów na stronę główną!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def add_comment(request, article_id, profile_id):
    if request.method == "POST":
        comment_data=JSONParser().parse(request)
        comment_text = comment_data["text"]
        profile = Profile.objects.get(profile_id = profile_id)
        article = Article.objects.get(article_id=article_id)
        if profile and article:
            new_comment = Comment.objects.create(author_id=profile, date_of_create=datetime.now(), text=comment_text,
                                                 article_id = article)
            new_comment.save()
            return JsonResponse("Dodano komentarz!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułu lub użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_comments_for_article(request, article_id):
    if request.method == "GET":
        article = Article.objects.get(article_id=article_id)
        if article:
            comments = Comment.objects.filter(article_id=article_id).order_by('-date_of_create')
            comments_data = []
            for comment in comments:
                new_comment = {"login": comment.author_id.user.username, "avatar": str(comment.author_id.avatar), "date_of_create": comment.date_of_create,
                               "modified": comment.date_of_last_change, "text": comment.text}
                comments_data.append(new_comment)
            return JsonResponse(comments_data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułu o podanym ID!", safe=False, status = status.HTTP_404_NOT_FOUND)       
            
@csrf_exempt
def add_game(request):
    if request.method == "POST":
        game_data=JSONParser().parse(request)
        game_data_serial = GameSerializer(data=game_data)
        if game_data_serial.is_valid():
            game_data_serial.save()
            return JsonResponse(game_data_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano rozgrywek.", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def edit_section(request, section_id):
    if request.method == "PUT":
        section_data=JSONParser().parse(request)
        section = Section.objects.get(section_id = section_id)
        section_serial = GetSectionSerializer(section, data = section_data)
        if section_serial.is_valid():
            section_serial.save()
            return JsonResponse("Zmieniono dane dot. działu!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zmieniono danych dot. działu!", safe=False, status=status.HTTP_404_NOT_FOUND)

        
        