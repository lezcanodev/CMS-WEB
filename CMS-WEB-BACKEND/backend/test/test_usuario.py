import pytest
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_crearusuario():
    user = User.objects.create_user(username='testuser', password='testpassword')
    
    assert user.username == 'testuser'

@pytest.mark.django_db
def test_contraseñaEncriptada():
    user = User.objects.create_user(username='testuser', password='testpassword')
    
    
    assert user.password != 'testpassword'
    