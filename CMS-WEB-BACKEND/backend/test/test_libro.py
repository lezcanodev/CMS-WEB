import pytest
from django.contrib.auth.models import User
from api.models import Categoria, Libro
from django.utils import timezone



@pytest.mark.django_db
def test_crear_libro():
    """Prueba la creación de un libro y relaciones de ForeignKey"""
    x=Libro.objects.count()
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)

    assert Libro.objects.count() == x+1
    assert libro.titulo == "El viaje espacial"
    assert libro.author == user
    assert libro.categoria == categoria

@pytest.mark.django_db
def test_libro_str():
    """Prueba la representación en cadena de Libro"""
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    assert str(libro) == "El viaje espacial"

@pytest.mark.django_db
def test_libro_auto_now_add():
    """Prueba que el campo 'fecha' se establece automáticamente al crear un Libro"""
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)

    now = timezone.now()
    assert libro.fecha <= now

@pytest.mark.django_db
def test_libro_contenido():
    """Prueba que el contenido de un Libro se guarda correctamente"""
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)

    assert libro.contenido == "Contenido del libro"

@pytest.mark.django_db
def test_libro_likes():
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    assert libro.likes == 0
    libro.likes+=1
    
    assert libro.likes ==1

@pytest.mark.django_db
def test_libro_vistas():
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    assert libro.vistas == 0
    libro.vistas+=1
    
    assert libro.vistas ==1