from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, last_name, phone_number, birth_date, password1, password2, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, last_name, phone_number, birth_date, password1, password2, **other_fields)

    def create_user(self, email, user_name, first_name, last_name, phone_number, birth_date, password1, password2, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        if password1 == password2:
            user = self.model(email=email, user_name=user_name,
                          first_name=first_name, last_name=last_name, phone_number=phone_number, birth_date=birth_date, **other_fields)
            user.set_password(password1)
            user.save()
            return user


def upload_to_profiles(instance, filename):
    return 'profiles/{filename}'.format(filename=filename)

class NewUser(AbstractBaseUser, PermissionsMixin):

    id = models.AutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    sex = models.CharField(max_length=10, blank=True)
    phone_number = models.CharField(max_length=14, blank=True)
    birth_date = models.DateField(null=True)
    role = models.CharField(max_length=30, blank=True)
    authorize_date = models.DateField(null=True, blank=True)
    end_authorize_date = models.DateField(null=True, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)
    comments_number = models.IntegerField(blank=True, default=0)
    avatar = models.ImageField(_("Image"), upload_to=upload_to_profiles, default='ludzik.png', null=True, blank=True)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name', 'last_name', 'phone_number', 'birth_date']
    
    def __str__(self):
        return self.user_name
