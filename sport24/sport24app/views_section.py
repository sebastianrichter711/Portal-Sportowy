from rest_framework import status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

@csrf_exempt
def sections_api(request):
    if request.method == "GET":
        sections = Section.objects.all()
        if sections:
            sections_serial = GetSectionSerializer(sections, many = True)
            return JsonResponse(sections_serial.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Nie znaleziono działów!", safe=False, status=status.HTTP_404_NOT_FOUND)

    #if request.method == "POST":
    #    section_data=JSONParser().parse(request)
    #    section_serial = PostSectionSerializer(data=section_data)
    #    if section_serial.is_valid():
    #        section_serial.save()
    #        return JsonResponse(section_serial.data, safe=False, status=status.HTTP_201_CREATED)
    #    return JsonResponse("Nie dodano działu.", safe=False, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def delete_section(request, id):
    if request.method=='DELETE':
        section=Section.objects.get(section_id=id)
        if section:
            section.delete()
            return JsonResponse("Sekcja usunięta.", safe=False, status = status.HTTP_200_OK)
        return JsonResponse("Nie usunięto sekcji!", safe=False, status = status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
def edit_section(request, section_id):
    if request.method == "PUT":
        section_data=JSONParser().parse(request)
        section = Section.objects.get(section_id = section_id)
        if section:
            section_serial = GetSectionSerializer(section, data = section_data)
            if section_serial.is_valid():
                section_serial.save()
                return JsonResponse("Zmieniono dane dot. działu!", safe=False, status=status.HTTP_200_OK)
            return JsonResponse("Nie zmieniono danych dot. działu!", safe=False, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse("Nie znaleziono działu!", safe=False, status=status.HTTP_404_NOT_FOUND)