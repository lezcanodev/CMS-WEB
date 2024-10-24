
from django.contrib import admin
from django.urls import path, include
#from api.views import CreateUserView, LibroListCreate, CategoriaListCreate, CategoriaDelete,LibroDelete, LibroListar,CategoriaListar, UpdateCategoriaAPIView, UpdateLibroAPIView
from api.gestion_usuarios_views import CrearUsuarioView,ListarUsuariosView, UpdateUsuarioView
from api.views import CreateUserView, LibroListCreate, CategoriaListCreate, CategoriaDelete,LibroDelete, LibroListar,CategoriaListar, UpdateCategoriaAPIView, UpdateLibroAPIView, UserProfileUpdateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#drf-yasg para la documentacion de la api
schema_view = get_schema_view(
    openapi.Info(
        title="REST APIs",
        default_version='v1',
        description="API documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    #documentacion
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    #app
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name ="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    
    path("api/crear-libro", LibroListCreate.as_view(), name="crear-libro"),
    path("api/listar-libro", LibroListar.as_view(), name="listar-libro"),
    path("api/borrar-libro/<int:pk>",LibroDelete.as_view(), name="borrar-libro" ),
    path("api/update-libro/<int:pk>",UpdateLibroAPIView.as_view(), name="update-libro" ),

    path("api/crear-categoria", CategoriaListCreate.as_view(), name="crear-categoria"),
    path("api/listar-categoria", CategoriaListar.as_view(), name="listar-categoria"),
    path("api/borrar-categoria/<int:pk>",CategoriaDelete.as_view(), name="borrar-categoria" ),
    path("api/update-categoria/<int:pk>",UpdateCategoriaAPIView.as_view(), name="update-categoria" ),

    # ABM gestión usuarios para admin
    path("api/crear-usuario", CrearUsuarioView.as_view(), name="crear-usuario"),
    path("api/listar-usuario", ListarUsuariosView.as_view(), name="listar-usuario"),
    path("api/update-usuario/<int:pk>", UpdateUsuarioView.as_view(), name="update-usuario"),
    #path("api/borrar-usuario/<int:pk>",CategoriaDelete.as_view(), name="borrar-usuario" ),
    #path("api/update-usuario/<int:pk>",UpdateCategoriaAPIView.as_view(), name="update-usuario" ),

    #path("api/listar-libro", login_required(LibroListar.as_view()), name="listar-libro"),

    #path("api/borrar-libro",login_required(LibroDelete.as_view()), name="borrar-libro" ),

    #path("api/crear-categoria", login_required(CategoriaListCreate.as_view()), name="crear-categoria"),

    #path("api/listar-categoria", login_required(CategoriaListar.as_view()), name="listar-categoria"),

    #path("api/borrar-categoria",login_required(CategoriaDelete.as_view()), name="borrar-categoria"),
    
    #path("api/actualizar-role",login_required(UserProfileUpdateView.as_view()),name="actualizar-role"),

    #path("api/listar-roles", RolesListar.as_view(), name="listar-roles"),

    #path("api/borrar-rol",RolesDelete.as_view(), name="borrar-rol" )   

    path("api/actualizar-role",UserProfileUpdateView.as_view(),name="actualizar-role"),
	path("api/guardar-comentario",CrearComentarioView.as_view(), name="guardar-comentario"),
	path("api/listar-comentarios",ListarComentariosView.as_view(), name="listar-comentarios")
]

