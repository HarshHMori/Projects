from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

# from django.contrib.auth.models import User

class Category(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'
    PRODUCTS = 'products'
    SPORTS = 'sports'
    ENTERTAINMENT = 'entertainment'
    ARTS = 'arts'
    FOOD = 'food'
    MUSIC = 'music'
    MOVIES = 'movies'
    BOOKS = 'books'

class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices=Category.choices, default=Category.WORLD)
    thumbnail = models.ImageField(upload_to='photos/%y/%m/%d/', blank=True)
    excerpt = models.CharField(max_length=150)
    year = models.CharField(max_length=4, default="2024")
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)
    # 
    user = models.CharField(max_length=50)
    company_name = models.CharField(max_length=100, blank=True)
    company_link = models.URLField(blank=True, null=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):
            slug = f"{original_slug}-{count}"
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title

# models.py
from django.db import models
from django.utils import timezone

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)
    organization_link = models.URLField(blank=True, null=True)  # Optional field
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.username
