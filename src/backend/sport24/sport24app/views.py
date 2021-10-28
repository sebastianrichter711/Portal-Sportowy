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

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)

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
        disciplines_serial = GetDisciplineSerializer(disciplines, many = True)
        return JsonResponse(disciplines_serial.data, safe=False, status=status.HTTP_200_OK)

