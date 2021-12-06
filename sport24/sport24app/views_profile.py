# from rest_framework import status
# from .models import *
# from .serializers import *
# from django.views.decorators.csrf import csrf_exempt
# from django.http.response import JsonResponse
# from rest_framework.parsers import JSONParser

# @csrf_exempt
# def user_api(request, id):
#     if request.method == "GET":
#         user = Profile.objects.get(user__id=id)
#         if user:
#             user_data = {}
#             user_data['login'] = user.user.username
#             user_data['email'] = user.user.email
#             user_data['first_name'] = user.user.first_name
#             user_data['last_name'] = user.user.last_name
#             user_data['sex'] = user.sex
#             user_data['birth_date'] = user.birth_date
#             user_data['phone_number'] = user.phone_number
#             user_data['comments_number'] = user.comments_number
#             user_data['avatar'] = str(user.avatar)
#             return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
#         return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

#     if request.method == "PUT":
#         user_data=JSONParser().parse(request)
#         user = Profile.objects.get(user__id=id)
#         if user:
#             user.user.username = user_data['login']
#             user.user.email = user_data['email']
#             user.user.first_name = user_data['first_name']
#             user.user.last_name = user_data['last_name']
#             user.sex = user_data['sex']
#             user.birth_date = user_data['birth_date']
#             user.phone_number = user_data['phone_number']
#             user.save()
#             user.user.save()
#             return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
#         return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
#     elif request.method=='DELETE':
#         user=User.objects.get(id=id)
#         if user:
#             user.delete()
#             return JsonResponse("Użytkownik usunięty.", safe=False, status = status.HTTP_200_OK)
#         return JsonResponse("Nie usunięto użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)   


# @csrf_exempt
# def get_short_user_data(request, id):
#     if request.method == "GET":
#         user = Profile.objects.get(user__id=id)
#         if user:
#             user_data = {}
#             user_data['login'] = user.user.username
#             user_data['email'] = user.user.email
#             user_data['avatar'] = str(user.avatar)
#             return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
#         return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)