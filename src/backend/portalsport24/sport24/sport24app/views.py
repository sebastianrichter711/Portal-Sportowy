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

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        got_username = user.username
        user = Users.objects.get(username=got_username)
        position = user.position
        login_list = super(LoginAPI, self).post(request, format=None)
        login_list.data["position"] = position
        return JsonResponse(login_list.data, safe=False, status=status.HTTP_200_OK)

@csrf_exempt
def sections_api(request, id = 0):
    if request.method == "POST":
        section_data=JSONParser().parse(request)
        section_serial = SectionSerializer(data=section_data)
        if section_serial.is_valid():
            section_serial.save()
            return JsonResponse(section_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano sekcji.", safe=False, status=status.HTTP_404_NOT_FOUND)

