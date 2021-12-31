from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# API Serializers

class PostSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'name',
            'icon',
            'moderator_id'
        )

class GetSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'name',
            'icon'
        )

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            'name',
            'icon'
        )

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'game_id',
            'name',
            'logo'
        )

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            #'article_id',
            'title', 
            'date_of_create',
            'date_of_last_change',
            'lead_text',
            'text',
            'page_views',
            'comments_number'
        )

class NewArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'date_of_create',
            'title'
        )
        
class NewestArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = (
            'article_id',
            'big_title_photo',
            'title'
        )

class ShortArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'article_id',
            'date_of_create',
            'title',
            'lead_text',
            'big_title_photo'
        )

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = (
            'quote',
            'description'
        )
        
class HomePageArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'article_id',
            'big_title_photo',
            'title'
        )
        
class PostGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'db_game_id',
            'name',
            'logo',
            'discipline_id'
        )
        
class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = (
            'match_date',
            'host',
            'guest',
            'score'
        )
        
class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'season',
            'phase',
            'round',
            'game_id'
        )
        
class ShortSeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'season_id',
            'season'
        )
        
class ShortPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'season_id',
            'phase'
        )

class ShortRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = (
            'season_id',
            'round'
        )