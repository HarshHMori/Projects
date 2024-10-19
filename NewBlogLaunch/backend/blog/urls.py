from django.urls import path 
from .views import BlogPostListView, BlogPostCategoryView, BlogPostFeaturedView, BlogPostDetailView, UserRegistrationView, UserLoginView, UserBlogsView, BlogsForUserView, DeleteUserBlogView, UpdateUserBlogView

urlpatterns = [
    path('register', UserRegistrationView.as_view(), name='user-registration'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path('addBlog', UserBlogsView.as_view(), name='addBlog'),
    path('userBlogs', BlogsForUserView.as_view(), name='user-blogs'),
    path('deleteBlog/<int:blog_id>', DeleteUserBlogView.as_view(), name='delete-user-blog'),
    path('updateBlog/<int:blog_id>', UpdateUserBlogView.as_view(), name='update-user-blog'),
    path('', BlogPostListView.as_view()),
    path('featured', BlogPostFeaturedView.as_view()),
    path('category', BlogPostCategoryView.as_view()),
    path('<slug>', BlogPostDetailView.as_view()), 
]