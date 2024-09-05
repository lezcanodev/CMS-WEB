from django.db import models
from django.contrib.auth.models import User


#clase del orm para categorias
class Categoria(models.Model):
    """
    Clase que almacena entradas a la tabla "categoria"
    """
    nombre=models.CharField(max_length=50)

    def __str__(self):
        """retorna el nombre de la categoria"""
        return self.nombre


#clase del orm para la creacion de libros
class Libro(models.Model): 
    """
    Guarda una instancia de un articulo
    """
    titulo = models.CharField(max_length=100)
    fecha = models.DateTimeField(auto_now_add=True)

    #el related_name me permite user.notes()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="libro")
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="categoria", default=1)

    """
    Retorna el nombre del articulo
    """
    def __str__(self):
        return self.titulo
    
    

