from rest_framework import serializers

from apps.api.v1.card.models import Attribute


class AttributeSerializer(serializers.ModelSerializer):
    attribute = serializers.CharField(read_only=True, source='get_name_display', )

    class Meta:
        model = Attribute
        fields = ('id', 'attribute',)
