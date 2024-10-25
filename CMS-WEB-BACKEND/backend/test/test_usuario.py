import pytest
from django.contrib.auth.models import User
from api.signals import crear_userprofile
from api.models import UserProfile
from api.serializers import UserProfileSerializer

@pytest.mark.django_db
def test_crearusuario():
    user = User.objects.create_user(username='testuser', password='testpassword')
    
    assert user.username == 'testuser'

@pytest.mark.django_db
def test_contraseñaEncriptada():
    user = User.objects.create_user(username='testuser', password='testpassword')
    
    
    assert user.password != 'testpassword'


