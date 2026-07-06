from django.urls import path

from apps.api.v1.collection.views.card_viewsets import CreateUpdateCardViewSet

urlpatterns = [
    path('create', CreateUpdateCardViewSet.as_view(), name='create'),
    path('create/<str:serial_code>/', CreateUpdateCardViewSet.as_view(), name='create')
]
