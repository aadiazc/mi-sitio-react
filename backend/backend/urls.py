from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Vista simple para la raíz del backend
def root_view(request):
    return JsonResponse({'message': 'Backend activo y funcionando correctamente'})

urlpatterns = [
    path('', root_view),  # Responde en http://127.0.0.1:8000/
    path('admin/', admin.site.urls),
    path('api/', include('loginapp.urls')),  # Tus endpoints reales van aquí
]