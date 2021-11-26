from datetime import datetime
from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import datetime, json
from datetime import datetime

@csrf_exempt
def add_season(request):
    if request.method == "POST":
        season_data=JSONParser().parse(request)
        season_serial = SeasonSerializer(data=season_data)
        if season_serial.is_valid():
            season_serial.save()
            return JsonResponse(season_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano sezonu!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def edit_season(request, season_id):
    if request.method=='PUT':
        season_data = JSONParser().parse(request)
        season=Season.objects.get(season_id=season_id)
        season_serial=SeasonSerializer(season, data=season_data)
        if season_serial.is_valid():
            season_serial.save()
            return JsonResponse(season_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zaktualizowano sezonu!", safe=False, status=status.HTTP_404_NOT_FOUND)

