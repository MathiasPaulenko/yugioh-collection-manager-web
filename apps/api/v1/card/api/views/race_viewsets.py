from itertools import chain

from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from apps.api.v1.card.api.serializers.race_serializer import RaceSerializer
from apps.api.v1.card.api.serializers.magictraprace_serializer import MagicTrapRaceSerializer
from apps.api.v1.card.models import Race, MagicTrapRace


class RaceViewSet(viewsets.ModelViewSet):
    serializer_class = RaceSerializer
    http_method_names = ['get', ]

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request, *args, **kwargs):
        race_serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(race_serializer.data, status=status.HTTP_200_OK)


class CardRacesListView(ListAPIView):
    serializer_class = RaceSerializer
    serializer_class_race = RaceSerializer
    serializer_class_mtrace = MagicTrapRaceSerializer

    def get_queryset_race(self):
        return Race.objects.all()

    def get_queryset_mtrace(self):
        return MagicTrapRace.objects.all()

    def list(self, request, *args, **kwargs):
        mrace = self.serializer_class_race(self.get_queryset_race(), many=True)
        mtrace = self.serializer_class_mtrace(self.get_queryset_mtrace(), many=True)
        result_list = list(chain(mrace.instance, mtrace.instance))

        races_list = []
        for name in result_list:
            races_list.append({'race': name.__str__()})

        return Response(races_list)
