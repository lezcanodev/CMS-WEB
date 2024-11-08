import pytest
from django.contrib.auth.models import User
from api.models import Comentario,Categoria,Libro

@pytest.mark.django_db
def test_crearComentarios():
    user = User.objects.create_user(username='testuser', password='testpassword')
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=user, categoria=categoria, contenido="Contenido del libro")
    
    coment = Comentario.objects.create(usuario=user, contenido='Probando',id_libro=libro)
    
    assert coment.contenido == 'Probando'
    assert coment.usuario == user
    assert coment.id_libro.titulo == libro.titulo