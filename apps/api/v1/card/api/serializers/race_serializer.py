from rest_framework import serializers

from apps.api.v1.card.models import Race


class RaceSerializer(serializers.ModelSerializer):
    race = serializers.CharField(source='get_name_display')

    class Meta:
        model = Race
        fields = ('id', 'race')
