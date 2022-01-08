from rest_framework import status, generics
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
import datetime
from datetime import datetime
from users.models import NewUser
from rest_framework.views import APIView
from rest_framework.response import Response

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
    
# @csrf_exempt
# def add_comment_to_article(request, article_id, username):
#     if request.method == "POST":
#         print(request)
#         #comment_data=JSONParser().parse(request)
#         #comment_text = comment_data["text"]
#         profile = NewUser.objects.get(user_name = username)
#         article = Article.objects.get(article_id=article_id)
#         if profile and article:
#             new_comment = Comment.objects.create(author_id=profile, date_of_create=datetime.now(), text=request.data,
#                                                  article_id = article)
#             new_comment.save()
#             profile.comments_number += 1
#             profile.save()
#             article.comments_number += 1
#             article.save()
#             return JsonResponse("Dodano komentarz!", safe=False, status=status.HTTP_200_OK)
#         return JsonResponse("Nie znaleziono artykułu lub użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_comments_for_article(request, article_id):
    if request.method == "GET":
        article = Article.objects.get(article_id=article_id)
        if article:
            comments = Comment.objects.filter(article_id=article).order_by('-date_of_create')
            if comments:
                print(comments)
                comments_data = []
                for comment in comments:
                    if 0 <= comment.date_of_create.minute <= 9:
                        minute = '0' + str(comment.date_of_create.minute)
                    else:
                        minute = str(comment.date_of_create.minute)
                    if comment.date_of_last_change == None:
                        new_comment = {"comment_id": comment.comment_id,
                                        "login": comment.author_id.user_name, 
                                        "avatar": str(comment.author_id.avatar), 
                                        "date_of_create": str(comment.date_of_create.day) + "." + str(comment.date_of_create.month) + "." + str(comment.date_of_create.year) + " " + str(comment.date_of_create.hour) + ":" + minute,
                                        "text": comment.text,
                                        "section": comment.article_id.section_id.name}
                        comments_data.append(new_comment)
                    else:
                        new_comment = {"comment_id": comment.comment_id,
                                    "login": comment.author_id.user_name, 
                                    "avatar": str(comment.author_id.avatar), 
                                    "date_of_create": str(comment.date_of_create.day) + "." + str(comment.date_of_create.month) + "." + str(comment.date_of_create.year) + " " + str(comment.date_of_create.hour) + ":" + minute,
                                    "modified": str(comment.date_of_last_change.day) + "." + str(comment.date_of_last_change.month) + "." + str(comment.date_of_last_change.year) + " " + str(comment.date_of_last_change.hour) + ":" + minute,
                                    "text": comment.text,
                                    "section": comment.article_id.section_id.name}
                        comments_data.append(new_comment)
                        
                print(comments_data)
                return JsonResponse(comments_data, safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie znaleziono artykułu o podanym ID!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
class CreateCom(APIView):
    #permission_classes=[permissions.Is_Authenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self,request, article_id, username,format=None):
        print(request.data['text'])
        #comment_text = comment_data["text"]
        profile = NewUser.objects.get(user_name = username)
        article = Article.objects.get(article_id=article_id)
        if profile and article:
            new_comment = Comment.objects.create(author_id=profile, date_of_create=datetime.now(), text=request.data['text'],
                                                 article_id = article)
            new_comment.save()
            profile.comments_number += 1
            profile.save()
            article.comments_number += 1
            article.save()
            return JsonResponse("Dodano komentarz!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono artykułu lub użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)

#class DeleteComment(generics.RetrieveDestroyAPIView):
    #permission_classes = [permissions.IsAuthenticated]
#    serializer_class = CommentSerializer
#    queryset = Comment.objects.all()
    
class CommentDetail(generics.RetrieveAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
class EditComment(generics.UpdateAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    try:
        serializer_class = CommentSerializer
        queryset = Comment.objects.all()
    except Exception as e:
        print (type(e))
        
class DeleteComment(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    #parser_classes = [MultiPartParser, FormParser]
    def delete(self,request,comment_id,format=None):
        print(request.data)
        comment = Comment.objects.get(comment_id=comment_id)
        if comment:
            article = Article.objects.get(article_id = comment.article_id.article_id)
            author = NewUser.objects.get(id=comment.author_id.id)
            if article and author:
                comment.delete()
                article.comments_number -= 1
                article.save()
                author.comments_number -= 1
                author.save()
            return JsonResponse("Usunięto komentarz!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie usunięto komentarza",  safe=False, status=status.HTTP_404_NOT_FOUND)
