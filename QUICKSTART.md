# Quick Start Guide - Django Portfolio Website

## What Has Been Done

Your Express.js/EJS portfolio website has been successfully migrated to Django! Here's a summary:

### ✅ Completed Features

1. **Django Project Setup**
   - Created `portfolio_site` Django project
   - Created two Django apps: `portfolio` and `blog`
   - Configured settings for development and production

2. **Database Models**
   - `BlogPost` model for managing blog posts
   - `Contact` model for storing contact form submissions
   - All models registered in Django admin

3. **Templates Converted**
   - All EJS templates converted to Django templates
   - Base templates with navbar and footer
   - Portfolio pages: Home, Achievements, Resume, Projects, Contact
   - Blog pages: List view and Detail view

4. **Static Files**
   - CSS and JavaScript files organized
   - Bootstrap 5 integration maintained
   - Font Awesome icons included

5. **URL Routing**
   - Clean URL patterns configured
   - Portfolio pages at root level
   - Blog at `/blog/`
   - Admin panel at `/admin/`

6. **Admin Interface**
   - Full-featured Django admin
   - Manage blog posts and contact messages
   - Rich content editing capabilities

7. **Production Ready**
   - Azure PostgreSQL configuration
   - Azure Blob Storage setup
   - Deployment files included

## How to Use

### Local Development

1. **Start the server:**
   ```bash
   python manage.py runserver
   ```

2. **Access the website:**
   - Main site: http://localhost:8000
   - Admin panel: http://localhost:8000/admin
   - Login: admin / admin123

3. **Create blog posts:**
   - Via admin: http://localhost:8000/admin/blog/blogpost/
   - Via CLI: `python manage.py create_blog_post "Title" "Description" --categories "Category1,Category2"`

### Key URLs

- `/` - Home page
- `/achievements/` - Achievements
- `/resume/` - Resume
- `/projects/` - Projects
- `/contact/` - Contact form
- `/blog/` - Blog listing
- `/blog/<slug>/` - Individual blog post
- `/blog/api/` - Blog posts API (JSON)

### Blog Post Management

#### Via Django Admin (Recommended)
1. Go to http://localhost:8000/admin
2. Click "Blog posts" → "Add blog post"
3. Fill in:
   - **Title**: Your blog title
   - **Slug**: Auto-generated from title
   - **Description**: Brief summary
   - **Content**: Full HTML content
   - **Categories**: Comma-separated (e.g., "Linux, Beginner")
   - **Read time**: Minutes to read
   - **Cover image**: Upload optional image
4. Click "Save"

#### Via Command Line
```bash
python manage.py create_blog_post \
  "Getting Started with Django" \
  "Learn Django basics in this tutorial" \
  --categories "Django,Python,Tutorial" \
  --read-time 10
```

### Contact Form

The contact form at `/contact/` saves submissions to the database. View them in the admin panel:
- Go to http://localhost:8000/admin/portfolio/contact/

### Production Deployment (Azure)

1. **Set environment variables in Azure App Service:**
   ```
   AZURE_POSTGRESQL_HOST=your-db-host.postgres.database.azure.com
   AZURE_POSTGRESQL_NAME=your-database-name
   AZURE_POSTGRESQL_USER=your-username
   AZURE_POSTGRESQL_PASSWORD=your-password
   AZURE_STORAGE_ACCOUNT_NAME=your-storage-account
   AZURE_STORAGE_ACCOUNT_KEY=your-storage-key
   SECRET_KEY=your-django-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-domain.azurewebsites.net
   ```

2. **Deploy:**
   - Install dependencies: `pip install -r requirements.txt`
   - Collect static: `python manage.py collectstatic --noinput`
   - Run migrations: `python manage.py migrate`
   - Create superuser: `python manage.py createsuperuser`

3. **Configure startup:**
   - Use `startup.txt` for App Service startup command
   - Or use: `gunicorn --bind=0.0.0.0 --timeout 600 portfolio_site.wsgi`

## File Structure

```
portfolio_website/
├── blog/                      # Blog app
│   ├── models.py             # BlogPost model
│   ├── views.py              # Blog views
│   ├── urls.py               # Blog URLs
│   ├── admin.py              # Admin config
│   └── management/           # Custom commands
│       └── commands/
│           └── create_blog_post.py
├── portfolio/                # Portfolio app
│   ├── models.py             # Contact model
│   ├── views.py              # Portfolio views
│   ├── urls.py               # Portfolio URLs
│   └── admin.py              # Admin config
├── templates/                # Django templates
│   ├── base/                 # Base templates
│   ├── blog/                 # Blog templates
│   └── portfolio/            # Portfolio templates
├── static/                   # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── portfolio_site/           # Project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py                 # Django CLI
├── requirements.txt          # Dependencies
└── README_DJANGO.md          # Full documentation
```

## Testing

A sample blog post has been created for testing:
- Title: "Getting Started with Linux"
- URL: http://localhost:8000/blog/getting-started-with-linux/

## Next Steps

1. **Add your content:**
   - Create more blog posts via admin
   - Add your images to `/static/images/`
   - Customize CSS in `/static/css/`

2. **Customize:**
   - Update personal information in templates
   - Add your achievements and projects
   - Modify styles to match your preferences

3. **Deploy:**
   - Set up Azure resources
   - Configure environment variables
   - Deploy to Azure App Service

## Support

For detailed documentation, see `README_DJANGO.md`

Key commands:
- `python manage.py runserver` - Start server
- `python manage.py makemigrations` - Create migrations
- `python manage.py migrate` - Apply migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py collectstatic` - Collect static files
- `python manage.py create_blog_post` - Create blog post

## Differences from Express.js Version

✅ **Improved:**
- Built-in admin interface
- Better ORM (no raw SQL)
- Easier template syntax
- Better security features
- Cleaner URL routing
- Automatic form handling
- Better static file management

🔄 **Changed:**
- EJS → Django templates
- Express routes → Django views
- SQLite queries → Django ORM
- Manual admin → Django admin

The functionality remains the same, but the implementation is cleaner and more maintainable!
