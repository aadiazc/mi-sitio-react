from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
import json
import jwt

def home(request):
    return JsonResponse({"mensaje": "¡Hola Aarón, tu API Django ya está viva en Elastic Beanstalk!"})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Faltan credenciales'}, status=400)

            user = authenticate(username=username, password=password)

            if user is not None:
                payload = {'user_id': user.id, 'username': user.username}
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
                return JsonResponse({'token': token})
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido'}, status=400)
    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'El usuario ya existe'}, status=400)

            User.objects.create_user(username=username, password=password)
            return JsonResponse({'status': 'registrado'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido'}, status=400)
    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def profile_view(request):
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        return JsonResponse({'error': 'Token no proporcionado'}, status=401)
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'])
        return JsonResponse({'username': user.username})
    except jwt.ExpiredSignatureError:
        return JsonResponse({'error': 'Token expirado'}, status=401)
    except jwt.DecodeError:
        return JsonResponse({'error': 'Token inválido'}, status=401)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)