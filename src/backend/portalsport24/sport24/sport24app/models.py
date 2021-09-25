from django.db import models
from datetime import date
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

# Create your models here.
class UsersManager(BaseUserManager):
    def create_user(self, username, email, name, surname, pesel, address, phone, birthdate, position, password = None):
        if not username:
            raise ValueError(u"Proszę podać login!")
        if not email:
            raise ValueError(u"Proszę podać email!")
        if not name:
            raise ValueError(u"Proszę podać imię!")
        if not surname:
            raise ValueError(u"Proszę podać nazwisko!")
        if not pesel:
            raise ValueError(u"Proszę podać PESEL!")
        if not address:
            raise ValueError(u"Proszę podać adres!")
        if not phone:
            raise ValueError(u"Proszę podać telefon!")
        if not birthdate:
            raise ValueError(u"Proszę podać datę urodzenia!")
        if not position:
            raise ValueError(u"Proszę podać stanowisko!")
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,
            name = name,
            surname = surname,
            pesel = pesel,
            address = address,
            phone = phone,
            birthdate = birthdate,
            position = position
            )
        user.set_password(password)
        user.save(using = self._db)
        return user
        
    def create_superuser(self, username, email, name, surname, phone, birthdate, position, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            name = name,
            surname = surname,
            phone = phone,
            birthdate = birthdate,
            position = position
            )
        user.is_admin = user.is_staff = user.is_superuser = True
        user.save(using = self._db)
        return user

class Users(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique = True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    sex = models.CharField(max_length=10)
    phone = models.CharField(max_length=14) 
    birthdate = models.DateField() 
    position = models.CharField(max_length=30)
    available = models.BooleanField()
    authorize_date = models.DateField(null=True)
    end_authorize_date = models.DateField(null=True)

    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name", "surname", "sex", "birthdate"]
    objects = UsersManager()

    def __str__(self):
        return f"{self.username}({self.name} {self.surname})"
    
    def has_perm (self, perm, obj = None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True

class Sections(models.Model):
    section_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    number_of_articles = models.IntegerField(default=0)
    moderator_id = models.ForeignKey(Users, on_delete=models.DO_NOTHING)

class Articles(models.Model):
    article_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(null=True)
    text = models.TextField()
    #image = models.ImageField()
    page_views = models.IntegerField(default=0)
    section_id = models.ForeignKey(Sections, on_delete=models.DO_NOTHING)

class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.DO_NOTHING)
    date_of_create = models.DateTimeField()
    date_of_last_change = models.DateTimeField(null=True)
    text = models.TextField()
    article_id = models.ForeignKey(Articles, on_delete=models.DO_NOTHING)


