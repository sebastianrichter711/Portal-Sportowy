from rest_framework import status,generics
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import json
import requests
from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

def download_matches(game, phase, round, season):
    
    if phase == 'grupowa':
        id_round = round
    elif phase == 'pucharowa' and round == 'ćwierćfinał':
        id_round = "125"
    elif phase == 'pucharowa' and round == 'półfinał':
        id_round = "150"
    elif phase == 'pucharowa' and round == 'finał':
        id_round = "200"
        
    game = Game.objects.get(name=game)
    if game:
        game_id = game.db_game_id
        
    url = f"https://www.thesportsdb.com/api/v1/json/2/eventsround.php?id={game_id}&r={id_round}&s={season}"
    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')
    #print(html)
    string_matches = str(html)
    json_matches = json.loads(string_matches)
    #formatted_json_matches = json.dumps(json_matches, indent=2)
    
    
    #season = Season.objects.get(season=season, phase=phase, round=round, game_id=game)
    season = Season.objects.create(season=season, phase=phase, round=round, game_id=game)
    season.save()
    
    for event in json_matches["events"]:
        if event['intHomeScore'] == None and event['intAwayScore'] == None:
            score = "-:-"
        else:
            score = event['intHomeScore'] + ':' + event['intAwayScore']
        new_match = Match.objects.create(match_date=event['strTimestamp'], host=event['strHomeTeam'],
                                        guest=event['strAwayTeam'], score=score, season_id=season)
        new_match.save()

@csrf_exempt
def add_matches(request, game_id, phase, round, season):
    if request.method == "POST":
        download_matches(game_id, phase, round, season)
        return JsonResponse("Dodano mecze.", safe=False, status=status.HTTP_201_CREATED)
    return JsonResponse("Nie dodano meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_newest_matches(request):
    if request.method == "GET":
        newest_matches = Match.objects.all().order_by('-match_date')[:4]
        if newest_matches: 
            list_newest_matches = []
            for match in newest_matches:
                new_score = match.score.split(':')
                new_date = match.match_date.strftime("%d.%m.%Y %H:%M")
                match = {"match_date": new_date, "host": match.host, "host_score": new_score[0],
                         "guest": match.guest, "guest_score": new_score[1]}
                list_newest_matches.append(match)
            return JsonResponse(list_newest_matches, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono najnowszych meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def edit_match(request, match_id):
    if request.method=='PUT':
        match_data = JSONParser().parse(request)
        match=Match.objects.get(match_id=match_id)
        match_serial=MatchSerializer(match, data=match_data)
        if match_serial.is_valid():
            match_serial.save()
            return JsonResponse(match_serial.data, safe=False)
        return JsonResponse("Nie zaktualizowano meczu!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def get_matches_for_season(request, season, round, name):
    if request.method == "GET":
        #season_data = JSONParser().parse(request)
        game = Game.objects.get(name=name)
        if game:
            season = Season.objects.get(season=season, round=round, game_id=game)
            if season:
                matches = Match.objects.filter(season_id=season).order_by('match_date')
                if matches:
                    matches_list = []
                    for match in matches:
                        if 0 <= match.match_date.minute <= 9:
                            minute = "0" + str(match.match_date.minute)
                        else:
                            minute = str(match.match_date.minute)
                        print(minute)
                        new_match = {
                                "match_date": str(match.match_date.day) + "." + str(match.match_date.month) + "." + str(match.match_date.year) + " " + str(match.match_date.hour) + ":" + minute,
                                "host": match.host,
                                "guest": match.guest, 
                                "score": match.score } 
                        matches_list.append(new_match)
                    #matches_serial = MatchSerializer(matches, many = True)
                return JsonResponse(matches_list, safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie znaleziono spotkań!", safe=False, status=status.HTTP_404_NOT_FOUND)
                
                
class AddMatches(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self,request,game, format=None):
        download_matches(game, request.data['phase'], request.data['round'], request.data['season'])
        return JsonResponse("Dodano mecze.", safe=False, status=status.HTTP_201_CREATED)
    #return JsonResponse("Nie dodano meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)
'''
class EditMatch(generics.UpdateAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
'''
class DeleteMatch(generics.RetrieveDestroyAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    
class MatchDetail(generics.RetrieveAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
        
class MatchList(generics.ListAPIView):

    serializer_class = MatchSerializer
    queryset = Match.objects.all()

@csrf_exempt
def get_matches(request):
    if request.method == 'GET':
        matches = Match.objects.all()
        all_matches = []
        for match in matches:
            new_match = {"match_id": match.match_id, "game": match.season_id.game_id.name, "season": match.season_id.season, "phase": match.season_id.phase, "round": match.season_id.round, 
                         "match_date": match.match_date, "host": match.host, "guest": match.guest, "score": match.score}
            all_matches.append(new_match)
        return JsonResponse(all_matches, safe=False, status=status.HTTP_200_OK)
    return JsonResponse("Nie znaleziono meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)
            
class EditMatch(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    #parser_classes = [MultiPartParser, FormParser]
    def put(self,request,match_id,format=None):
        print(request.data)
        match = Match.objects.get(match_id=match_id)
        if match:
            match.match_date = request.data['match_date']
            match.host = request.data['host']
            match.guest = request.data['guest']
            match.score = request.data['score']
            season = Season.objects.get(season_id = request.data['season'])
            if season:
                match.season_id = season
            match.save()
            return JsonResponse("Zaktualizowano sezon!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zmieniono sezonu",  safe=False, status=status.HTTP_404_NOT_FOUND)