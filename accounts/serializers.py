from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        # Check if the user belongs to a specific group
        if obj.groups.filter(name="Admin").exists():
            return "admin"
        elif obj.groups.filter(name="Chef").exists():
            return "chef"
        return "user"

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        # Create a new user with hashed password
        user = User.objects.create_user(**validated_data)
        return user


# New LoginSerializer for user login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
