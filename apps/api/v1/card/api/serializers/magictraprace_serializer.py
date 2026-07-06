from rest_framework import serializers

from apps.api.v1.card.models import MagicTrapRace


class MagicTrapRaceSerializer(serializers.ModelSerializer):
    race = serializers.CharField(source='get_name_display')

    class Meta:
        model = MagicTrapRace
        fields = ('id', 'race')
