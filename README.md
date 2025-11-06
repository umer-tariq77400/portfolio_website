# Portfolio Website - Django Version

> **Django implementation of Umer Tariq's portfolio and blog website**

[![Django](https://img.shields.io/badge/Django-5.2.7-green.svg)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![Status](https://img.shields.io/badge/Status-Complete-success.svg)]()

---

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/umer-tariq77400/portfolio_website.git
cd portfolio_website
git checkout copilot/migrate-backend-to-django

# Install and run
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Access
# Website: http://localhost:8000
# Admin: http://localhost:8000/admin
```

**That's it! 🎉**

---

## 📚 Documentation

**Start here:** [**INDEX.md**](INDEX.md) - Documentation navigation hub

### Documentation Files

| File | Purpose |
|------|---------|
| [**INDEX.md**](INDEX.md) | 📍 Documentation hub & navigation |
| [**QUICKSTART.md**](QUICKSTART.md) | 🚀 Quick start guide |
| [**README_DJANGO.md**](README_DJANGO.md) | 📖 Complete technical docs |
| [**MIGRATION_SUMMARY.md**](MIGRATION_SUMMARY.md) | 📊 Express vs Django |
| [**ARCHITECTURE.md**](ARCHITECTURE.md) | 🏗️ System architecture |
| [**PROJECT_SUMMARY.md**](PROJECT_SUMMARY.md) | 📝 Project summary |

**📖 Total: 63,000+ characters of documentation**

---

## ✨ Features

### What's Included
- ✅ **Static Portfolio Pages** (Home, Achievements, Resume, Projects)
- ✅ **Dynamic Blog System** (List, Detail, API)
- ✅ **Contact Form** (with database storage)
- ✅ **Admin Interface** (Django Admin at `/admin/`)
- ✅ **Responsive Design** (Bootstrap 5)
- ✅ **SEO Optimized** (Meta tags + JSON-LD)
- ✅ **Security** (CSRF, XSS, SQL injection protection)
- ✅ **Production Ready** (Azure deployment configured)

### Tech Stack
- **Backend:** Django 5.2.7, Python 3.12
- **Database:** SQLite3 (dev), PostgreSQL (prod)
- **Storage:** Local (dev), Azure Blob (prod)
- **Frontend:** Bootstrap 5, Font Awesome
- **Deployment:** Azure App Service

---

## 📁 Project Structure

```
portfolio_website/
├── 📚 Documentation (6 files)
│   ├── INDEX.md              ⭐ Start here!
│   ├── QUICKSTART.md
│   ├── README_DJANGO.md
│   ├── MIGRATION_SUMMARY.md
│   ├── ARCHITECTURE.md
│   └── PROJECT_SUMMARY.md
│
├── 🎛️ Django Project
│   ├── portfolio_site/       # Settings
│   ├── portfolio/            # Portfolio app
│   ├── blog/                 # Blog app
│   ├── templates/            # Django templates
│   ├── static/               # CSS, JS, images
│   └── media/                # Uploads
│
└── 🔧 Configuration
    ├── manage.py
    ├── requirements.txt
    ├── startup.txt
    └── web.config
```

---

## 🌐 URLs

| URL | Page |
|-----|------|
| `/` | Home |
| `/achievements/` | Achievements |
| `/resume/` | Resume |
| `/projects/` | Projects |
| `/contact/` | Contact Form |
| `/blog/` | Blog List |
| `/blog/<slug>/` | Blog Detail |
| `/blog/api/` | Blog API (JSON) |
| `/admin/` | Admin Panel |

---

## 🎯 Common Tasks

### Create Blog Post (Admin)
1. Go to http://localhost:8000/admin
2. Login with credentials
3. Click "Blog posts" → "Add blog post"
4. Fill form and save

### Create Blog Post (CLI)
```bash
python manage.py create_blog_post \
  "Title" \
  "Description" \
  --categories "Cat1,Cat2" \
  --read-time 5
```

### Deploy to Azure
```bash
# Set environment variables (see README_DJANGO.md)
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn --bind=0.0.0.0 --timeout 600 portfolio_site.wsgi
```

---

## 📊 Express.js vs Django

| Feature | Express.js | Django |
|---------|-----------|--------|
| Admin | ❌ | ✅ Built-in |
| ORM | ❌ | ✅ Django ORM |
| Security | ⚠️ Manual | ✅ Automatic |
| Forms | ⚠️ Manual | ✅ Built-in |

**Django provides significantly more features out of the box!**

See [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) for full comparison.

---

## 🧪 Testing

### Sample Data
- Blog post: "Getting Started with Linux"  
- Admin user: `admin` / `admin123`

### Test Commands
```bash
python manage.py runserver              # Start server
python manage.py test                   # Run tests
python manage.py check                  # System check
```

---

## 🔐 Security

- ✅ CSRF protection
- ✅ XSS protection
- ✅ SQL injection prevention
- ✅ Secure password hashing
- ✅ Session security
- ✅ File upload validation

---

## 📝 Key Commands

```bash
# Development
python manage.py runserver              # Start server
python manage.py shell                  # Python shell

# Database
python manage.py makemigrations         # Create migrations
python manage.py migrate                # Apply migrations

# Admin
python manage.py createsuperuser        # Create admin

# Blog
python manage.py create_blog_post       # Create post

# Production
python manage.py collectstatic          # Collect static
```

---

## 📦 Installation

### Requirements
- Python 3.8+
- pip

### Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver
```

---

## 🚀 Deployment

### Azure App Service

**Environment Variables:**
```bash
AZURE_POSTGRESQL_HOST=...
AZURE_POSTGRESQL_NAME=...
AZURE_STORAGE_ACCOUNT_NAME=...
SECRET_KEY=...
DEBUG=False
ALLOWED_HOSTS=your-app.azurewebsites.net
```

**Deploy:**
```bash
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn --bind=0.0.0.0 --timeout 600 portfolio_site.wsgi
```

See [README_DJANGO.md](README_DJANGO.md#production-deployment-azure-app-service) for full guide.

---

## 📖 Documentation

### Quick Reference

**Getting Started:**
- [INDEX.md](INDEX.md) - Start here
- [QUICKSTART.md](QUICKSTART.md) - Setup guide

**Technical Details:**
- [README_DJANGO.md](README_DJANGO.md) - Complete docs
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture

**Migration Info:**
- [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - Comparison
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Summary

---

## 🤝 Contributing

This is a personal portfolio project. The original Express.js version is in the `master` branch.

---

## 📞 Contact

**Umer Tariq**
- Email: umert77400@gmail.com
- Phone: +923128758589
- LinkedIn: [Umer Tariq](http://www.linkedin.com/in/umer-tariq-455b88294)
- GitHub: [umer-tariq77400](https://github.com/umer-tariq77400)

---

## 📝 License

© 2025 by Umer Tariq. All rights reserved.

---

## 🎉 Status

✅ **Project Complete**  
✅ **Fully Tested**  
✅ **Production Ready**  
✅ **Well Documented**

---

## 📌 Important Notes

1. **Original Code:** Express.js version preserved in `master` branch
2. **This Branch:** Django implementation (standalone)
3. **No Merge:** Branches are independent
4. **Start Here:** Read [INDEX.md](INDEX.md) first
5. **Quick Setup:** Follow [QUICKSTART.md](QUICKSTART.md)

---

**Happy Coding! 🚀**
