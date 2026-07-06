from rest_framework import serializers

from apps.api.v1.card.models import PendulumMonster


class PendulumMonsterSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')
    subtype = serializers.CharField(source='get_subtype_display')
    rarity = serializers.CharField(source='get_rarity_display')
    race = serializers.CharField(source='get_race_display')
    attribute = serializers.CharField(source='get_attribute_display')

    class Meta:
        model = PendulumMonster
        fields = (
            'card_number',
            'serial_code',
            'name',
            'description',
            'attack',
            'defence',
            'level',
            'type',
            'subtype',
            'race',
            'attribute',
            'scale',
            'rarity',
            'archetype',
            'edition',
            'set_name',
            'img_code',
            'amount',
            'note',
            'format',
            'banned',
            'language',

        )
