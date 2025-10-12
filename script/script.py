#!/usr/bin/env python3
"""
Simple Blog Post Creation Script
"""

import argparse
from datetime import datetime
from pathlib import Path
import sqlite3
from jinja2 import Environment, FileSystemLoader
import re

def generate_slug_from_title(title: str) -> str:
    """Generate URL-safe slug from title."""
    slug = title.strip().lower().replace(' ', '-')
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug or "untitled-blog-post"


def main():
    parser = argparse.ArgumentParser(description='Create a new blog post')
    
    # Required arguments
    parser.add_argument('title', help='Blog title')
    parser.add_argument('description', help='Blog description')
    
    # Optional arguments
    parser.add_argument('--categories', '-c', default='General', help='Comma-separated categories')
    parser.add_argument('--read-time', '-r', type=int, default=3, help='Read time in minutes')
    
    args = parser.parse_args()
    
    # Generate slug from title
    slug = generate_slug_from_title(args.title)
    
    # Check if blog post with the same slug already exists
    blog_view = Path(f'D:/Umer/git_repos/portfolio_website/views/blogs/content/{slug}.ejs')
    if blog_view.exists():
        print(f"❌ A blog post with the slug '{slug}' already exists. Please choose a different title.")
        return
    
    # Parse categories
    categories = [cat.strip().title() for cat in args.categories.split(',') if cat.strip()]
    
    # Create blog data
    blog_data = {
        'title': args.title,
        'slug': slug,
        'description': args.description,
        'categories': categories,
        'read_time': args.read_time,
        'cover_image': f"/blogs/assets/{slug}/images/cover.jpg"  
    }
    
    # Connect to SQLite database
    try:
        conn = sqlite3.connect('D:/Umer/git_repos/portfolio_website/database/portfolio.db')
        cursor = conn.cursor()

        # Insert blog data into database
        cursor.execute('''
                INSERT INTO blog_posts (title, slug, description, categories, read_time, cover_image)
                        VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                blog_data['title'],
                blog_data['slug'],
                blog_data['description'],
                ','.join(blog_data['categories']),
                blog_data['read_time'],
                blog_data['cover_image']
            )
        )
        
        # Commit the changes and close connection
        conn.commit()
        print("✅ Blog post saved to database successfully!")
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        if 'conn' in locals():
            conn.close()
    except Exception as e:
        print(f"❌ Error: {e}")
        if 'conn' in locals():
            conn.close()
            
    # Getting the automatically generated creation date from the database
    try:
        cursor.execute('SELECT created_at FROM blog_posts WHERE slug = ?', (slug,))
        creation_date = cursor.fetchone()[0].split(" ")[0]  # Extract date part only
        print(f"✅ Blog post creation date fetched from database: {creation_date}")
        conn.close()
    except Exception as e:
        print(f"❌ Error fetching creation date: {e}")
        creation_date = datetime.now().strftime('%Y-%m-%d') # Fallback to current date if error occurs
        
    # Add creation date to blog data
    blog_data['creation_date'] = creation_date
    blog_data['formatted_creation_date'] = datetime.strptime(blog_data['creation_date'], '%Y-%m-%d').strftime('%b %d, %Y')
    for asset in ['images', 'downloads']:
        blog_public = Path(f"D:/Umer/git_repos/portfolio_website/public/blogs/assets/{slug}/{asset}")
        blog_public.mkdir(parents=True, exist_ok=True)
    
    # Render blog template and putting it in ./views/blogs/content with the slug as filename and ejs as file extension
    try:
        env = Environment(loader=FileSystemLoader('./templates'))
        template = env.get_template('blog_post.ejs')
        output = template.render(blog=blog_data)

        # Save the rendered output to the appropriate file
        blog_view.write_text(output)
        print(f"✅ Blog post template created at: {blog_view}")
    except Exception as e:
        print(f"❌ Template rendering error: {e}")

    # Display results
    print("Blog meta data:")
    print(f"Title: {blog_data['title']}")
    print(f"Slug: {blog_data['slug']}")
    print(f"Description: {blog_data['description']}")
    print(f"Categories: {', '.join(blog_data['categories'])}")
    print(f"Read Time: {blog_data['read_time']} minutes")
    print(f"Cover Image: {blog_data['cover_image']}")
    print(f"Creation Date: {blog_data['creation_date']} (Formatted: {blog_data['formatted_creation_date']})")
    
    return blog_data


if __name__ == "__main__":
    main()
