from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'created_at', 'read_time', 'is_published']
    list_filter = ['is_published', 'created_at', 'categories']
    search_fields = ['title', 'description', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

