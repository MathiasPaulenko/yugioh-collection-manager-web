from rest_framework import viewsets, status
from rest_framework.response import Response

from apps.api.v1.card.api.serializers.attribute_serializer import AttributeSerializer


class AttributeViewSet(viewsets.ModelViewSet):
    serializer_class = AttributeSerializer
    http_method_names = ['get', ]

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request, *args, **kwargs):
        attribute_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(attribute_serializer.data, status=status.HTTP_200_OK)
