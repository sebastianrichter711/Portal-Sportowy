from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import random

@csrf_exempt
def get_quote(request, id=0):
    if request.method == "GET":
        quotes = list(Quote.objects.all())
        if quotes:
            random_quote = random.choice(quotes)
            random_quote_serial = QuoteSerializer(random_quote)
            return JsonResponse(random_quote_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono cytatów!", safe=False, status = status.HTTP_404_NOT_FOUND)