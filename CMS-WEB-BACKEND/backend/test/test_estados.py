import pytest
from api.models import Categoria
from django.contrib.auth.models import User
from api.models import  Libro
from django.utils import timezone

@pytest.mark.django_db
def test_estadoInicial():
    
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro", estado='En Revision',likes=0,vistas=0)

    
    assert libro.estado=='En Revision'
    
@pytest.mark.django_db
def test_modificarEstado():
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro", estado='Rechazado',likes=0,vistas=0)
    
    assert libro.estado=='Rechazado'