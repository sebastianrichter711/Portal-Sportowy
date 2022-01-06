from django.conf.urls import url
from django.db.models.query import ValuesIterable
from django.urls import path, include
from rest_framework import routers
from sport24app import views_article, views_comment, views_discipline, views_game, views_match, views_quote, views_season, views_section, views_quote, views_season, views_section
from sport24app.views_article import PostList, PostDetail
from rest_framework.routers import DefaultRouter

# app_name = 'blog_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('section', views_section.sections_api),
    path('delete_section/<int:id>', views_section.delete_section),
    path('discipline', views_discipline.disciplines_api),
    path('get_all_games', views_game.get_all_games),
    path('games/<str:name>', views_game.discipline_games),
    path('game', views_game.add_game),
    path('comment/<int:id>', views_comment.comment_api),
    path('download_articles/<str:section_name>', views_article.AddArticle.as_view()),
    path('newest_article', views_article.get_newest_article),
    path('newest_articles', views_article.get_newest_articles),
    path('found_articles/<str:keyword>', views_article.find_articles_by_keyword),
    path('article/<int:article_id>', views_article.get_article),
    path('articles/<str:section_name>', views_article.get_articles_for_section),
    path('articles_home_page', views_article.get_articles_for_home_page),
    path('quote', views_quote.get_quote),
    #path('add_comment/<int:article_id>/<str:username>', views_comment.add_comment_to_article),
    path('article/<int:article_id>/comments', views_comment.get_comments_for_article),
    path('section/<int:section_id>', views_section.edit_section),
    path('discipline/<int:discipline_id>', views_discipline.edit_discipline),
    path('game/<int:game_id>', views_game.edit_game),
    path('comment/<int:comment_id>/<int:article_id>', views_comment.delete_comment_from_article),
    path('newest_matches', views_match.get_newest_matches),
    path('add_matches/<str:game>', views_match.AddMatches.as_view()),
    path('edit_match/<int:match_id>', views_match.edit_match),
    path('get_matches/<str:season>/<str:round>/<str:name>', views_match.get_matches_for_season),
    path('add_season', views_season.add_season),
    path('edit_season/<int:season_id>', views_season.edit_season),
    path('get_seasons/<str:name>', views_season.get_all_seasons),
    path('get_phases/<str:season>/<str:name>', views_season.get_all_phases),
    path('get_rounds/<str:season>/<str:name>', views_season.get_all_rounds),
    path('add_discipline/', views_discipline.CreateDiscipline.as_view(), name='add_discipline'),
    path('posts/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate'),
    path('search/', views_article.SearchedArticles.as_view(), name='postsearch'),
    path('add_comment/<int:article_id>/<str:username>', views_comment.CreateCom.as_view()),
    path('moderator/delete/<int:pk>/', views_article.DeleteArticle.as_view(), name='deletepost'),
    path('moderator/edit/<int:pk>/', views_article.EditArticle.as_view()),
    path('moderator/edit/postdetail/<int:pk>/', views_article.AdminPostDetail.as_view(), name='admindetailpost'),
    path('moderator/delete_dis/<int:pk>/', views_discipline.DeleteDiscipline.as_view()),
    path('moderator/edit_dis/<int:pk>', views_discipline.EditDiscipline.as_view()),
    path('moderator/delete_game/<int:pk>', views_game.DeleteGame.as_view()),
    path('moderator/edit_game/<int:pk>', views_game.EditGame.as_view()),
    path('deletecom/<int:pk>', views_comment.DeleteComment.as_view()),
    path('com/detail/<int:pk>', views_comment.CommentDetail.as_view()),
    path('editcom/<int:pk>', views_comment.EditComment.as_view()),




]


