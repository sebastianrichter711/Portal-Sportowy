from datetime import datetime
from rest_framework.views import APIView
from rest_framework import status,generics
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
''' 
class EditSeason(generics.UpdateAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = SeasonSerializer
    queryset = Season.objects.all()
'''
class DeleteSeason(generics.RetrieveDestroyAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = SeasonSerializer
    queryset = Season.objects.all()
    
class SeasonDetail(generics.RetrieveAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    
@csrf_exempt
def get_seasons(request):
    if request.method == 'GET':
        seasons = Season.objects.all()
        all_seasons = []
        for season in seasons:
            new_season = {"season_id": season.season_id, "season": season.season, "phase": season.phase, "round": season.round, "game": season.game_id.name}
            all_seasons.append(new_season)
        return JsonResponse(all_seasons, safe=False, status=status.HTTP_200_OK)
    return JsonResponse("Nie znaleziono sezonów!", safe=False, status=status.HTTP_404_NOT_FOUND)

class EditSeason(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    #parser_classes = [MultiPartParser, FormParser]
    def put(self,request,season_id,format=None):
        print(request.data)
        season = Season.objects.get(season_id=season_id)
        if season:
            season.season = request.data['season']
            season.phase = request.data['phase']
            season.round = request.data['round']
            game = Game.objects.get(name = request.data['game'])
            if game:
                season.game_id = game
            season.save()
            return JsonResponse("Zaktualizowano sezon!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zmieniono sezonu",  safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_season(request, id):
    if request.method == "GET":
        season = Season.objects.get(season_id = id)
        if season:
            season_serial = SeasonSerializer(season)
            return JsonResponse(season_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono sezonu!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_all_seasons_moderator(request):
    if request.method == 'GET':
        seasons = Season.objects.all()
        if seasons:
            all_seasons = []
            for season in seasons:
                new_season = {"season_id": season.season_id, "season": season.season, "phase": season.phase,
                              "round": season.round, "game_name": season.game_id.name}
                all_seasons.append(new_season)
            return JsonResponse(all_seasons, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono sezonów!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
class DeleteSeason(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    #parser_classes = [MultiPartParser, FormParser]
    def delete(self,request,season_id,format=None):
        print(request.data)
        season = Season.objects.get(season_id=season_id)
        if season:
            matches = Match.objects.filter(season_id=season)
            if matches:
                for match in matches:
                    match.delete()
            season.delete()
            return JsonResponse("Usunięto sezon!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie usunięto sezonu",  safe=False, status=status.HTTP_404_NOT_FOUND)
