from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

@csrf_exempt
def disciplines_api(request):
    if request.method == "GET":
        disciplines = Discipline.objects.all()
        if disciplines:
            disciplines_serial = DisciplineSerializer(disciplines, many = True)
            return JsonResponse(disciplines_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono dyscyplin!", safe=False, status=status.HTTP_404_NOT_FOUND)

    elif request.method == "POST":
        discipline_data=JSONParser().parse(request)
        discipline_serial = DisciplineSerializer(data=discipline_data)
        if discipline_serial.is_valid():
            discipline_serial.save()
            return JsonResponse(discipline_serial.data, safe=False, status=status.HTTP_201_CREATED)
        return JsonResponse("Nie dodano dyscypliny.", safe=False, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def edit_discipline(request, discipline_id):
    if request.method == "PUT":
        discipline_data=JSONParser().parse(request)
        discipline = Discipline.objects.get(discipline_id = discipline_id)
        if discipline:
            discipline.name = discipline_data['name']
            discipline.save()
            return JsonResponse("Zmieniono dane dot. dyscypliny!", safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie zmieniono danych dot. dyscypliny!", safe=False, status=status.HTTP_404_NOT_FOUND)