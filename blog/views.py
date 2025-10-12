from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import BlogPost

def blog_list(request):
    """Blog listing page view"""
    posts = BlogPost.objects.filter(is_published=True)
    context = {
        'active_page': 'blog',
        'posts': posts
    }
    return render(request, 'blog/list.html', context)

def blog_detail(request, slug):
    """Individual blog post view"""
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    
    # Get recommended posts (latest 3 posts excluding current)
    recommended_posts = BlogPost.objects.filter(
        is_published=True
    ).exclude(id=post.id)[:3]
    
    context = {
        'active_page': 'blog',
        'post': post,
        'recommended_posts': recommended_posts
    }
    return render(request, 'blog/detail.html', context)

def blog_list_api(request):
    """API endpoint for blog posts (JSON)"""
    posts = BlogPost.objects.filter(is_published=True).values(
        'title', 'slug', 'description', 'categories', 
        'read_time', 'cover_image', 'created_at'
    )
    return JsonResponse(list(posts), safe=False)

