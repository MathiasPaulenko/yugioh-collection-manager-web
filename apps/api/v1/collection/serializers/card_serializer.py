from rest_framework import serializers

from apps.api.v1.card.models import (
    Card,
    SkillCard,
    MagicTrapCard,
    PendulumMonster,
    LinkMonster,
    MagicTrapRace,
    LinkMarker
)
from apps.api.v1.collection.fixtures import get_data_from_card_type
from apps.api.v1.card.models import (
    GeneralMonster,
    Type,
    Subtype,
    Rarity,
    Race,
    Attribute
)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

    def to_representation(self, instance):
        return get_data_from_card_type(instance)


class DecreaseIncreaseCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = (
            'card_number',
            'serial_code',
            'name',
            'amount',
        )


class  CreateGeneralMonsterSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all())
    subtype = serializers.PrimaryKeyRelatedField(queryset=Subtype.objects.all())
    rarity = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all())
    race = serializers.PrimaryKeyRelatedField(queryset=Race.objects.all())
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())

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


class CreateSkillCardSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all())
    subtype = serializers.PrimaryKeyRelatedField(queryset=Subtype.objects.all())
    rarity = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all())

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


class CreateMagicTrapCardSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all())
    subtype = serializers.PrimaryKeyRelatedField(queryset=Subtype.objects.all())
    rarity = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all())
    race = serializers.PrimaryKeyRelatedField(queryset=MagicTrapRace.objects.all())

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


class CreatePendulumMonsterSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all())
    subtype = serializers.PrimaryKeyRelatedField(queryset=Subtype.objects.all())
    rarity = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all())
    race = serializers.PrimaryKeyRelatedField(queryset=Race.objects.all())
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())

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


class CreateLinkMonsterSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all())
    subtype = serializers.PrimaryKeyRelatedField(queryset=Subtype.objects.all())
    rarity = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all())
    race = serializers.PrimaryKeyRelatedField(queryset=Race.objects.all())
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())
    link_markers = serializers.PrimaryKeyRelatedField(queryset=LinkMarker.objects.all(), many=True)

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


class AmountCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('serial_code', 'amount',)
