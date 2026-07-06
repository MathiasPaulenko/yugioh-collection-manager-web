from rest_framework import serializers

from apps.api.v1.card.models import Card


class InfoCardSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')
    rarity = serializers.CharField(source='get_rarity_display')
    subtype = serializers.CharField(source='get_subtype_display')

    class Meta:
        model = Card
        fields = (
            'card_number',
            'serial_code',
            'name',
            'type',
            'subtype',
            'rarity',
            'amount',
        )
