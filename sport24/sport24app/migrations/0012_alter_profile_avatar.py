# Generated by Django 3.2.9 on 2021-12-04 14:00

from django.db import migrations, models
import sport24app.models


class Migration(migrations.Migration):

    dependencies = [
        ('sport24app', '0011_alter_profile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='media/ludzik.png', null=True, upload_to=sport24app.models.upload_to_profiles, verbose_name='Image'),
        ),
    ]
