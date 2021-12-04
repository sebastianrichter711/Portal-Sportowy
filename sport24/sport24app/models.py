from django.db import models
from datetime import date
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

# Create your models here.

def upload_to_profiles(instance, filename):
    return 'profiles/{filename}'.format(filename=filename)

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
    avatar = models.ImageField(_("Image"), upload_to=upload_to_profiles, default='media/ludzik.png', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.user.first_name} {self.user.last_name})"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

def upload_to_sections(instance, filename):
    return 'sections/{filename}'.format(filename=filename)

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    number_of_articles = models.IntegerField(default=0, blank=True)
    icon = models.ImageField(_("Image"), upload_to=upload_to_sections, default='media/ludzik.png', null=True, blank=True)
    moderator_id = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name
    
def upload_to_articles(instance, filename):
    return 'articles/{filename}'.format(filename=filename)

class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(blank=True, null=True)
    lead_text = models.TextField()
    text = models.TextField()
    big_title_photo = models.ImageField(_("Image"), upload_to=upload_to_articles, default='media/ludzik.png', null=True, blank=True)
    page_views = models.IntegerField(default=0, blank=True)
    comments_number = models.IntegerField(default=0, blank=True)
    section_id = models.ForeignKey(Section, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"Artykuł {self.article_id} ({self.title})"

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    author_id = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(null=True, blank=True)
    text = models.TextField()
    article_id = models.ForeignKey(Article, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"Komentarz {self.comment_id} ({self.author_id.user.username})"

def upload_to_disciplines(instance, filename):
    return 'disciplines/{filename}'.format(filename=filename)

class Discipline(models.Model):
    discipline_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.ImageField(_("Image"), upload_to=upload_to_disciplines, default='media/ludzik.png', null=True, blank=True)

    def __str__(self):
        return self.name

def upload_to_games(instance, filename):
    return 'games/{filename}'.format(filename=filename)

class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    db_game_id = models.IntegerField()
    name = models.CharField(max_length=100)
    logo = models.ImageField(_("Image"), upload_to=upload_to_games, default='media/ludzik.png', null=True, blank=True)
    discipline_id = models.ForeignKey(Discipline, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name

class Season(models.Model):
    season_id = models.AutoField(primary_key=True)
    season = models.CharField(max_length=10)
    phase = models.CharField(max_length=20)
    round = models.CharField(max_length=20)
    game_id = models.ForeignKey(Game, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.game_id.name} {self.season} {self.phase} {self.round}"

class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    match_date = models.DateTimeField()
    host = models.CharField(max_length=30)
    guest = models.CharField(max_length=30)
    score = models.CharField(max_length=10)
    season_id = models.ForeignKey(Season, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.match_date} {self.host}-{self.guest}"

class Quote(models.Model):
    quote_id = models.AutoField(primary_key=True)
    quote = models.TextField(null=True)
    description = models.TextField(null=True)