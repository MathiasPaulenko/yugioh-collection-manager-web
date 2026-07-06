from rest_framework import serializers

from apps.api.v1.card.models import GeneralMonster


class GeneralMonsterSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display', read_only=True)
    subtype = serializers.CharField(source='get_subtype_display', read_only=True)
    rarity = serializers.CharField(source='get_rarity_display', read_only=True)
    race = serializers.CharField(source='get_race_display', read_only=True)
    attribute = serializers.CharField(source='get_attribute_display', read_only=True)

    class Meta:
        model = GeneralMonster
        fields = (
            'card_number',
            'serial_code',
            'name',
            'description',
            'attack',
            'defence',
            'type',
            'subtype',
            'race',
            'level',
            'attribute',
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
