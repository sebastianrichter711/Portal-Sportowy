from rest_framework import status,generics,filters
from sport24.settings import BASE_DIR
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import datetime
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
import re
from PIL import Image
import os

def download_article(url, section_name):

    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')

    title = html.find("meta", {"property": "og:title"})
    proper_title = title["content"]
    date = html.find("span", {"class": "article_date"})
    lead_text = html.find("div", {"id": "gazeta_article_lead"})
    main_text = html.find_all("p", {"class": "art_paragraph"})

    main_text_to_db = ""
    for item in main_text:
        main_text_to_db += item.text

    first_digit = re.search(r"\d", date.text)
    if first_digit:
        date_index = first_digit.start()
        new_date = date.text[date_index:date_index+16]
        new_date += ":00"
        date_time_obj = datetime.strptime(new_date, '%d.%m.%Y %H:%M:%S')

    print(proper_title)
    print(new_date)
    print(lead_text.text)
    print(main_text_to_db)

    images = html.find_all("script")
    str_img = str(images)
    split_images = str_img.split('<script>')

    images_gallery = ""
    for item in split_images:
        if "galleryInArticleData" in item:
            images_gallery = item

    images_url = images_gallery.find("url:")
    images_title = images_gallery.find("title:")
    image_link = images_gallery[images_url:images_title]
    https = image_link.find("https:")
    comma = image_link.find("',")
    full_image_link = image_link[https:comma]
    print(full_image_link)

    im = Image.open(requests.get(full_image_link, stream=True).raw)
    image_name = 'articles/' + proper_title + '.png'
    current_location = os.getcwd()
    os.chdir(BASE_DIR)
    os.chdir('media')
    im.save(image_name)
    os.chdir(current_location)
    
    section = Section.objects.get(name=section_name)
    new_article = Article.objects.create(title=proper_title, date_of_create = date_time_obj,
               lead_text = lead_text.text, text = main_text_to_db, big_title_photo = image_name, section_id = section)
    if new_article != None:
        new_article.save()
        articles_number = getattr(section, 'number_of_articles')
        articles_number = articles_number + 1
        setattr(section, 'number_of_articles', articles_number) 
        section.save()      
        return True

    return False

@csrf_exempt
def download_articles(request, section_name):
    if request.method == "POST":
        data=JSONParser().parse(request)
        download_data = download_article(data["url"], section_name)
        if download_data == True:
            return JsonResponse("Dodano artykuł/-y.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie dodano artykułu/-ów!", safe=False, status = status.HTTP_404_NOT_FOUND)

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
def get_newest_articles(request, id=0):
    if request.method == "GET":
        yesterday_time = datetime.now() - timedelta(hours = 24)
        newest_articles = Article.objects.filter(date_of_create__gte=yesterday_time).order_by('-date_of_create')[:10]
        if newest_articles: 
            short_newest_articles = []  
            for article in newest_articles:
                if 0 < article.date_of_create.minute < 9:
                    minute = '0' + str(article.date_of_create.minute)
                else:
                    minute = str(article.date_of_create.minute)
                short_article = {'date_of_create': str(article.date_of_create.hour) + ":" + minute,
                                 'title': article.title}
                short_newest_articles.append(short_article)
            return JsonResponse(short_newest_articles, safe=False, status=status.HTTP_200_OK)
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
def get_newest_article(request, id=0):
    if request.method == "GET":
        yesterday_time = datetime.now() - timedelta(hours = 24)
        newest_article = Article.objects.filter(date_of_create__gte=yesterday_time).order_by('-date_of_create').first()
        if newest_article:
            newest_article_serial = NewestArticleSerializer(newest_article)
            print(newest_article_serial.data)
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
    
class PostListDetailfilter(generics.ListAPIView):

    queryset = Article.objects.all()
    serializer_class = ShortArticleSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^title']
