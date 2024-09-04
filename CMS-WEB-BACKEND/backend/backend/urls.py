
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, LibroListCreate, CategoriaListCreate, CategoriaDelete,LibroDelete, LibroListar,CategoriaListar
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name ="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/crear-libro", LibroListCreate.as_view(), name="crear-libro"),

    path("api/listar-libro", LibroListar.as_view(), name="listar-libro"),

    path("api/borrar-libro",LibroDelete.as_view(), name="borrar-libro" ),

    path("api/crear-categoria", CategoriaListCreate.as_view(), name="crear-categoria"),

    path("api/listar-categoria", CategoriaListar.as_view(), name="listar-categoria"),

    path("api/borrar-categoria",CategoriaDelete.as_view(), name="borrar-categoria" )  
]

