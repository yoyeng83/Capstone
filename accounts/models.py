from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("user", "User"),
        ("chef", "Chef"),
        ("admin", "Admin"),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"
