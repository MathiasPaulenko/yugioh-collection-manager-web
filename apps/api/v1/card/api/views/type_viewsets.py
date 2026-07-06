from rest_framework import viewsets, status
from rest_framework.response import Response

from apps.api.v1.card.api.serializers.type_serializer import TypeSerializer


class TypeViewSet(viewsets.ModelViewSet):
    serializer_class = TypeSerializer
    http_method_names = ['get', ]

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request, *args, **kwargs):
        type_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(type_serializer.data, status=status.HTTP_200_OK)
