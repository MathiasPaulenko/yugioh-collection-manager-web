from rest_framework import viewsets

from apps.api.v1.card.api.serializers.link_monster_serializer import LinkMonsterSerializer


class LinkMonsterViewSet(viewsets.ModelViewSet):
    serializer_class = LinkMonsterSerializer
    http_method_names = ['get', ]

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset())
        link_monster_serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(link_monster_serializer.data)
