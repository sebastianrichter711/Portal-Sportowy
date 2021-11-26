from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import json
import requests
from bs4 import BeautifulSoup

def download_matches(game_id, round, season_number):
    
    url = f"https://www.thesportsdb.com/api/v1/json/2/eventsround.php?id={game_id}&r={round}&s={season_number}"
    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')
    string_matches = str(html)
    json_matches = json.loads(string_matches)
    #formatted_json_matches = json.dumps(json_matches, indent=2)

    for event in json_matches["events"]:
        game = Game.objects.get(db_game_id=game_id)
        season = Season.objects.get(season=season_number, round=str(round), game_id=game)
        score = event['intHomeScore'] + ':' + event['intAwayScore']
        new_match = Match.objects.create(match_date=event['strTimestamp'], host=event['strHomeTeam'],
                                        guest=event['strAwayTeam'], score=score, season_id=season)
        new_match.save()

@csrf_exempt
def add_matches(request, game_id, round, season):
    if request.method == "POST":
        download_matches(game_id, round, season)
        return JsonResponse("Dodano mecze.", safe=False, status=status.HTTP_201_CREATED)
    return JsonResponse("Nie dodano meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def get_newest_matches(request):
    if request.method == "GET":
        newest_matches = Match.objects.all().order_by('-match_date')[:5]
        if newest_matches: 
            list_newest_matches = []
            for match in newest_matches:
                new_score = match.score.split(':')
                print(new_score)
                match = {"match_date": match.match_date, "host": match.host, "host_score": new_score[0],
                         "guest": match.guest, "guest_score": new_score[1]}
                list_newest_matches.append(match)
            return JsonResponse(list_newest_matches, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono najnowszych meczy!", safe=False, status=status.HTTP_404_NOT_FOUND)
    