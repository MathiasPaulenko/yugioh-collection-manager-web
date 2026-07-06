from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.api.v1.card.api.serializers.info_card_serializer import InfoCardSerializer
from apps.api.v1.collection import filters
from apps.api.v1.card.models import Card


class InfoCardViewSet(viewsets.ModelViewSet):
    serializer_class = InfoCardSerializer
    queryset = Card.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.CardFilter
    http_method_names = ['get', ]
