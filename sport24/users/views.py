from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.generics import GenericAPIView

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.user_name
        token['role'] = user.role
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class GetUserData(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def get(self, request):
        try:
            refresh_token = request.data['username']
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def user_api(request, username):
    if request.method == "GET":
        user = NewUser.objects.get(user_name=username)
        if user:
            user_data = {}
            user_data['login'] = user.user_name
            user_data['email'] = user.email
            user_data['first_name'] = user.first_name
            user_data['last_name'] = user.last_name
            user_data['sex'] = user.sex
            user_data['birth_date'] = user.birth_date 
            user_data['phone_number'] = user.phone_number
            user_data['comments_number'] = user.comments_number
            user_data['avatar'] = str(user.avatar)
            return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        user_data=JSONParser().parse(request)
        user = NewUser.objects.get(user_name=username)
        if user:
            user.user_name = user_data['login']
            user.email = user_data['email']
            user.first_name = user_data['first_name']
            user.last_name = user_data['last_name']
            user.sex = user_data['sex']
            user.birth_date = user_data['birth_date']
            user.phone_number = user_data['phone_number']
            user.save()
            return JsonResponse(user_data, safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono użytkownika o takim ID!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method=='DELETE':
        user=NewUser.objects.get(user_name=username)
        if user:
            user.delete()
            return JsonResponse("Użytkownik usunięty.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto użytkownika!", safe=False, status = status.HTTP_404_NOT_FOUND)  
    
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