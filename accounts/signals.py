# signals.py in the 'accounts' app
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile  # Import the UserProfile model

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        # Create a profile for the newly created user
        UserProfile.objects.create(user=instance)
    else:
        # Ensure the user has a profile before trying to save it
        if hasattr(instance, 'userprofile'):
            instance.userprofile.save()  # Save if profile exists
        else:
            # Handle cases where no profile exists yet
            UserProfile.objects.create(user=instance)  # Create the profile
