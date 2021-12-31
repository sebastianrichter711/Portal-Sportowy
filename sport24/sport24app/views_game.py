from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.views import APIView



@csrf_exempt
def discipline_games(request, name):
    if request.method == "GET":
        games = Game.objects.filter(discipline_id__name=name)
        if games:
            games_serial = GameSerializer(games, many = True)
            return JsonResponse(games_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono rozgrywek dla dyscypliny " + name + "!", safe=False, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def add_game(request):
    if request.method == "POST":
        game_data=JSONParser().parse(request)
        game_data_serial = PostGameSerializer(data=game_data)
        if game_data_serial.is_valid():
            game_data_serial.save()
            return JsonResponse(game_data_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano rozgrywek.", safe=False, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def edit_game(request, game_id):
    if request.method == "PUT":
        game_data=JSONParser().parse(request)
        game = Game.objects.get(game_id = game_id)
        if game:
            game.name = game_data['name']
            game.discipline_id.discipline_id = game_data['discipline_id']
            game.save()
            return JsonResponse("Zmieniono dane dot. rozgrywki!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zmieniono danych dot. rozgrywki", safe=False, status=status.HTTP_404_NOT_FOUND)
    
class AddGame(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self,request,format=None):
        serializer = PostGameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano dyscypliny.", status=status.HTTP_404_NOT_FOUND)