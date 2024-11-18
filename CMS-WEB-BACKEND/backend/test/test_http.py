import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Histograma, User, Libro,Categoria

@pytest.mark.django_db
def test_listar_usuarios_autenticado():
    # Configuración del cliente de prueba
    client = APIClient()

    # Crear un usuario autenticado
    usuario = User.objects.create_user(username="testuser", password="testpass")
    client.force_authenticate(user=usuario)

    # Obtener la URL de la vista
    url = reverse("listar-usuario")  # Cambia esto por el nombre real en tu urls.py

    # Hacer una solicitud GET a la vista
    response = client.get(url)

    # Verificar que el código de respuesta sea 200
    assert response.status_code == status.HTTP_200_OK

    # Verificar que los datos sean correctos
    resultados = response.json()
    assert len(resultados) == 1
    assert resultados[0]["role"] == 'Suscriptor'
    


@pytest.mark.django_db
def test_listar_usuarios_no_autenticado():
    # Configuración del cliente de prueba
    client = APIClient()

    # Obtener la URL de la vista
    url = reverse("listar-usuario")  # Cambia esto por el nombre real en tu urls.py

    # Hacer una solicitud GET sin autenticación
    response = client.get(url)

    # Verificar que el código de respuesta sea 401 (No autorizado)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    

#test de listar usuarios
@pytest.mark.django_db
def test_listar_categoria():
    
    x = Categoria.objects.count()
    client = APIClient()
    
    #se crea una categoria de prueba
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    otra_categoria = Categoria.objects.create(nombre="Accion")
    
    url= reverse('listar-categoria')
    response = client.get(url,{'categoria':categoria.id})
    
    
    assert response.status_code == status.HTTP_200_OK
    
    resultados = response.json()
    
    assert len(resultados) == x+2
    assert resultados[x]['nombre'] == categoria.nombre
    assert resultados[x+1]['nombre'] == otra_categoria.nombre


#test de listar libros
@pytest.mark.django_db
def test_listar_libros():
    x = Libro.objects.count()
    client = APIClient()
    
    usuario = User.objects.create(username="testuser", password="testpass")
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=usuario, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    url = reverse('listar-libro')
    response = client.get(url,{'libro':libro.id})
    
    assert response.status_code == status.HTTP_200_OK
    
    resultados = response.json()
    
    assert len(resultados) == x+1
    assert  resultados[x]['titulo']  == libro.titulo
    
    
#test de listar historial de acciones
@pytest.mark.django_db
def test_histograma_listar_filtrado_por_libro():
    # Configuración de cliente y datos
    client = APIClient()
    
    # Crear un usuario y libro de prueba
    usuario = User.objects.create(username="testuser", password="testpass")
    categoria = Categoria.objects.create(nombre="Ciencia Ficción")
    libro = Libro.objects.create(titulo="El viaje espacial", author=usuario, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    
    # Crear histogramas
    histograma1 = Histograma.objects.create(
        fecha="2024-01-01",
        usuario=usuario,
        libro=libro,
        accion="creacion"
    )
    histograma2 = Histograma.objects.create(
        fecha="2024-01-02",
        usuario=usuario,
        libro=libro,
        accion="edicion"
    )
    # Crear un histograma para otro libro (para comprobar el filtrado)
    otro_libro = Libro.objects.create(titulo="El viaje espacial 2", author=usuario, categoria=categoria, contenido="Contenido del libro",likes=0,vistas=0)
    Histograma.objects.create(
        fecha="2024-01-03",
        usuario=usuario,
        libro=otro_libro,
        accion="creacion"
    )

    # Realizar solicitud GET al endpoint de listar histogramas
    url = reverse('listar-historial')  
    response = client.get(url, {'libro': libro.id})

    # Verificar el código de estado
    assert response.status_code == status.HTTP_200_OK

    # Verificar que el resultado solo contiene los histogramas del libro especificado
    resultados = response.json()
    assert len(resultados) == 2
    assert resultados[0]["accion"] == histograma1.accion
    assert resultados[1]["accion"] == histograma2.accion
