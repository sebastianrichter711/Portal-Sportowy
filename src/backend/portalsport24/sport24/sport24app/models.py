from django.db import models
from datetime import date
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sex = models.CharField(max_length=10, blank=True)
    phone_number = models.CharField(max_length=14, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    role = models.CharField(max_length=30, blank=True)
    status = models.BooleanField(null=True, blank=True)
    authorize_date = models.DateField(null=True, blank=True)
    end_authorize_date = models.DateField(null=True, blank=True)
    comments_number = models.IntegerField(blank=True, default=0)
    avatar = models.ImageField(null=True, blank=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    number_of_articles = models.IntegerField(default=0, blank=True)
    icon = models.ImageField(null=True, blank=True)
    moderator_id = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)

class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(blank=True, null=True)
    text = models.TextField()
    big_title_photo = models.ImageField(null=True, blank=True)
    small_title_photo = models.ImageField(null=True, blank=True)
    add_photo = models.ImageField(null=True, blank=True)
    page_views = models.IntegerField(default=0, blank=True)
    section_id = models.ForeignKey(Section, on_delete=models.DO_NOTHING)

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    author_id = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(null=True, blank=True)
    text = models.TextField()
    article_id = models.ForeignKey(Article, on_delete=models.DO_NOTHING)

class Discipline(models.Model):
    discipline_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    logo = models.ImageField(null=True, blank=True)
    discipline_id = models.ForeignKey(Discipline, on_delete=models.DO_NOTHING)

class Season(models.Model):
    season_id = models.AutoField(primary_key=True)
    season = models.CharField(max_length=10)
    phase = models.CharField(max_length=20)
    stage = models.CharField(max_length=20)
    group = models.CharField(max_length=3, blank=True)
    game_id = models.ForeignKey(Game, on_delete=models.DO_NOTHING)

class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    match_date = models.DateTimeField()
    host = models.CharField(max_length=30)
    guest = models.CharField(max_length=30)
    score = models.CharField(max_length=10)
    season_id = models.ForeignKey(Season, on_delete=models.DO_NOTHING)

