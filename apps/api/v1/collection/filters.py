from django_filters import rest_framework as filters, OrderingFilter

from apps.api.v1.card.models import Card
from apps.api.v1.card import choices
from apps.api.v1.collection import fixtures


class CardFilter(filters.FilterSet):
    serial_code = filters.CharFilter(lookup_expr='icontains')
    card_number = filters.CharFilter(lookup_expr='icontains')
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')
    set_name = filters.CharFilter(field_name='set_name', lookup_expr='icontains')
    game_format = filters.CharFilter(field_name='format', lookup_expr='icontains')
    banned = filters.CharFilter(field_name='banned')
    language = filters.CharFilter(field_name='language')

    lamount = filters.NumberFilter(field_name='amount', lookup_expr='lt')
    gamount = filters.NumberFilter(field_name='amount', lookup_expr='gt')

    """ especial filters """
    type = filters.CharFilter(method='type_filter')
    subtype = filters.CharFilter(method='subtype_filter')
    rarity = filters.CharFilter(method='rarity_filter')

    amount = filters.NumberFilter()

    distinct = filters.CharFilter(method='is_distinct')
    in_collection = filters.BooleanFilter(method='in_collection_filter')
    repeated = filters.BooleanFilter(method='repeated_filter')
    repeated_name = filters.BooleanFilter(method='repeated_name_filter')

    level = filters.CharFilter(method='level_filter')
    archetype = filters.CharFilter(method='archetype_filter')
    description = filters.CharFilter(method='description_filter')

    attack = filters.CharFilter(method='attack_filter')
    defence = filters.CharFilter(method='defence_filter')

    race = filters.CharFilter(method='race_filter')
    attribute = filters.CharFilter(method='attribute_filter')

    ord = OrderingFilter(
        # tuple-mapping retains order
        fields=(
            ('card_number', 'card_number'),
            ('name', 'name'),
            ('serial_code', 'serial_code'),
        ),

        # labels do not need to retain order
        field_labels={
            'card_number': 'Card Number',
            'name': 'Name',
            'serial_code': 'Serial Code'
        }
    )

    class Meta:
        model = Card

        fields = (
            'serial_code',
            'card_number',
            'name',
            'type',
            'subtype',
            'rarity',
            'amount',
        )

        exclude = [
            'set_name',
            'edition',
            'img_code',
        ]

    @staticmethod
    def type_filter(queryset, name, value):
        return fixtures.get_choice_multi_query(queryset, 'type', value, choices.CARD_TYPE)

    @staticmethod
    def subtype_filter(queryset, name, value):
        return fixtures.get_choice_multi_query(queryset, 'subtype', value, choices.CARD_SUBTYPE)

    @staticmethod
    def rarity_filter(queryset, name, value):
        return fixtures.get_choice_multi_query(queryset, 'rarity', value, choices.CARD_RARITY)

    @staticmethod
    def in_collection_filter(queryset, name, value):
        query = {'amount__gte': 1} if value else {'amount__lte': 0}
        return queryset.filter(**query)

    @staticmethod
    def repeated_filter(queryset, name, value):
        query = {'amount__gte': 4} if value else {'amount__gt': 0, 'amount__lte': 3}
        return queryset.filter(**query)

    @staticmethod
    def level_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_level(serial_code, value)

    @staticmethod
    def archetype_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_archetype(serial_code, value)

    @staticmethod
    def description_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_desc(serial_code, value)

    @staticmethod
    def attack_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_attack(serial_code, value)

    @staticmethod
    def defence_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_defence(serial_code, value)

    @staticmethod
    def race_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_race(serial_code, value)

    @staticmethod
    def attribute_filter(queryset, name, value):
        serial_code = list(queryset.values_list('serial_code', flat=True))
        return fixtures.get_card_for_attribute(serial_code, value)

    @staticmethod
    def is_distinct(queryset, name, value):
        card_numbers = list(queryset.values_list('card_number', flat=True).distinct())
        if value.lower() == "true":
            card_numbers = list(set(card_numbers))
        return fixtures.get_card_distinct(card_numbers)
