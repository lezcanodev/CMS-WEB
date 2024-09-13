import pytest
from api.models import Categoria

@pytest.mark.django_db
def test_create_categoria():
    categoria = Categoria.objects.create(nombre="Historia")
    
    # Verificar que la categoría se ha creado correctamente
    assert Categoria.objects.count() == 1
    assert categoria.nombre == "Historia"

