from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

route = DefaultRouter()
route.register('posts', views.PostViewSet)
# route.register('posts/<int:post_pk>/comments', views.CommentViewSet)
route.register(r'posts/(?P<post_pk>\d+)/comments', views.CommentViewSet)

urlpatterns = [
    path('api/', include(route.urls)),
]
