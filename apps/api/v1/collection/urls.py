from django.urls import path

from apps.api.v1.collection.views.card_viewsets import (
    CreateUpdateCardViewSet,
    RepeatedByNameCardViewSet,
    TotalPricesCardViewSet
)

urlpatterns = [
    path('create', CreateUpdateCardViewSet.as_view(), name='create'),
    path('create/<str:serial_code>/', CreateUpdateCardViewSet.as_view(), name='create'),
    path(r'repeated', RepeatedByNameCardViewSet.as_view(), name='repeated'),
    path(r'total_price', TotalPricesCardViewSet.as_view(), name='total_price'),

]
