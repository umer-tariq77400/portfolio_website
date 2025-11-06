# Django Portfolio Website - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Django Application                      │
│                  (portfolio_website/Django)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         Django Project Settings         │
        │         (portfolio_site/)              │
        │                                         │
        │  • settings.py - Configuration         │
        │  • urls.py - URL routing               │
        │  • wsgi.py - WSGI interface            │
        └─────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌───────────────────┐ ┌──────────────────┐
        │  Portfolio App    │ │    Blog App      │
        │  (portfolio/)     │ │    (blog/)       │
        │                   │ │                  │
        │  Models:          │ │  Models:         │
        │  • Contact        │ │  • BlogPost      │
        │                   │ │                  │
        │  Views:           │ │  Views:          │
        │  • index          │ │  • blog_list     │
        │  • achievements   │ │  • blog_detail   │
        │  • resume         │ │  • blog_list_api │
        │  • projects       │ │                  │
        │  • contact        │ │  URLs:           │
        │                   │ │  • /blog/        │
        │  URLs:            │ │  • /blog/<slug>/ │
        │  • /              │ │  • /blog/api/    │
        │  • /achievements/ │ │                  │
        │  • /resume/       │ │  Admin:          │
        │  • /projects/     │ │  • BlogPost mgmt │
        │  • /contact/      │ │                  │
        │                   │ │  Commands:       │
        │  Admin:           │ │  • create_blog   │
        │  • Contact mgmt   │ │    _post         │
        └───────────────────┘ └──────────────────┘
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │            Templates Layer              │
        │            (templates/)                 │
        │                                         │
        │  base/                                  │
        │  • base.html - Base template           │
        │  • navbar.html - Navigation            │
        │  • footer.html - Footer                │
        │                                         │
        │  portfolio/                             │
        │  • index.html                           │
        │  • achievements.html                    │
        │  • resume.html                          │
        │  • projects.html                        │
        │  • contact.html                         │
        │                                         │
        │  blog/                                  │
        │  • list.html                            │
        │  • detail.html                          │
        └─────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌───────────────────┐ ┌──────────────────┐
        │  Static Files     │ │   Media Files    │
        │  (static/)        │ │   (media/)       │
        │                   │ │                  │
        │  • CSS files      │ │  • Blog covers   │
        │  • JS files       │ │  • Uploads       │
        │  • Images         │ │                  │
        └───────────────────┘ └──────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │            Database Layer               │
        │                                         │
        │  Development:                           │
        │  • SQLite3 (db.sqlite3)                 │
        │                                         │
        │  Production:                            │
        │  • Azure PostgreSQL                     │
        └─────────────────────────────────────────┘
```

## Data Flow

### 1. Blog Post Creation Flow

```
Admin User → Django Admin (/admin)
                    │
                    ▼
            BlogPost Model
                    │
                    ▼
            Database (SQLite3/PostgreSQL)
                    │
                    ▼
            Blog Views (blog_list, blog_detail)
                    │
                    ▼
            Templates (list.html, detail.html)
                    │
                    ▼
            User's Browser
```

### 2. Contact Form Flow

```
User → Contact Form (/contact/)
            │
            ▼
    POST to contact view
            │
            ▼
    Validation & CSRF check
            │
            ▼
    Contact Model.save()
            │
            ▼
    Database (SQLite3/PostgreSQL)
            │
            ▼
    JSON Response (success/error)
            │
            ▼
    JavaScript displays message
```

### 3. Page Request Flow

```
User Request (e.g., /blog/)
            │
            ▼
    Django URL Router (urls.py)
            │
            ▼
    View Function (blog_list)
            │
            ▼
    Query Database (BlogPost.objects.all())
            │
            ▼
    Render Template (list.html)
            │
            ▼
    HTTP Response to Browser
```

## URL Structure

```
Portfolio URLs:
    /                    → portfolio.views.index
    /achievements/       → portfolio.views.achievements
    /resume/            → portfolio.views.resume
    /projects/          → portfolio.views.projects
    /contact/           → portfolio.views.contact

Blog URLs:
    /blog/              → blog.views.blog_list
    /blog/api/          → blog.views.blog_list_api (JSON)
    /blog/<slug>/       → blog.views.blog_detail

Admin:
    /admin/             → Django Admin Interface
```

## Database Schema

### BlogPost Model
```
┌─────────────────────────────────────┐
│           blog_blogpost             │
├─────────────────────────────────────┤
│ id (PK)              INTEGER        │
│ title                VARCHAR(200)   │
│ slug                 VARCHAR(200)   │
│ description          TEXT           │
│ content              TEXT           │
│ categories           VARCHAR(200)   │
│ read_time            INTEGER        │
│ cover_image          VARCHAR(100)   │
│ created_at           DATETIME       │
│ updated_at           DATETIME       │
│ is_published         BOOLEAN        │
└─────────────────────────────────────┘
```

### Contact Model
```
┌─────────────────────────────────────┐
│        portfolio_contact            │
├─────────────────────────────────────┤
│ id (PK)              INTEGER        │
│ firstname            VARCHAR(100)   │
│ lastname             VARCHAR(100)   │
│ phone                VARCHAR(20)    │
│ email                VARCHAR(254)   │
│ message              TEXT           │
│ created_at           DATETIME       │
└─────────────────────────────────────┘
```

## Deployment Architecture (Azure)

```
┌─────────────────────────────────────────────────┐
│              Azure App Service                  │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │         Python 3.12 Runtime              │ │
│  │                                           │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │      Gunicorn WSGI Server          │ │ │
│  │  │                                     │ │ │
│  │  │  ┌───────────────────────────────┐ │ │ │
│  │  │  │   Django Application          │ │ │ │
│  │  │  │   (portfolio_site.wsgi)       │ │ │ │
│  │  │  └───────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│ Azure PostgreSQL│    │  Azure Blob      │
│   Database      │    │  Storage         │
│                 │    │                  │
│ • Blog posts    │    │ • Blog images    │
│ • Contact msgs  │    │ • Media files    │
└─────────────────┘    └──────────────────┘
```

## Development vs Production

### Development Setup
```
Local Machine
    │
    ▼
Django Dev Server (manage.py runserver)
    │
    ▼
SQLite3 Database (db.sqlite3)
    │
    ▼
Local Media Folder (media/)
    │
    ▼
Local Static Folder (static/)
```

### Production Setup
```
Azure App Service
    │
    ▼
Gunicorn WSGI Server
    │
    ▼
Django Application
    │
    ├─→ Azure PostgreSQL (Database)
    ├─→ Azure Blob Storage (Media)
    └─→ Azure CDN (Static - optional)
```

## Security Flow

```
1. User Request
   │
   ▼
2. HTTPS (SSL/TLS)
   │
   ▼
3. Django Middleware
   │
   ├─→ CSRF Protection
   ├─→ Session Security
   ├─→ XSS Protection
   └─→ SQL Injection Prevention (ORM)
   │
   ▼
4. View Processing
   │
   ▼
5. Template Rendering (auto-escaping)
   │
   ▼
6. Secure Response
```

## File Upload Flow

```
User → Upload Image (via Admin)
         │
         ▼
   Django Form Validation
         │
         ▼
   File Type Check
         │
         ▼
   Save to MEDIA_ROOT (dev)
   or Azure Blob (prod)
         │
         ▼
   Update BlogPost.cover_image
         │
         ▼
   Display in Templates
```

## Command Line Tools

```
manage.py
    │
    ├─→ runserver          (Start dev server)
    ├─→ migrate            (Apply migrations)
    ├─→ makemigrations     (Create migrations)
    ├─→ createsuperuser    (Create admin user)
    ├─→ collectstatic      (Collect static files)
    ├─→ shell              (Python shell)
    └─→ create_blog_post   (Custom: Create blog)
```

## Admin Interface Structure

```
Django Admin (/admin/)
    │
    ├─→ Blog
    │   └─→ Blog posts
    │       ├─→ Add blog post
    │       ├─→ Change blog post
    │       └─→ Delete blog post
    │
    ├─→ Portfolio
    │   └─→ Contact messages
    │       └─→ View messages
    │
    └─→ Authentication
        ├─→ Users
        └─→ Groups
```

## Template Inheritance

```
base/base.html (Root Template)
    │
    ├─→ {% block title %}
    ├─→ {% block extra_css %}
    ├─→ {% block content %}
    └─→ {% block extra_js %}
         │
         └─→ portfolio/index.html
         └─→ portfolio/contact.html
         └─→ blog/list.html
         └─→ blog/detail.html
```

## Static Files Collection

```
Development:
    static/          (Source files)
        ├─→ css/
        ├─→ js/
        └─→ images/

Production:
    python manage.py collectstatic
        │
        ▼
    staticfiles/     (Collected files)
        ├─→ css/
        ├─→ js/
        └─→ images/
        │
        ▼
    Served by Nginx/CDN
```

---

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Scalable structure
- ✅ Easy maintenance
- ✅ Production-ready setup
- ✅ Security by default
- ✅ Flexible deployment options
