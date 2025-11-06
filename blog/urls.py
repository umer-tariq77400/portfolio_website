from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.blog_list, name='list'),
    path('api/', views.blog_list_api, name='api'),
    path('<slug:slug>/', views.blog_detail, name='detail'),
]
