from rest_framework import serializers

from apps.api.v1.card.models import Monster


class MonsterSerializer(serializers.ModelSerializer):
    monster = serializers.CharField(source='get_name_display')

    class Meta:
        model = Monster
        fields = ('id', 'monster')
