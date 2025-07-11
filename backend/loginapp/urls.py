from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),  # GET /api/
    path('login/', views.login_view),  # POST /api/login/
    path('profile/', views.profile_view),  # GET /api/profile/
    path('register/', views.register_view),
]
