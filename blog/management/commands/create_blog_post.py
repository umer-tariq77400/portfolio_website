from django.core.management.base import BaseCommand
from blog.models import BlogPost
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Create a new blog post'

    def add_arguments(self, parser):
        parser.add_argument('title', type=str, help='Blog post title')
        parser.add_argument('description', type=str, help='Blog post description')
        parser.add_argument('--categories', type=str, default='General', help='Comma-separated categories')
        parser.add_argument('--read-time', type=int, default=5, help='Read time in minutes')
        parser.add_argument('--content', type=str, default='', help='Blog post content (HTML)')

    def handle(self, *args, **options):
        title = options['title']
        description = options['description']
        categories = options['categories']
        read_time = options['read_time']
        content = options['content']
        
        # Generate slug
        slug = slugify(title)
        
        # Check if blog post exists
        if BlogPost.objects.filter(slug=slug).exists():
            self.stdout.write(self.style.ERROR(f'Blog post with slug "{slug}" already exists'))
            return
        
        # Create blog post
        blog_post = BlogPost.objects.create(
            title=title,
            slug=slug,
            description=description,
            content=content,
            categories=categories,
            read_time=read_time,
            is_published=True
        )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created blog post: {blog_post.title}'))
        self.stdout.write(self.style.SUCCESS(f'Slug: {blog_post.slug}'))
        self.stdout.write(self.style.SUCCESS(f'URL: /blog/{blog_post.slug}/'))
