from django.conf.urls import url
from django.db.models.query import ValuesIterable
from django.urls import path, include
from .views import *
from knox import views as knox_views
from rest_framework import routers
from sport24app import views

urlpatterns = [
    path('register', RegisterAPI.as_view(), name='register'),
    path('login', LoginAPI.as_view(), name='login'),
    path('logout', knox_views.LogoutView.as_view(), name='logout'),
    path('section', views.sections_api)
]