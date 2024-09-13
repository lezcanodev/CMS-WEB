
import pytest
from django.contrib.auth.models import User
from api.models import Categoria, Libro



@pytest.mark.django_db
def test_create_libro():
    # Crear un usuario
    user = User.objects.create_user(username='autor', password='testpassword')

    # Crear una categoría
    categoria = Categoria.objects.create(nombre='Ciencia Ficción')

    # Crear un libro
    libro = Libro.objects.create(titulo='El Nombre del Viento', author=user, categoria=categoria)

    # Verificar que el libro se ha creado correctamente
    assert Libro.objects.count() == 1
    assert libro.titulo == 'El Nombre del Viento'
    assert libro.author == user
    assert libro.categoria == categoria
    assert str(libro) == 'El Nombre del Viento'

@pytest.mark.django_db
def test_libro_user_relationship():
    # Crear un usuario
    user = User.objects.create_user(username='autor', password='testpassword')

    # Crear una categoría
    categoria = Categoria.objects.create(nombre='Fantasía')

    # Crear un libro
    libro = Libro.objects.create(titulo='Juego de Tronos', author=user, categoria=categoria)

    # Verificar que el usuario tiene un libro asociado
    assert user.libros.count() == 1
    assert user.libros.first().titulo == 'Juego de Tronos'

@pytest.mark.django_db
def test_libro_categoria_relationship():
    # Crear un usuario
    user = User.objects.create_user(username='autor', password='testpassword')

    # Crear una categoría
    categoria = Categoria.objects.create(nombre='Terror')

    # Crear un libro
    libro = Libro.objects.create(titulo='It', author=user, categoria=categoria)

    # Verificar que la categoría tiene un libro asociado
    assert categoria.libros.count() == 1
    assert categoria.libros.first().titulo == 'It'


@pytest.mark.django_db
def test_libro_str():
    # Crear un usuario
    user = User.objects.create_user(username='autor', password='testpassword')

    # Crear una categoría
    categoria = Categoria.objects.create(nombre='Fantasía')

    # Crear un libro
    libro = Libro.objects.create(titulo='Harry Potter', author=user, categoria=categoria)

    # Verificar que el método __str__ devuelve el título correctamente
    assert str(libro) == 'Harry Potter'
