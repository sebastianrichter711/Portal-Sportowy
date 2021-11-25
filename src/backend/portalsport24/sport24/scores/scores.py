from bs4.element import Script
import requests
from bs4 import BeautifulSoup
from sport24app.models import Match, Season, Game
import re
from datetime import datetime
import json

def download_matches(game_id, round, season_number):
    
    url = f"https://www.thesportsdb.com/api/v1/json/2/eventsround.php?id={game_id}&r={round}&s={season_number}"
    data = requests.get(url)
    html = BeautifulSoup(data.text, 'html.parser')
    string_matches = str(html)
    json_matches = json.loads(string_matches)
    #formatted_json_matches = json.dumps(json_matches, indent=2)

    for event in json_matches["events"]:
        game = Game.objects.get(db_game_id=game_id)
        season = Season.objects.get(season=season_number, stage=str(round), game_id=game)
        score = event['intHomeScore'] + ':' + event['intAwayScore']
        new_match = Match.objects.create(match_date=event['strTimestamp'], host=event['strHomeTeam'],
                                        guest=event['strAwayTeam'], score=score, season_id=season)
        new_match.save()

    
        