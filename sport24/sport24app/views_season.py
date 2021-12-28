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
    
@csrf_exempt
def get_all_seasons(request, name):
    if request.method == 'GET':
        game = Game.objects.get(name=name)
        if game: 
            seasons = Season.objects.filter(game_id=game).distinct('season').order_by('-season')
            if seasons:   
                seasons_serial = ShortSeasonSerializer(seasons, many = True)
                return JsonResponse(seasons_serial.data, safe=False, status=status.HTTP_200_OK)                            
            return JsonResponse("Nie znaleziono sezonów dla danej ligi!", safe=False, status=status.HTTP_404_NOT_FOUND)
                    
                    
@csrf_exempt
def get_all_phases(request, season, name):
    if request.method == 'GET':
        game = Game.objects.get(name=name)
        if game: 
            seasons = Season.objects.filter(season=season, game_id=game).distinct('phase')
            if seasons:
                seasons_serial = ShortPhaseSerializer(seasons, many = True)
                return JsonResponse(seasons_serial.data, safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie znaleziono faz dla danego sezonu danej ligi!", safe=False, status=status.HTTP_404_NOT_FOUND)
        
@csrf_exempt
def get_all_rounds(request, season, name):
    if request.method == 'GET':
        game = Game.objects.get(name=name)
        if game: 
            seasons = Season.objects.filter(season=season, game_id=game).distinct('round').order_by('-round')
            if seasons:                             
                seasons_serial = ShortRoundSerializer(seasons, many = True)
                return JsonResponse(seasons_serial.data, safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie znaleziono rund dla danych: ligi, sezonu!", safe=False, status=status.HTTP_404_NOT_FOUND)

