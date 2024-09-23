from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile
from .roles import Roles

"""
    Creamos un userprofile cada que vez que un usuario se registra.-
"""
@receiver(post_save, sender=User)
def crear_userprofile(sender, instance, created, **kwargs):
    if created:
        #El role del perfil creado es 'user' por defecto.-
        UserProfile.objects.create(user=instance,role=Roles.SUSCRIPTOR.value)

