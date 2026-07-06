from django.contrib import admin
from django.urls import path, re_path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="YuGiOh! Card Collection Management",
        default_version='v1',
        description="Backend for the card game collection management application YuGiOh!",
        terms_of_service="",
        contact=openapi.Contact(email="mathias.paulenko@gmail.com"),
        license=openapi.License(name="Apache 2.0"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

doc_url = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

admin_url = [
    path('admin/', admin.site.urls),
]

cards_url = [
    path('collection/', include('apps.api.v1.collection.routers')),
    path('collection/', include('apps.api.v1.collection.urls')),
    path('info/', include('apps.api.v1.card.routers')),
    path('info/', include('apps.api.v1.card.urls')),
    path('dashboard/', include('apps.api.v1.dashboard.urls')),
    path('dashboard/', include('apps.api.v1.dashboard.routers'))
]

urlpatterns = doc_url + admin_url + cards_url
