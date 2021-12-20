from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import datetime
from datetime import datetime
from users.models import NewUser

@csrf_exempt
def comment_api(request, id):
    if request.method=='PUT':
        comment_data=JSONParser().parse(request)
        comment = Comment.objects.get(comment_id = id)
        if comment:
            comment.text = comment_data['text']
            comment.date_of_last_change = datetime.now()
            comment.save()
            return JsonResponse("Komentarz zmodyfikowany.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie zmodyfikowano komentarza!", safe=False, status = status.HTTP_404_NOT_FOUND)

@csrf_exempt
def delete_comment_from_article(request, comment_id, article_id):
    if request.method=='DELETE':
        comment=Comment.objects.get(comment_id=comment_id)
        article=Article.objects.get(article_id=article_id)
        if comment and article:
            comment.delete()
            article.comments_number -= 1
            article.save()
            return JsonResponse("Komentarz usunięty.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto komentarza!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def add_comment_to_article(request, article_id, profile_id):
    if request.method == "POST":
        comment_data=JSONParser().parse(request)
        comment_text = comment_data["text"]
        profile = NewUser.objects.get(profile_id = profile_id)
        article = Article.objects.get(article_id=article_id)
        if profile and article:
            new_comment = Comment.objects.create(author_id=profile, date_of_create=datetime.now(), text=comment_text,
                                                 article_id = article)
            new_comment.save()
            profile.comments_number += 1
            profile.save()
            article.comments_number += 1
            article.save()
            return JsonResponse("Dodano komentarz!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułu lub użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_comments_for_article(request, article_id):
    if request.method == "GET":
        article = Article.objects.get(article_id=article_id)
        if article:
            comments = Comment.objects.filter(article_id=article_id).order_by('-date_of_create')
            comments_data = []
            #comments_data.append({"Komentarze": + article.comments_number})
            for comment in comments:
                if comment.date_of_last_change == None:
                    new_comment = {"login": comment.author_id.user_name, 
                                "avatar": str(comment.author_id.avatar), 
                                "date_of_create": str(comment.date_of_create.day) + "." + str(comment.date_of_create.month) + "." + str(comment.date_of_create.year) + " " + str(comment.date_of_create.hour) + ":" + str(comment.date_of_create.minute),
                                "text": comment.text}
                    comments_data.append(new_comment)
                else:
                    new_comment = {"login": comment.author_id.user_name, 
                                "avatar": str(comment.author_id.avatar), 
                                "date_of_create": str(comment.date_of_create.day) + "." + str(comment.date_of_create.month) + "." + str(comment.date_of_create.year) + " " + str(comment.date_of_create.hour) + ":" + str(comment.date_of_create.minute),
                                "modified": str(comment.date_of_last_change.day) + "." + str(comment.date_of_last_change.month) + "." + str(comment.date_of_last_change.year) + " " + str(comment.date_of_last_change.hour) + ":" + str(comment.date_of_last_change.minute),
                                "text": comment.text}
                    comments_data.append(new_comment)
            return JsonResponse(comments_data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułu o podanym ID!", safe=False, status = status.HTTP_404_NOT_FOUND)