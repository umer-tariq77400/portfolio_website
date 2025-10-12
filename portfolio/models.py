from django.db import models

class Contact(models.Model):
    """Model for contact form submissions"""
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
    
    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.email}"

