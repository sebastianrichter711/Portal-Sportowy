from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import json
import requests
from bs4 import BeautifulSoup

def download_matches(game_id, phase, round, season):
    
    if phase == 'grupowa':
        id_round = round
    elif phase == 'pucharowa' and round == 'ćwierćfinał':
        id_round = "125"
    elif phase == 'pucharowa' and round == 'półfinał':
        id_round = "150"
    elif phase == 'pucharowa' and round == 'finał':
        id_round = "200"
        
    url = f"https://www.thesportsdb.com/api/v1/json/2/eventsround.php?id={game_id}&r={id_round}&s={season}"
    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')
    #print(html)
    string_matches = str(html)
    json_matches = json.loads(string_matches)
    #formatted_json_matches = json.dumps(json_matches, indent=2)

    game = Game.objects.get(db_game_id=game_id)
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
                
        
            