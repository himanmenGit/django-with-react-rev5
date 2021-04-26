from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, SuggestionUserSerializer

User = get_user_model()


class SignupView(CreateAPIView):
    model = User()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny
    ]


class SuggestionListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = SuggestionUserSerializer
