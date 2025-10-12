from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Contact

def index(request):
    """Home page view"""
    context = {'active_page': 'home'}
    return render(request, 'portfolio/index.html', context)

def achievements(request):
    """Achievements page view"""
    context = {'active_page': 'achievements'}
    return render(request, 'portfolio/achievements.html', context)

def resume(request):
    """Resume page view"""
    context = {'active_page': 'resume'}
    return render(request, 'portfolio/resume.html', context)

def projects(request):
    """Projects page view"""
    context = {'active_page': 'projects'}
    return render(request, 'portfolio/projects.html', context)

def contact(request):
    """Contact page view with form handling"""
    context = {'active_page': 'contact'}
    
    if request.method == 'POST':
        firstname = request.POST.get('fname', '')
        lastname = request.POST.get('lname', '')
        phone = request.POST.get('phone', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')
        
        # Validation
        if not firstname or not email or not message:
            return JsonResponse({
                'title': 'Error',
                'body': 'First name, email, and message are required'
            }, status=400)
        
        # Save contact message
        try:
            Contact.objects.create(
                firstname=firstname,
                lastname=lastname,
                phone=phone,
                email=email,
                message=message
            )
            return JsonResponse({
                'title': 'Thank you!',
                'body': "I'll get back to you shortly!"
            })
        except Exception as e:
            return JsonResponse({
                'title': 'Error',
                'body': 'Sorry, there was an error saving your message. Please try again.'
            }, status=500)
    
    return render(request, 'portfolio/contact.html', context)

