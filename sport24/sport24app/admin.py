from django.contrib import admin
from .models import *

# Register your models here.

models = [Section, Article, Comment, Discipline, Game, Season, Match, Quote]
admin.site.register(models)
