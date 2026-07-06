from rest_framework import serializers
from apps.api.v1.card.models import LinkMarker


class LinkMarkerSerializer(serializers.ModelSerializer):
    link_markers = serializers.CharField(source='get_name_display')

    class Meta:
        model = LinkMarker
        fields = ('id', 'link_markers')


class LinkMarkerListSerializer(serializers.ModelSerializer):
    link_markers = serializers.StringRelatedField(source='get_name_display')

    class Meta:
        model = LinkMarker
        fields = ('link_markers',)

    def to_representation(self, instance):
        return instance.__str__()
