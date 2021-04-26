from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

route = DefaultRouter()
route.register('posts', views.PostViewSet)

urlpatterns = [
    path('api/', include(route.urls)),
]
