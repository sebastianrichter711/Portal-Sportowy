# Generated by Django 3.2.9 on 2021-12-02 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sport24app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='big_title_photo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
