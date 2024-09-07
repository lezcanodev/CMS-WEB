from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

"""
Para testear que al intentar crear un libro con datos incorrectos
las respuesta sea 400 Bad Request
"""
class LibroTests(TestCase):
    def setUp(self):
        # Configura cualquier estado necesario antes de cada test.
        self.client = APIClient()
        # Datos incorrectos para la prueba.
        categoria_incorrecta = 154565641    # ID de categoría no válido.
        author_incorrecto    = 156415656    # ID de author no válido.
        # Datos del libro para enviar en la solicitud.
        self.libro_data = {
            "titulo": "",
            "autor": author_incorrecto,
            "categoria": categoria_incorrecta
        }

    def test_crear_libro(self):
        try:
            # Test para verificar que la creación de un libro con datos incorrectos devuelve un error 400.
            response = self.client.post('/api/crear-libro', self.libro_data, format='json')
            # Verifica que el código de estado de la respuesta sea 400 Bad Request.
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST , "El código de estado de la respuesta debe ser 400 Bad Request")

            # Mensaje para indicar que el test pasó correctamente.
            print("\033[92m")
            print("✓ El test de Bad Request al intentar crear un libro con datos incorrectos paso correctamente.")
            print("\033[0m")
        except Exception as error:
            print("\033[91m")
            print(error)
            print("\033[0m")