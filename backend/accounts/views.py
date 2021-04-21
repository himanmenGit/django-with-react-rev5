from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer

User = get_user_model()


class SignupView(CreateAPIView):
    model = User()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny
    ]
    pass
