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
    path('discipline', views.disciplines_api),
    path('games/<str:name>', views.discipline_games),
    path('profile/<int:id>', views.user_api),
    path('short_profile/<int:id>', views.get_short_user_data),
    path('delete_section/<int:id>', views.delete_section),
    path('delete_comment/<int:id>', views.delete_comment)
    #path('article/<int:id>', views.get_article)
]