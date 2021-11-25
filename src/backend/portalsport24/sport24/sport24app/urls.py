from django.conf.urls import url
from django.db.models.query import ValuesIterable
from django.urls import path, include
from .views import *
from knox import views as knox_views
from rest_framework import routers
from sport24app import views

urlpatterns = [
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view()),
    path('change_password', ChangePasswordView.as_view(), name='change-password'),
    path('section', views.sections_api),
    path('delete_section/<int:id>', views.delete_section),
    path('discipline', views.disciplines_api),
    path('games/<str:name>', views.discipline_games),
    path('game', views.add_game),
    path('profile/<int:id>', views.user_api),
    path('short_profile/<int:id>', views.get_short_user_data),
    path('comment/<int:id>', views.comment_api),
    path('download_articles/<str:section_name>', views.download_articles),
    path('newest_article', views.get_newest_article),
    path('newest_articles', views.get_newest_articles),
    path('found_articles/<str:keyword>', views.find_articles_by_keyword),
    path('article/<int:id>', views.get_article),
    path('articles/<str:section_name>', views.get_articles_for_section),
    path('articles_home_page', views.get_articles_for_home_page),
    path('quote', views.get_quote),
    path('add_comment/<int:article_id>/<int:profile_id>', views.add_comment_to_article),
    path('article/<int:article_id>/comments', views.get_comments_for_article),
    path('section/<int:section_id>', views.edit_section),
    path('discipline/<int:discipline_id>', views.edit_discipline),
    path('game/<int:game_id>', views.edit_game),
    path('comment/<int:comment_id>/<int:article_id>', views.delete_comment_from_article),
    path('newest_matches', views.get_newest_matches),
    path('add_matches/<int:game_id>/<int:round>/<str:season>', views.add_matches)
]