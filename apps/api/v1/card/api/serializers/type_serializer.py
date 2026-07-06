from rest_framework import serializers

from apps.api.v1.card.models import Type


class TypeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_name_display')

    class Meta:
        model = Type
        fields = ('id', 'type')
