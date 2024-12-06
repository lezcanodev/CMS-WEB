from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserProfileSerializer, UserProfileUpdateSerializer, UserSerializer, LibroSerializer, CategoriaSerializer, ComentarioSerializer, HistogramaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import IdActual, Libro, Categoria, UserProfile, Comentario, Histograma
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
        categoria = self.request.categoria
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
            
            if(estado_actual!= estado_anterior):
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
        dictionary=self.request.data
        author = self.request.user
        objeto_libro = Libro.objects.get(id = dictionary["id_libro"])
        enviar_notificacion_email(
            'Nuevo comentario',
            f'Su publicacion "{objeto_libro}" tiene un nuevo comentario.',
            [author]
        )

        
        if serializer.is_valid():
            serializer.save(usuario=self.request.user, id_libro = objeto_libro)

        else:
            print(serializer.errors)

#View para listar los comentarios
class ListarComentariosView(generics.ListAPIView):
    """ Clase para listar los comentarios atraves de la clase ListAPIView del framework REST
    """
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]                                 #cualquiera puede listar los comentarios
        
    def get_queryset(self):
        """retorna todos los comentarios
        """
        id_libro = self.request.query_params.get('libroId')
        if id_libro:
            return Comentario.objects.filter(id_libro=id_libro)
        return Comentario.objects.all()

#View para borrar un comentario

class BorrarComentarioView(generics.DestroyAPIView):
    """View para borrar un comentario del modelo comenario 
    con la clase DestroyAPIView del framework REST
    """
    serializer_class = ComentarioSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        """Metodo reescrito, get_queryset dentro del metodo DestroyAPIView retorna el set de objetos que pueden ser borrados, solo podran ser borrados articulos que pertenecen al usuario"""
        id_comentario =  self.kwargs.get('pk')
        comentario = Comentario.objects.filter(id=id_comentario)
        return comentario



#Historial
class HistogramaCreate (generics.CreateAPIView):
    """ Clase para instanciar un "histograma" atraves de la clase CreateAPIView del framework REST
    """
    serializer_class = HistogramaSerializer
    permission_classes = [AllowAny]         #Cualquier usuario que tiene permitido hacer un cambio debe poder acceder al view de crear una historia
    
    
    #def get_queryset(self):
    #    """metodo reescrito, get_queryset retornara un set de historias para el libro correspondiente
    #    """
    #    print("data========================================>  ", self.request.data)
    #    print("???? ", Histograma.objects.filter(id_libro=id_libro));
    #    id_libro = self.request.data.get("libro") 
    #    self.request.libro = Histograma.objects.filter(id_libro=id_libro) 
    #    return Histograma.objects.filter(id_libro=id_libro)

    def perform_create(self, serializer):
        """Metodo reescrito para verificar que el objeto enviado atraves del serializer cumple con los atributos necesarios para su creacion para luego ser guardado
        """  
        #id_libro = self.request.data.get("libro") 
        libro_instance = Libro.objects.get(id=self.request.data.get("libro"))
        if serializer.is_valid():
            serializer.save(usuario=self.request.user, libro = libro_instance )
        else:
            print(serializer.errors)

class HistogramaListar(generics.ListAPIView):
    """ Clase para listar los histogramas atraves de la clase ListAPIView del framework REST
    """
    serializer_class = HistogramaSerializer
    permission_classes = [AllowAny]                                 #cualquiera puede listar las historias 
        
    def get_queryset(self):
        """retorna todos las historias
        """

		#del front para el filtrado
        id_libro = self.request.query_params.get("libro")
        
        return Histograma.objects.filter(libro_id=id_libro)


#Reportes
class CrearTablaIDAPIView(generics.UpdateAPIView):
    """ Clase para crear una tabla con el ID del usuario actual
    """
    queryset = IdActual.objects.all()
    permission_classes = [AllowAny]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'  # Clave en la URL

    def update(self, request, *args, **kwargs):

        # Obtemos el id del usuario
        usuario_id =  kwargs.get('pk')

        #print("el usuario id que recibo es:",usuario_id,self.request.data)
        if usuario_id is not None:
            try:
                # Actualizar o crear el registro de IdActual con id=1
                obj, created = IdActual.objects.update_or_create(
                    #siempre modificaremos el primer elemento...
                    id = 1, 
                    defaults={"id_actual": usuario_id}
                )
                
                #todo correcto
                return Response({"message": "IdActual actualizado correctamente", "id_actual": obj.id_actual}, status=200)
            
            except Exception as e:
                # En caso de error, devolver el detalle del error
                return Response({"error": "Error al actualizar IdActual", "details": str(e)}, status=500)
        else:
            # Si 'usuarioId' no está en los datos de la solicitud
            return Response({"error": "'usuarioId' no proporcionado"}, status=400)


