from django.conf.urls import url
from django.db.models.query import ValuesIterable
from django.urls import path, include
from knox import views as knox_views
from .views_auth import *
from rest_framework import routers
from sport24app import views_article, views_auth, views_comment, views_discipline, views_game, views_match, views_profile, views_quote, views_season, views_section,views_profile, views_quote, views_season, views_section

urlpatterns = [
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view()),
    path('change_password', ChangePasswordView.as_view(), name='change-password'),
    path('section', views_section.sections_api),
    path('delete_section/<int:id>', views_section.delete_section),
    path('discipline', views_discipline.disciplines_api),
    path('games/<str:name>', views_game.discipline_games),
    path('game', views_game.add_game),
    path('profile/<int:id>', views_profile.user_api),
    path('short_profile/<int:id>', views_profile.get_short_user_data),
    path('comment/<int:id>', views_comment.comment_api),
    path('download_articles/<str:section_name>', views_article.download_articles),
    path('newest_article', views_article.get_newest_article),
    path('newest_articles', views_article.get_newest_articles),
    path('found_articles/<str:keyword>', views_article.find_articles_by_keyword),
    path('article/<int:id>', views_article.get_article),
    path('articles/<str:section_name>', views_article.get_articles_for_section),
    path('articles_home_page', views_article.get_articles_for_home_page),
    path('quote', views_quote.get_quote),
    path('add_comment/<int:article_id>/<int:profile_id>', views_comment.add_comment_to_article),
    path('article/<int:article_id>/comments', views_comment.get_comments_for_article),
    path('section/<int:section_id>', views_section.edit_section),
    path('discipline/<int:discipline_id>', views_discipline.edit_discipline),
    path('game/<int:game_id>', views_game.edit_game),
    path('comment/<int:comment_id>/<int:article_id>', views_comment.delete_comment_from_article),
    path('newest_matches', views_match.get_newest_matches),
    path('add_matches/<int:game_id>/<str:phase>/<str:round>/<str:season>', views_match.add_matches),
    path('edit_match/<int:match_id>', views_match.edit_match),
    path('get_matches/<int:game_id>', views_match.get_matches_for_season),
    path('add_season', views_season.add_season),
    path('edit_season/<int:season_id>', views_season.edit_season),
    path('add_discipline/', views_discipline.CreateDiscipline.as_view(), name='add_discipline'),
    path('search/', views_article.PostListDetailfilter.as_view(), name='postsearch')
]

