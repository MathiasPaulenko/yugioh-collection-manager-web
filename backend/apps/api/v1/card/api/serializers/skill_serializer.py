from rest_framework import serializers

from apps.api.v1.card.models import SkillCard


class SkillCardSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')
    subtype = serializers.CharField(source='get_subtype_display')
    rarity = serializers.CharField(source='get_rarity_display')

    class Meta:
        model = SkillCard
        fields = (
            'card_number',
            'serial_code',
            'name',
            'description',
            'type',
            'subtype',
            'race',
            'rarity',
            'edition',
            'set_name',
            'img_code',
            'amount',
            'note',
            'format',
            'banned',
            'language',

        )
