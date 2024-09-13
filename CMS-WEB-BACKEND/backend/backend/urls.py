
from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name ="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/crear-libro", LibroListCreate.as_view(), name="crear-libro"),

    path("api/listar-libro", login_required(LibroListar.as_view()), name="listar-libro"),

    path("api/borrar-libro",login_required(LibroDelete.as_view()), name="borrar-libro" ),

    path("api/crear-categoria", login_required(CategoriaListCreate.as_view()), name="crear-categoria"),

    path("api/listar-categoria", login_required(CategoriaListar.as_view()), name="listar-categoria"),

    path("api/borrar-categoria",login_required(CategoriaDelete.as_view()), name="borrar-categoria"),
    
    path("api/actualizar-role",login_required(UserProfileUpdateView.as_view()),name="actualizar-role"),

    #path("api/listar-roles", RolesListar.as_view(), name="listar-roles"),

    #path("api/borrar-rol",RolesDelete.as_view(), name="borrar-rol" )   
]

