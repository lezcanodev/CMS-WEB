import pytest
from django.contrib.auth.models import User
from api.models import Categoria, Libro, Histograma

from time import time



@pytest.mark.django_db
def test_creacion_libro():
    """Prueba la creación de un libro y relaciones de ForeignKey"""
    
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    hist= Histograma.objects.create(fecha=time(),usuario=user,libro=libro,accion='creacion')
    
    
    assert hist.libro.titulo == libro.titulo
    assert hist.accion== 'creacion'
    
    
@pytest.mark.django_db
def test_modificacion_libro():
    """Prueba la creación de un libro y relaciones de ForeignKey"""
    
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    hist= Histograma.objects.create(fecha=time(),usuario=user,libro=libro,accion='creacion')
    
    hist.accion= 'modificacion'
    
    assert hist.accion == 'modificacion'
    