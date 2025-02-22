from django.urls import path
from .views import register_user, login_user

urlpatterns = [
    path("signup/", register_user, name="signup"),
    path("login/", login_user, name="login"),
]