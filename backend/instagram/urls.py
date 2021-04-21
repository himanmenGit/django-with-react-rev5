from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

route = DefaultRouter()
route.register('post', views.PostViewSet)

urlpatterns = [
    path('api/', include(route.urls)),
]
