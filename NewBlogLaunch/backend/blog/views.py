from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer


class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class BlogPostDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)

class BlogPostCategoryView(APIView):
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self, request, formate = None):
        data = self.request.data
        category = data['category']
        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)

        serializer = BlogPostSerializer(queryset, many=True)
        return Response(serializer.data)


from rest_framework import status
from blog.serializers import UserRegistrationSerializer, UserLoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'User created successfully.'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        
        username = data.get('username')
        password = data.get('password')

        # Authenticate using username and password
        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({'message': 'User authenticated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        
        username = data.get('username')
        password = data.get('password')

        # Authenticate using username and password
        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({'message': 'User authenticated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        

from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from blog.serializers import AddUserBlogsSerializer
from django.contrib.auth.models import User
from .models import UserProfile

class UserBlogsView(APIView):
    permission_classes = [permissions.AllowAny]  # Ensure user is authenticated

    def post(self, request):
        data = request.data.copy()
        
        try:
            user_profile = UserProfile.objects.filter(user__username__exact=data['user']).first()
            data['company_name'] = user_profile.organization_name  # Get organization name
            data['company_link'] = user_profile.organization_link  # Optional: Get organization link
        except UserProfile.DoesNotExist:
            return Response(add_blog.errors, status=status.HTTP_400_BAD_REQUEST)  # Handle case where user profile doesn't exist
        

        # Now proceed to validate the blog data
        add_blog = AddUserBlogsSerializer(data=data)
        
        if add_blog.is_valid():
            add_blog.save()
            return Response({"message": "Blog added successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(add_blog.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response({'message': 'User is not authenticated'}, status=status.HTTP_403_FORBIDDEN)


class BlogsForUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        print("Request received with data:", data)  # Log the incoming request data
        user = data['user']
        queryset = BlogPost.objects.filter(user__exact=user)

        if not queryset.exists():
            print("No blogs found for user:", user)
        else:
            print("Blogs found:", queryset)

        serializer = BlogPostSerializer(queryset, many=True)
        return Response(serializer.data)

    
# View for deleting a blog by its ID
class DeleteUserBlogView(APIView):
    permission_classes = [permissions.AllowAny]  # Ensure user is authenticated

    def delete(self, request, blog_id):
        try:
            user = request.query_params.get('user')
            blog = BlogPost.objects.get(id=blog_id, user__exact=user)
            print(blog.featured)
            if blog.featured:
                # Select a new featured blog if necessary
                new_featured_blog = BlogPost.objects.filter(featured=False).first()
                if new_featured_blog:
                    new_featured_blog.featured = True
                    new_featured_blog.save()
            blog.delete()
            return Response({"message": "Blog deleted successfully"}, status=status.HTTP_200_OK)
        except BlogPost.DoesNotExist:
            return Response({"error": "Blog not found or you are not the owner"}, status=status.HTTP_404_NOT_FOUND)
        
class UpdateUserBlogView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, blog_id):
        try:
            user = request.query_params.get('user')
            blog = BlogPost.objects.get(id=blog_id, user__exact=user)
            serializer = BlogPostSerializer(blog)
            return Response(serializer.data)
        except BlogPost.DoesNotExist:
            return Response({"error": "Blog not found or you are not the owner"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, blog_id):
        try:
            user = request.query_params.get('user')
            blog = BlogPost.objects.get(id=blog_id, user__exact=user)

            print(f"Updating blog {blog_id} for user: {user}")  # Debugging
            print(f"Received data: {request.data}")  # Debugging

            # Handle file uploads if there's a thumbnail in the request
            if 'thumbnail' in request.FILES:
                print(f"Thumbnail received: {request.FILES['thumbnail']}")  # Debugging

            serializer = BlogPostSerializer(blog, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                print(f"Blog {blog_id} updated successfully.")  # Debugging
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print(f"Errors in serializer: {serializer.errors}")  # Debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except BlogPost.DoesNotExist:
            return Response({"error": "Blog not found or you are not the owner"}, status=status.HTTP_404_NOT_FOUND)
