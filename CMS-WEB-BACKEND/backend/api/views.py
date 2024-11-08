from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserProfileSerializer, UserProfileUpdateSerializer, UserSerializer, LibroSerializer, CategoriaSerializer, ComentarioSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Libro, Categoria, UserProfile, Comentario
from .permisos import rol_Requerido

from rest_framework.response import Response
from .permisos import rol_Requerido
from rest_framework.permissions import IsAuthenticated
from api.roles import Roles


from django.shortcuts import render
from .emails import enviar_notificacion_email


class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [AllowAny]  # Solo 'admin' puede actualizar el rol
    rol_Requerido.roles = ['Admin']

    def get_object(self):
        """
        retorna el perfil de usuario a ser actualizado.-
        """
        return self.request.user.userprofile

class LibroListCreate(generics.CreateAPIView):
    """ Clase para listar/instanciar un libro atraves de la clase CreateAPIView del framework REST
    """
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticated]         #solo el administrador o el autor pueden crear libros     
    
    
    def get_queryset(self):
        """metodo reescrito, get_queryset retornara un set de libros del modelo "Libro" con el filtro de categoria
        """
       
        return Libro.objects.all()

    def perform_create(self, serializer):
        """Metodo reescrito para verificar que el objeto enviado atraves del serializer cumple con los atributos necesarios para su creacion para luego ser guardado
        """
        if serializer.is_valid():
        
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class LibroListar(generics.ListAPIView):
    """ Clase para listar los libro atraves de la clase ListAPIView del framework REST
    """
    serializer_class = LibroSerializer
    permission_classes = [AllowAny]                                 #cualquiera puede listar los libros
        
    def get_queryset(self):
        """retorna todos los libros
        """
        id_param = self.request.query_params.get('id', None)
        if id_param:
            return Libro.objects.filter(id=id_param)
        return Libro.objects.all()



class LibroDelete(generics.DestroyAPIView):
    """View para borrar un articulo del modelo Libro
    con la clase DestroyAPIView del framework REST
    """
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        """Metodo reescrito, get_queryset dentro del metodo DestroyAPIView retorna el set de objetos que pueden ser borrados, solo podran ser borrados articulos que pertenecen al usuario"""
        user = self.request.user
        return Libro.objects.filter(author = user)


class CategoriaListCreate(generics.CreateAPIView):
    """View para crear/listar categorias (uso opcional)"""
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        """metodo que retorna todos los objetos del modelo Categoria"""
        return Categoria.objects.all()

    def perform_create(self, serializer):
        """Metodo que verifica que el objeto enviado atraves del serializer sea correcto
        """
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class CategoriaListar(generics.ListAPIView):
    """ Clase para listar las categorias atraves de la clase ListAPIView del framework REST
    """
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
        
    def get_queryset(self):
        """retorna todas las categorias
        """
        
        return Categoria.objects.all()



class CategoriaDelete(generics.DestroyAPIView):
    """View para borrar una categoria(opcional)
    """
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        """Metodo que retorna el objeto que coincida con el nombre para ser eliminado
        """
        
        return Categoria.objects.all()
   




class CreateUserView(generics.CreateAPIView):
    """View para crear un usuario atraves de CreateAPIWiew del framework REST"""
    queryset = User.objects.all() #verificamos que no existe ya el user
    serializer_class = UserSerializer #especificamos que tipo de datos necesitamos para la creacion
    permission_classes = [AllowAny] #especifiacomes quien puede llamar a esta funcion
    #con estos parametros se hace la creacion automatica

    #UPDATES
class UpdateCategoriaAPIView(generics.UpdateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    lookup_field = 'pk'
    permission_classes = [rol_Requerido]
    rol_Requerido.roles = ['admin']

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "mobile number updated successfully"})

        else:
            return Response({"message": "failed", "details": serializer.errors})

class UpdateLibroAPIView(generics.UpdateAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    lookup_field = 'pk'
    permission_classes = [rol_Requerido]
    rol_Requerido.roles = ['admin','editor']

    
    

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        estado_anterior =instance.estado
        author= instance.author
        titulo= instance.titulo
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        
        
        if serializer.is_valid():
            serializer.save()
            
            estado_actual =instance.estado
            
            # Enviar correo de notificación
            enviar_notificacion_email(
                'Actualizacion de estado',
                f'Su publicacion "{titulo}" se ha actualizado de "{estado_anterior}" a "{estado_actual}".',
                [author]
            )
            
            return Response({"message": "mobile number updated successfully"})

        else:
            return Response({"message": "failed", "details": serializer.errors})
    permission_classes = [AllowAny] #especificamos quien puede llamar a esta funcion
    #con estos parametros se hace la creacion automatica

    
class UserProfileListView(generics.ListAPIView):
    """ 
        View para la creacion de perfil de usuario
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]


class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [IsAuthenticated]  # Solo 'admin' puede actualizar el rol
   
    def get_object(self):
        """
        retorna el perfil de usuario a ser actualizado.-
        """
        return self.request.user.userprofile

#GUARDAR Y LISTAR COMENTARIOS
class CrearComentarioView(generics.CreateAPIView):
    """ Clase para instanciar un comentario atraves de la clase CreateAPIView del framework REST
    """
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]         #Cualquier usuario puede comentar
    
    
    def get_queryset(self):
        """metodo reescrito, get_queryset retornara un set de comentarios para el libro correspondiente
        """
       
        return Comentario.objects.all()

    def perform_create(self, serializer):
        """Metodo reescrito para verificar que el objeto enviado atraves del serializer cumple con los atributos necesarios para su creacion para luego ser guardado
        """
        author = 'autor' 
        titulo =  'Nueva noticia' 
        enviar_notificacion_email(
            'Nuevo comentario',
            f'Su publicacion "{titulo}" tiene un nuevo comentario.',
            [author]
        )
        return
        
        print(self.request.data)
        print('))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))')
        if serializer.is_valid():
            serializer.save(usuario=self.request.user, id_libro = Libro.objects(). self.request.data.get('id_libro'))
        else:
            print(serializer.errors)
        author = 'autor' #self.request.libro.titulo
        titulo =  'titulo' #self.request.libro.author
        # Enviar correo de notificación
        enviar_notificacion_email(
            'Nuevo comentario',
            f'Su publicacion "{titulo}" tiene un nuevo comentario.',
            [author]
        )

#View para listar los comentario
class ListarComentariosView(generics.ListAPIView):
    """ Clase para listar los comentarios atraves de la clase ListAPIView del framework REST
    """
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]                                 #cualquiera puede listar los comentarios
        
    def get_queryset(self):
        """retorna todos los comentarios
        """

		#del front para el filtrado
        id_libro = self.request.query_params.get('id', None)
        if id_libro:
            return Comentario.objects.filter(id_libro=id_libro)
        return Comentario.objects.all()

