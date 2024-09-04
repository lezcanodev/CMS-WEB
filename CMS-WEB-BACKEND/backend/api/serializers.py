from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Libro, Categoria


#para el manejo de los jsons
class LibroSerializer(serializers.ModelSerializer):
    """Serilizer para un articulo con los atributos id, titulo, fecha, autor, categoria"""
    class Meta:
        model = Libro
        fields = ["id", "titulo", "fecha", "autor", "categoria"]
        extra_kwargs ={"autor": {"read_only": True}}


class CategoriaSerializer(serializers.ModelSerializer):
    """Serializer para una categoria con atributos id y nombre"""
    class Meta:
        model = Categoria
        fields = ["id", "nombre"]



class UserSerializer(serializers.ModelSerializer):
    """Serializer para un usuario con atributos id, username y password
    """
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only":True}}
    
    #para el registro una vez se convierte al modelo user validate_data ya comprueba si esta todo correcto en la clase userSerializer
    def create (self, validated_data):
        """Metodo reescrito, se crea el usuario una vez que el objeto validated_data sea correcto"""
        user = User.objects.create_user(**validated_data)
        return user
    
    