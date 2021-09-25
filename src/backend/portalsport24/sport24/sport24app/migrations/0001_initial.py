# Generated by Django 3.2.7 on 2021-09-25 20:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('article_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('date_of_create', models.DateTimeField()),
                ('date_of_last_change', models.DateTimeField(null=True)),
                ('text', models.TextField()),
                ('page_views', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('surname', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('sex', models.CharField(max_length=10)),
                ('phone', models.CharField(max_length=14)),
                ('birthdate', models.DateField()),
                ('position', models.CharField(max_length=30)),
                ('available', models.BooleanField()),
                ('authorize_date', models.DateField(null=True)),
                ('end_authorize_date', models.DateField(null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Sections',
            fields=[
                ('section_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('number_of_articles', models.IntegerField(default=0)),
                ('moderator_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sport24app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('date_of_create', models.DateTimeField()),
                ('date_of_last_change', models.DateTimeField(null=True)),
                ('text', models.TextField()),
                ('article_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sport24app.articles')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sport24app.users')),
            ],
        ),
        migrations.AddField(
            model_name='articles',
            name='section_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sport24app.sections'),
        ),
    ]
