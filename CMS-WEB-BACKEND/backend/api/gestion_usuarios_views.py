
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import generics
from api.roles import Roles
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

""" Para que el administrador pueda crear usuarios
"""
class CrearUsuarioView(generics.CreateAPIView):
    """View para crear un usuario atraves de CreateAPIWiew del framework REST"""
    queryset = User.objects.all() #verificamos que no existe ya el user
    serializer_class = UserSerializer #especificamos que tipo de datos necesitamos para la creacion
    permission_classes = [IsAuthenticated] #especifiacomes quien puede llamar a esta funcion
    #con estos parametros se hace la creacion automatica

    """ Preparamos los datos para la creación del usuario
    """
    def post(self, request, *args, **kwargs):
        # si role no esta definido asignamos el por defecto
        #print("init: ",request.data['role'])
        #if not request.data.get('role'):
        #    request.data['role'] = Roles.SUSCRIPTOR.value

        # Verificamos el rol del usuario actual, en caso de estar autenticado
        #if hasattr(request, 'user') and hasattr(request.user, 'id'):
        #    role = UserProfile.objects.filter(user_id = request.user.id)
        #    #print("role: ", role[0], role[0].role,len(role) > 0,  role[0].role == Roles.ADMIN.value, not (len(role) > 0 and role[0].role == Roles.ADMIN.value))
        #    # si el usuario no es el administrador ponemos el rol por defecto
        #    # en caso contrario dejamos el rol que ya viene en el body
        #    if not (len(role) > 0 and role[0].role == Roles.ADMIN.value):
        #        request.data['role']  = Roles.SUSCRIPTOR.value

        return super().post(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        newUser = serializer.save()
        # asignamos el nuevo usuario a su rol
        #print("DATA==> ",dict(self.request.data))
        #print(self.request.data.get('role', Roles.SUSCRIPTOR.value))
        UserProfile.objects.update_or_create(
            user=newUser,
            defaults={
                'role': self.request.data.get('role', Roles.SUSCRIPTOR.value)  # Default to 'user' if 'role' is not provided
            }
        )

""" No funciona, solicita todos los datos del usuario para la actualizacion y debe ser parcial
"""
class UpdateUsuarioView(generics.CreateAPIView):
    #queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            updatedUser = serializer.save()

            # Actualizar o crear el UserProfile
            #UserProfile.objects.update_or_create(
            #    user=updatedUser,
            #    defaults={
            #        'role': self.request.data.get('role', Roles.SUSCRIPTOR.value)  # Default a 'SUSCRIPTOR' si no se proporciona 'role'
            #    }
            #)
            return Response(serializer.data, status=200)  # Devuelve los datos actualizados
        else:
            return Response(serializer.errors, status=400)  


class ListarUsuariosView(generics.ListAPIView):
    """ Clase para listar los usuarios a traves de la clase ListAPIView del framework REST
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        """retorna todos los libros
        """
        return User.objects.all()
