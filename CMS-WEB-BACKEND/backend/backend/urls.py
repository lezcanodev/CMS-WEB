
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_sso.views import obtain_session_token, obtain_authorization_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name ="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('session/', obtain_session_token, name='obtain_session_token'),
    path('authorize/', obtain_authorization_token, name='obtain_authorization_token'),
    path("api-auth/", include("rest_framework.urls"))
]
