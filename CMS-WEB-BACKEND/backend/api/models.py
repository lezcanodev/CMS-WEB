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


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.user.username


#clase del orm para la creacion de libros
class Libro(models.Model):
    """
    Guarda una instancia de un articulo
    """
    titulo = models.CharField(max_length=100)
    fecha = models.DateTimeField(auto_now_add=True)
    contenido = models.TextField()
    estado = models.CharField(max_length=20, null=True)

    #el related_name me permite user.notes()
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="libro")
    #categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="categoria", default=1)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING , related_name="author")
    categoria = models.ForeignKey(Categoria,on_delete=models.SET_DEFAULT,default=2, related_name="categoria")
    """
    Retorna el nombre del articulo
    """
    def __str__(self):
        return self.titulo

#Clase para los comentarios
class Comentario(models.Model):
    """
    Guarda una instancia de un comentario
    """
    fecha = models.CharField(max_length=30)
    contenido = models.TextField()

    #el related_name me permite user.notes()
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="libro")
    #categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="categoria", default=1)
    usuario = models.ForeignKey(User, on_delete=models.DO_NOTHING , related_name="usuario")
    id_libro = models.ForeignKey(Libro,on_delete=models.DO_NOTHING, related_name="id_libro")
    """
    Retorna el contenido del comentario (metodo auxiliar)
    """
    def __str__(self):
        return self.contenido
