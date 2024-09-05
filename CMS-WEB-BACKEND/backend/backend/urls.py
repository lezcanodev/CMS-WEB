
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, LibroListCreate, CategoriaListCreate, CategoriaDelete,LibroDelete, LibroListar,CategoriaListar, UpdateCategoriaAPIView, UpdateLibroAPIView
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
    path("api/borrar-libro",LibroDelete.as_view(), name="borrar-libro" ),
    path("api/update-libro",UpdateLibroAPIView.as_view(), name="update-libro" ),

    path("api/crear-categoria", CategoriaListCreate.as_view(), name="crear-categoria"),
    path("api/listar-categoria", CategoriaListar.as_view(), name="listar-categoria"),
    path("api/borrar-categoria",CategoriaDelete.as_view(), name="borrar-categoria" ),
    path("api/update-categoria",UpdateCategoriaAPIView.as_view(), name="update-categoria" ) 
]

