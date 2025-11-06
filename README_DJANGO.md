# Portfolio Website - Django Version

This is the Django backend version of Umer Tariq's portfolio and blog website.

## Features

- **Static Portfolio Pages**: Home, Achievements, Resume, Projects
- **Dynamic Blog System**: Create, manage, and display blog posts
- **Contact Form**: Collect and store contact form submissions
- **Admin Interface**: Django admin for managing blog posts and contact messages
- **Responsive Design**: Bootstrap 5 powered responsive UI
- **Database**: SQLite3 for development, PostgreSQL for production
- **Media Storage**: Local filesystem for development, Azure Blob Storage for production

## Tech Stack

- **Backend**: Django 5.2.7
- **Database**: SQLite3 (development) / Azure PostgreSQL (production)
- **Frontend**: Bootstrap 5, Font Awesome, Custom CSS/JS
- **Media Storage**: Django Media (development) / Azure Blob Storage (production)
- **Deployment**: Azure App Service

## Project Structure

```
portfolio_website/
├── portfolio_site/          # Django project settings
│   ├── settings.py          # Main settings file
│   ├── urls.py              # Main URL configuration
│   └── wsgi.py              # WSGI application
├── portfolio/               # Portfolio app (static pages)
│   ├── models.py            # Contact model
│   ├── views.py             # Portfolio views
│   ├── urls.py              # Portfolio URLs
│   └── admin.py             # Admin configuration
├── blog/                    # Blog app (dynamic blog)
│   ├── models.py            # BlogPost model
│   ├── views.py             # Blog views
│   ├── urls.py              # Blog URLs
│   └── admin.py             # Admin configuration
├── templates/               # Django templates
│   ├── base/                # Base templates (navbar, footer, etc.)
│   ├── portfolio/           # Portfolio page templates
│   └── blog/                # Blog templates
├── static/                  # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                   # User-uploaded files (development)
├── manage.py                # Django management script
└── requirements.txt         # Python dependencies
```

## Local Development Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/umer-tariq77400/portfolio_website.git
cd portfolio_website
git checkout copilot/migrate-backend-to-django
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create a superuser (for admin access):
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

6. Access the application:
- Main site: http://localhost:8000
- Admin panel: http://localhost:8000/admin

## Creating Blog Posts

### Via Django Admin

1. Log in to the admin panel at http://localhost:8000/admin
2. Navigate to "Blog posts"
3. Click "Add blog post"
4. Fill in the details:
   - Title
   - Slug (auto-generated from title)
   - Description
   - Content (HTML supported)
   - Categories (comma-separated)
   - Read time (in minutes)
   - Cover image (optional)
5. Save the blog post

### Blog Post Fields

- **Title**: The blog post title
- **Slug**: URL-friendly version (auto-generated)
- **Description**: Short description/excerpt
- **Content**: Full blog post content (supports HTML)
- **Categories**: Comma-separated categories (e.g., "Linux, Beginner")
- **Read Time**: Estimated read time in minutes
- **Cover Image**: Featured image for the blog post
- **Is Published**: Toggle to publish/unpublish

## Production Deployment (Azure App Service)

### Prerequisites

- Azure account
- Azure CLI installed
- Azure PostgreSQL database
- Azure Blob Storage account

### Environment Variables

Set the following environment variables in Azure App Service:

```bash
# Database
AZURE_POSTGRESQL_HOST=your-db-host.postgres.database.azure.com
AZURE_POSTGRESQL_NAME=your-database-name
AZURE_POSTGRESQL_USER=your-username
AZURE_POSTGRESQL_PASSWORD=your-password
AZURE_POSTGRESQL_PORT=5432

# Storage
AZURE_STORAGE_ACCOUNT_NAME=your-storage-account
AZURE_STORAGE_ACCOUNT_KEY=your-storage-key
AZURE_STORAGE_CONTAINER=media

# Django
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.azurewebsites.net
```

### Deployment Steps

1. Install production dependencies:
```bash
pip install -r requirements.txt
```

2. Collect static files:
```bash
python manage.py collectstatic --noinput
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Deploy to Azure App Service using Azure CLI or GitHub Actions

### Azure Configuration

#### startup.txt (for Azure App Service)
```bash
gunicorn --bind=0.0.0.0 --timeout 600 portfolio_site.wsgi
```

#### Install Gunicorn
Add to requirements.txt:
```
gunicorn>=20.1.0
```

## Models

### BlogPost Model
- `title`: CharField (max 200 characters)
- `slug`: SlugField (unique, auto-generated)
- `description`: TextField
- `content`: TextField (optional)
- `categories`: CharField (comma-separated)
- `read_time`: IntegerField (minutes)
- `cover_image`: ImageField (optional)
- `created_at`: DateTimeField (auto)
- `updated_at`: DateTimeField (auto)
- `is_published`: BooleanField

### Contact Model
- `firstname`: CharField
- `lastname`: CharField (optional)
- `phone`: CharField (optional)
- `email`: EmailField
- `message`: TextField
- `created_at`: DateTimeField (auto)

## URLs

- `/` - Home page
- `/achievements/` - Achievements page
- `/resume/` - Resume page
- `/projects/` - Projects page
- `/contact/` - Contact page
- `/blog/` - Blog listing page
- `/blog/<slug>/` - Individual blog post
- `/blog/api/` - Blog posts API (JSON)
- `/admin/` - Django admin panel

## API Endpoints

### Blog Posts API
**Endpoint**: `/blog/api/`
**Method**: GET
**Response**: JSON array of blog posts

```json
[
  {
    "title": "Getting Started with Linux",
    "slug": "getting-started-with-linux",
    "description": "A beginner-friendly guide...",
    "categories": "Linux,Beginner",
    "read_time": 6,
    "cover_image": "/media/blog_covers/linux.jpg",
    "created_at": "2025-02-01T00:00:00Z"
  }
]
```

## Best Practices Implemented

1. **Separation of Concerns**: Separate apps for portfolio and blog
2. **Template Inheritance**: Base templates for consistent layout
3. **Static Files Management**: Organized CSS, JS, and images
4. **Media Files Handling**: Separate storage for user uploads
5. **Database Flexibility**: Easy switch between SQLite and PostgreSQL
6. **Admin Interface**: Built-in content management
7. **Security**: CSRF protection, secure settings for production
8. **Scalability**: Ready for Azure Blob Storage and PostgreSQL
9. **SEO**: Meta tags, JSON-LD schema for blog posts
10. **Responsive Design**: Mobile-friendly Bootstrap layout

## Differences from Express.js Version

1. **Template Engine**: EJS → Django Templates
2. **Backend**: Express.js → Django
3. **ORM**: Raw SQLite queries → Django ORM
4. **Admin**: Custom → Django Admin
5. **Forms**: Manual handling → Django Forms (optional)
6. **Routing**: Express Router → Django URLconf
7. **Static Files**: Express static → Django staticfiles
8. **Media Files**: Manual → Django media handling

## Contributing

This is a personal portfolio project. For major changes, please open an issue first.

## License

© 2025 by Umer Tariq. All rights reserved.

## Author

**Umer Tariq**
- Email: umert77400@gmail.com
- Phone: +923128758589
- LinkedIn: [Umer Tariq](http://www.linkedin.com/in/umer-tariq-455b88294)
- GitHub: [umer-tariq77400](https://github.com/umer-tariq77400)
