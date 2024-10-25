from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Libro, Categoria, UserProfile, Comentario
import os


from django.shortcuts import render
from .emails import enviar_notificacion_email

#para el manejo de los jsons
class LibroSerializer(serializers.ModelSerializer):
    categoriaNombre = serializers.CharField(source='categoria.nombre', read_only=True)
    autorNombre = serializers.CharField(source='author.username', read_only=True)

    """Serilizer para un articulo con los atributos id, titulo, fecha, autor, categoria"""
    class Meta:
        model = Libro
        fields = ["id", "titulo", "fecha", "author", "categoria","estado", "contenido", "categoriaNombre", "autorNombre"]
        extra_kwargs ={"autor": {"read_only": True}}


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializer para una categoria con atributos id y nombre"""
    class Meta:
        model = Categoria
        fields = ["id", "nombre"]



class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='userprofile.role', read_only=True)

    """Serializer para un usuario con atributos id, username y password
    """
    class Meta:
        model = User
        fields = ["id", "username", "password", "role"]
        extra_kwargs = {"password": {"write_only":True}}
    
    #para el registro una vez se convierte al modelo user validate_data ya comprueba si esta todo correcto en la clase userSerializer
    def create (self, validated_data):
        """Método reescrito, se crea el usuario una vez que el objeto validated_data sea correcto"""
        user = User.objects.create_user(**validated_data)
        
        
        # Enviar correo de notificación
        enviar_notificacion_email(
            'Bienvenido a la plataforma',
            'Gracias por registrarte en nuestro sitio web.',
            [user.username]
        )
        return user
        
    
    

class UserProfileSerializer(serializers.ModelSerializer):
    
    """
    serializer para el perfil de cada usuario.-
    """
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ["user","rol"]
  
  
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """
        Utilizamos un serializer diferente para el update, para que solo podamos
        editar el role del userprofile, sin pasarle el user.-
    """    
     
    class Meta:
        model = UserProfile
        fields = ['role']  # Solo permitimos actualizar el campo 'role'


#Comentarios
class ComentarioSerializer(serializers.ModelSerializer):
    id_libro = serializers.CharField(source='libro.id', read_only=True)
    usuarioNombre = serializers.CharField(source='usuario.username', read_only=True)

    """Serilizer para un comentario con los atributos id, fecha, contenido, usuario, libro """
    class Meta:
        model = Comentario
        fields = ["id", "fecha", "contenido", "usuarioNombre", "id_libro"]

