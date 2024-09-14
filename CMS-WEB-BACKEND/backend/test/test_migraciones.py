import pytest
from django.db import connection

@pytest.mark.django_db
def test_check_migrations():
    with connection.cursor() as cursor:
        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name='api_libro'")
        columns = [row[0] for row in cursor.fetchall()]
        assert 'contenido' in columns, "La columna 'contenido' no existe en la tabla 'api_libro'"
