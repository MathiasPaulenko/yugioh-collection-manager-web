from rest_framework import serializers
from apps.api.v1.card.api.serializers.link_marker_serializer import LinkMarkerListSerializer
from apps.api.v1.card.models import LinkMonster


class LinkMonsterSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')
    subtype = serializers.CharField(source='get_subtype_display')
    rarity = serializers.CharField(source='get_rarity_display')
    race = serializers.CharField(source='get_race_display')
    attribute = serializers.CharField(source='get_attribute_display')
    link_markers = LinkMarkerListSerializer(many=True, required=False)

    class Meta:
        model = LinkMonster
        fields = (
            'card_number',
            'serial_code',
            'name',
            'description',
            'attack',
            'type',
            'subtype',
            'race',
            'attribute',
            'rarity',
            'archetype',
            'link_value',
            'link_markers',
            'edition',
            'set_name',
            'img_code',
            'amount',
            'note',
            'format',
            'banned',
            'language',

        )
