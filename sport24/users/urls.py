from django.urls import path
from .views import *

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('profile/<str:username>', user_api),
    path('deleteuser/<str:username>', delete_user),
    path('edit/<str:username>', EditUser.as_view()),
    path('get_user_data', GetUserData.as_view(), name='as_view')
]