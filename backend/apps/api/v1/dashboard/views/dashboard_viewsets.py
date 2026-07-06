from django.db.models import Sum
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.api.v1.card import choices
from apps.api.v1.card.models import Card, Monster, MagicTrapCard
from apps.api.v1.dashboard.fixtures import get_amounts_cards, get_unique_cards

REGEX_VALUE = '[^/]+'


class TotalCardViewSet(GenericAPIView):
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        card_queryset = Card.objects.all()
        monster_queryset = Monster.objects.all()
        spell_trap_queryset = MagicTrapCard.objects.all()

        total_cards = {
            'repeated': {
                'total_cards': card_queryset.aggregate(Sum('amount'))['amount__sum'],
                'type_amounts': get_amounts_cards({}, choices.CARD_TYPE, card_queryset, 'type'),
                'subtype_amounts': get_amounts_cards({}, choices.CARD_SUBTYPE, card_queryset, 'subtype'),
                'rarity_amounts': get_amounts_cards({}, choices.CARD_RARITY, card_queryset, 'rarity'),
                'attribute_amounts': get_amounts_cards({}, choices.CARD_ATTRIBUTE, monster_queryset, 'attribute'),
                'monster_race_amounts': get_amounts_cards({}, choices.MONSTER_RACE, monster_queryset, 'race'),
                'spell_trap_race_amounts': get_amounts_cards({}, choices.MAGIC_TRAP_RACE, spell_trap_queryset, 'race')
            },
            'unique': {
                'total_cards': card_queryset.count(),
                'type_amounts': get_unique_cards({}, choices.CARD_TYPE, card_queryset, 'type'),
                'subtype_amounts': get_unique_cards({}, choices.CARD_SUBTYPE, card_queryset, 'subtype'),
                'rarity_amounts': get_unique_cards({}, choices.CARD_RARITY, card_queryset, 'rarity'),
                'attribute_amounts': get_unique_cards({}, choices.CARD_ATTRIBUTE, monster_queryset, 'attribute'),
                'monster_race_amounts': get_unique_cards({}, choices.MONSTER_RACE, monster_queryset, 'race'),
                'spell_trap_race_amounts': get_unique_cards({}, choices.MAGIC_TRAP_RACE, spell_trap_queryset, 'race')

            }
        }

        return Response(total_cards)


class TotalTypeCardViewSet(GenericAPIView):
    cards_model = Card.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'type_amounts': get_amounts_cards({}, choices.CARD_TYPE, self.cards_model, 'type'),

            },
            'unique': {
                'type_amounts': get_unique_cards({}, choices.CARD_TYPE, self.cards_model, 'type'),

            }
        }

        return Response(total_cards)


class TotalSubtypeCardViewSet(GenericAPIView):
    cards_model = Card.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'subtype_amounts': get_amounts_cards({}, choices.CARD_SUBTYPE, self.cards_model, 'subtype'),

            },
            'unique': {
                'subtype_amounts': get_unique_cards({}, choices.CARD_SUBTYPE, self.cards_model, 'subtype'),

            }
        }

        return Response(total_cards)


class TotalRarityCardViewSet(GenericAPIView):
    cards_model = Card.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'rarity_amounts': get_amounts_cards({}, choices.CARD_RARITY, self.cards_model, 'rarity'),

            },
            'unique': {
                'rarity_amounts': get_unique_cards({}, choices.CARD_RARITY, self.cards_model, 'rarity'),

            }
        }

        return Response(total_cards)


class TotalMonsterAttributeCardViewSet(GenericAPIView):
    cards_model = Monster.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'attribute_amounts': get_amounts_cards({}, choices.CARD_ATTRIBUTE, self.cards_model, 'attribute'),

            },
            'unique': {
                'attribute_amounts': get_unique_cards({}, choices.CARD_ATTRIBUTE, self.cards_model, 'attribute'),

            }
        }

        return Response(total_cards)


class TotalMonsterRaceCardViewSet(GenericAPIView):
    cards_model = Monster.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'monster_race_amounts': get_amounts_cards({}, choices.MONSTER_RACE, self.cards_model, 'race'),

            },
            'unique': {
                'monster_race_amounts': get_unique_cards({}, choices.MONSTER_RACE, self.cards_model, 'race'),

            }
        }

        return Response(total_cards)


class TotalTrapSpellRaceCardViewSet(GenericAPIView):
    cards_model = MagicTrapCard.objects.all()
    lookup_field = "serial_code__iexact"
    lookup_value_regex = REGEX_VALUE
    http_method_names = ['get', ]

    def get(self, request):
        total_cards = {
            'repeated': {
                'spell_trap_race_amounts': get_amounts_cards({}, choices.MAGIC_TRAP_RACE, self.cards_model, 'race')

            },
            'unique': {
                'spell_trap_race_amounts': get_unique_cards({}, choices.MAGIC_TRAP_RACE, self.cards_model, 'race')

            }
        }

        return Response(total_cards)
