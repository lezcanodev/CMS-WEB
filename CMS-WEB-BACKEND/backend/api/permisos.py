from rest_framework.permissions import BasePermission
from .models import UserProfile

"""
Roles implementados:
1--->administrador
2--->autor
3--->publicador
4--->editor
"""
class rol_Requerido(BasePermission):
    """
    Clase que permite acceso solo a usuarios con un rol específico.
    """
    roles = []

    def __init__(self, *rol_requerido):        #le pasamos mas de un rol permitido para ciertas funciones
        self.roles = rol_requerido

    def has_permission(self, request, view):
        # Verifica si el usuario está autenticado
        if not request.user.is_authenticated:
            return False

        # Obtén el perfil del usuario
        try:
            profile = request.user.userprofile
        except UserProfile.DoesNotExist:
            return False

        # Verifica si el rol del perfil coincide con los roles permitidos.-
        return profile.role in self.roles


class PuedoRealizarAccion(BasePermission):
    """
    Clase que permite acceso solo a usuarios con un rol específico.
    """
    roles = []

    def __init__(self, *rol_requerido):        #le pasamos mas de un rol permitido para ciertas funciones
        self.roles = rol_requerido

    def has_permission(self, request, view):
        # Obtén el perfil del usuario
        try:
            profile = request.user.userprofile
        except UserProfile.DoesNotExist:
            return False

        # Verifica si el rol del perfil coincide con los roles permitidos.-
        return profile.role in self.roles