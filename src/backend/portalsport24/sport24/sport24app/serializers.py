from rest_framework import serializers
from .models import *

# API Serializers

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = (
            'name',
            "moderator_id"
        )
