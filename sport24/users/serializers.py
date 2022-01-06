from rest_framework import serializers
from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password1 = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password1', 'password2')
        extra_kwargs = {'password1': {'write_only': True}}

    def create(self, validated_data):
        password1 = validated_data.pop('password1', None)
        password2 = validated_data.pop('password2', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        print(password1)
        print(password2)
        if password1 is not None and password2 is not None:
            instance.set_password(password1)
        instance.save()
        return instance
    
class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'first_name', 'last_name', 'sex', 'phone_number', 'birth_date', 'avatar')