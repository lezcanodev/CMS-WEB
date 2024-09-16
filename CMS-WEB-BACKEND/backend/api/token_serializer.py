from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from api.models import UserProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Sobrescribimos el método para retornar también el rol del usuario
    """    
    def validate(self, attrs):
        data = super().validate(attrs)
        role = UserProfile.objects.filter(user_id=self.user.id)
        data['role'] = role[0].role
        return data