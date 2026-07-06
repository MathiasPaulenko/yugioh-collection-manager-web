from rest_framework import serializers

from apps.api.v1.card.models import Rarity


class RaritySerializer(serializers.ModelSerializer):
    rarity = serializers.CharField(source='get_name_display')

    class Meta:
        model = Rarity
        fields = ('id', 'rarity')
