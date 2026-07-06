from rest_framework import serializers

from apps.api.v1.card.models import Subtype


class SubtypeSerializer(serializers.ModelSerializer):
    subtype = serializers.CharField(source='get_name_display')

    class Meta:
        model = Subtype
        fields = ('id', 'subtype')
