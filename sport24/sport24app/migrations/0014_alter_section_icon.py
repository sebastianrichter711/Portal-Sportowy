# Generated by Django 3.2.9 on 2021-12-04 14:01

from django.db import migrations, models
import sport24app.models


class Migration(migrations.Migration):

    dependencies = [
        ('sport24app', '0013_alter_section_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=sport24app.models.upload_to_sections, verbose_name='Image'),
        ),
    ]
