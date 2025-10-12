from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class BlogPost(models.Model):
    """Model for blog posts"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    content = models.TextField(blank=True)
    categories = models.CharField(max_length=200, help_text="Comma-separated categories")
    read_time = models.IntegerField(default=5, help_text="Read time in minutes")
    cover_image = models.ImageField(upload_to='blog_covers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'slug': self.slug})
    
    def get_categories_list(self):
        """Return categories as a list"""
        return [cat.strip() for cat in self.categories.split(',') if cat.strip()]

