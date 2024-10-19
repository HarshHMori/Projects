from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
        lookup_field = 'slug'
    
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['organization_name', 'organization_link']

class UserRegistrationSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'profile']
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            )
        UserProfile.objects.create(
            user=user,
            organization_name=profile_data['organization_name'],
            organization_link=profile_data.get('organization_link')
        )
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}
# 
class AddUserBlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'category', 'thumbnail', 'excerpt', 'month', 'day', 'year', 'content', 'featured', 'user', 'company_name', 'company_link']