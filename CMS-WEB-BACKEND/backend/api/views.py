from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LibroSerializer, CategoriaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Libro, Categoria

#Crear/listar y borrar un articulo:
#CAMBIO 4

class LibroListCreate(generics.CreateAPIView):
    """ Clase para listar/instanciar un libro atraves de la clase CreateAPIView del framework REST
    """
    serializer_class = LibroSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """metodo reescrito, get_queryset retornara un set de libros del modelo "Libro" con el filtro de categoria
        """
        categoria = self.request.categoria
        return Libro.objects.filter(categoria=categoria)

    def perform_create(self, serializer):
        """Metodo reescrito para verificar que el objeto enviado atraves del serializer cumple con los atributos necesarios para su creacion para luego ser guardado
        """
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

#CAMBIO 5
class LibroDelete(generics.DestroyAPIView):
    """View para borrar un articulo del modelo Libro
    con la clase DestroyAPIView del framework REST
    """
    serializer_class = LibroSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """Metodo reescrito, get_queryset dentro del metodo DestroyAPIView retorna el set de objetos que pueden ser borrados, solo podran ser borrados articulos que pertenecen al usuario"""
        user = self.request.user
        return Libro.objects.filter(author = user)

#PARA CATEGORIA CAMBIO 6
class CategoriaListCreate(generics.CreateAPIView):
    """View para crear/listar categorias (uso opcional)"""
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """metodo que retorna todos los objetos del modelo Categoria"""
        return Categoria.objects.all()

    def perform_create(self, serializer):
        """Metodo que verifica que el objeto enviado atraves del serializer sea correcto
        """
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


#CAMBIO 7
class CategoriaDelete(generics.DestroyAPIView):
    """View para borrar una categoria(opcional)
    """
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """Metodo que retorna el objeto que conicida con el nombre para ser eliminado
        """
        nombre = self.request.nombre
        return Categoria.objects.filter(nombre = nombre)




class CreateUserView(generics.CreateAPIView):
    """View para crear un usuario atraves de CreateAPIWiew del framework REST"""
    queryset = User.objects.all() #verificamos que no existe ya el user
    serializer_class = UserSerializer #especificamos que tipo de datos necesitamos para la creacion
    permission_classes = [AllowAny] #especifiacomes quien puede llamar a esta funcion
    #con estos parametros se hace la creacion automatica