from rest_framework import serializers

from apps.api.v1.card.models import MagicTrapCard


class MagicTrapCardSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')
    subtype = serializers.CharField(source='get_subtype_display')
    rarity = serializers.CharField(source='get_rarity_display')
    race = serializers.CharField(source='get_race_display')

    class Meta:
        model = MagicTrapCard
        fields = (
            'card_number',
            'serial_code',
            'name',
            'description',
            'race',
            'archetype',
            'type',
            'subtype',
            'rarity',
            'set_name',
            'edition',
            'img_code',
            'amount',
            'note',
            'format',
            'banned',
            'language',

        )
