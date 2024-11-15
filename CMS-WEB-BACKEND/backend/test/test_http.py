import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Histograma, User, Libro,Categoria

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
