from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.

class MyUserAdmin(BaseUserAdmin):
    
    list_display = ('username',
            'name',
            'surname', 
            'email',
            'sex',
            'phone',
            'birthdate',
            'position',
            'available',
            'authorize_date',
            'end_authorize_date',
            'date_joined',
            'last_login',
            'is_active',
            'is_admin')
    
    search_fields = ('email',)
    
    readonly_fields=(
            'date_joined',
            'last_login')
    
    filter_horizontal=()
    list_filter=('last_login',)
    fieldsets=()

    add_fieldsets=(
        (None, {
            'classes': ('wide'),
            'fields': ('username',
            'name',
            'surname', 
            'email',
            'sex',
            'phone',
            'birthdate',
            'position',
            'available',
            'authorize_date',
            'end_authorize_date',
            'password1',
            'password2'),
        }),
    )

    ordering=('username',)

admin.site.register(Users,MyUserAdmin)
