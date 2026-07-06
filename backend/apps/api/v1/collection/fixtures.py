from apps.api.v1.card import choices
from apps.api.v1.card.models import (
    MagicTrapCard,
    GeneralMonster,
    LinkMonster,
    PendulumMonster,
    SkillCard,
    Card
)
from apps.api.v1.card.api.serializers.general_monster_serializer import GeneralMonsterSerializer
from apps.api.v1.card.api.serializers.link_monster_serializer import LinkMonsterSerializer
from apps.api.v1.card.api.serializers.magic_trap_card_serializer import MagicTrapCardSerializer
from apps.api.v1.card.api.serializers.pendulum_monster_serializer import PendulumMonsterSerializer
from apps.api.v1.card.api.serializers.skill_serializer import SkillCardSerializer


def get_data_from_card_type(instance):
    card_type = instance.type
    if str(card_type).lower() == 'skill':
        card = getattr(instance, 'skillcard', None)
        return SkillCardSerializer(card).data if card else {}
    elif str(card_type).lower() in ['spell', 'trap']:
        card = getattr(instance, 'magictrapcard', None)
        return MagicTrapCardSerializer(card).data if card else {}
    else:
        card_subtype = instance.subtype
        monster = getattr(instance, 'monster', None)
        if not monster:
            return {}
        if 'pendulum' in str(card_subtype).lower():
            card = getattr(monster, 'pendulummonster', None)
            return PendulumMonsterSerializer(card).data if card else {}
        elif 'link' in str(card_subtype).lower():
            card = getattr(monster, 'linkmonster', None)
            return LinkMonsterSerializer(card).data if card else {}
        else:
            card = getattr(monster, 'generalmonster', None)
            return GeneralMonsterSerializer(card).data if card else {}


def get_choices_inverted(data_choices):
    return {str(y).lower(): x for x, y in dict(data_choices).items()}


def get_choice_multi_query(queryset, name, value, data_choices):
    card = get_choices_inverted(data_choices)
    try:
        query = queryset.filter(**{
            name: card[str(value).lower()],
        })
        return query
    except KeyError:
        return Card.objects.none()


def get_choice_race_query(obj, serial_code, value, data_choices):
    races = get_choices_inverted(data_choices)
    try:
        return obj.filter(serial_code=serial_code, race=int(races[(str(value).lower())]))
    except KeyError:
        return obj.none()


def get_choice_race_query_by_number(obj, card_number, value, data_choices):
    races = get_choices_inverted(data_choices)
    try:
        return obj.filter(card_number=card_number, race=int(races[(str(value).lower())]))
    except KeyError:
        return obj.none()


def get_choice_attribute_query(obj, serial_code, value, choices_data):
    attribute = {str(y).lower(): x for x, y in dict(choices_data).items()}
    try:
        return obj.filter(serial_code=serial_code, attribute=int(attribute[(str(value).lower())]))
    except KeyError:
        return obj.none()


def combine_queryset(queryset, query, serial_code):
    if query:
        queryset = queryset | Card.objects.filter(serial_code=serial_code)
    return queryset


def get_card_for_level(serial_codes, value):
    try:
        from django.db.models import Q
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, level=value).values_list('serial_code', flat=True)
        lm = LinkMonster.objects.filter(serial_code__in=serial_codes, link_value=int(value)).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, level=value).values_list('serial_code', flat=True)
        matched = set(gm) | set(lm) | set(pm)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_archetype(serial_codes, value):
    try:
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, archetype__icontains=value).values_list('serial_code', flat=True)
        lm = LinkMonster.objects.filter(serial_code__in=serial_codes, archetype__icontains=value).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, archetype__icontains=value).values_list('serial_code', flat=True)
        mt = MagicTrapCard.objects.filter(serial_code__in=serial_codes, archetype__icontains=value).values_list('serial_code', flat=True)
        matched = set(gm) | set(lm) | set(pm) | set(mt)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_desc(serial_codes, value):
    try:
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, description__icontains=value).values_list('serial_code', flat=True)
        lm = LinkMonster.objects.filter(serial_code__in=serial_codes, description__icontains=value).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, description__icontains=value).values_list('serial_code', flat=True)
        mt = MagicTrapCard.objects.filter(serial_code__in=serial_codes, description__icontains=value).values_list('serial_code', flat=True)
        sk = SkillCard.objects.filter(serial_code__in=serial_codes, description__icontains=value).values_list('serial_code', flat=True)
        matched = set(gm) | set(lm) | set(pm) | set(mt) | set(sk)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_attack(serial_codes, value):
    try:
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, attack=value).values_list('serial_code', flat=True)
        lm = LinkMonster.objects.filter(serial_code__in=serial_codes, attack=value).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, attack=value).values_list('serial_code', flat=True)
        matched = set(gm) | set(lm) | set(pm)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_defence(serial_codes, value):
    try:
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, defence=value).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, defence=value).values_list('serial_code', flat=True)
        matched = set(gm) | set(pm)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_race(serial_codes, value):
    try:
        races = get_choices_inverted(choices.MONSTER_RACE)
        magic_races = get_choices_inverted(choices.MAGIC_TRAP_RACE)
        matched = set()

        try:
            race_id = races[str(value).lower()]
            gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, race=race_id).values_list('serial_code', flat=True)
            lm = LinkMonster.objects.filter(serial_code__in=serial_codes, race=race_id).values_list('serial_code', flat=True)
            pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, race=race_id).values_list('serial_code', flat=True)
            matched |= set(gm) | set(lm) | set(pm)
        except KeyError:
            pass

        try:
            magic_race_id = magic_races[str(value).lower()]
            mt = MagicTrapCard.objects.filter(serial_code__in=serial_codes, race=magic_race_id).values_list('serial_code', flat=True)
            matched |= set(mt)
        except KeyError:
            pass

        sk = SkillCard.objects.filter(serial_code__in=serial_codes, race__icontains=value).values_list('serial_code', flat=True)
        matched |= set(sk)

        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def get_card_for_attribute(serial_codes, value):
    try:
        attr_map = {str(y).lower(): x for x, y in dict(choices.CARD_ATTRIBUTE).items()}
        attr_id = attr_map[str(value).lower()]
        gm = GeneralMonster.objects.filter(serial_code__in=serial_codes, attribute=attr_id).values_list('serial_code', flat=True)
        lm = LinkMonster.objects.filter(serial_code__in=serial_codes, attribute=attr_id).values_list('serial_code', flat=True)
        pm = PendulumMonster.objects.filter(serial_code__in=serial_codes, attribute=attr_id).values_list('serial_code', flat=True)
        matched = set(gm) | set(lm) | set(pm)
        return Card.objects.filter(serial_code__in=matched)
    except (Exception,):
        return Card.objects.none()


def invert_general_choice_info(request_data):
    if 'type' in request_data and str(request_data['type']).isnumeric() is False:
        request_data['type'] = get_choices_inverted(choices.CARD_TYPE)[str(request_data['type']).lower()]
    if 'subtype' in request_data and str(request_data['subtype']).isnumeric() is False:
        request_data['subtype'] = get_choices_inverted(choices.CARD_SUBTYPE)[str(request_data['subtype']).lower()]
    if 'rarity' in request_data and str(request_data['rarity']).isnumeric() is False:
        request_data['rarity'] = get_choices_inverted(choices.CARD_RARITY)[str(request_data['rarity']).lower()]


def invert_link_val_choice_info(request_data, card_subtype):
    if 'link' in str(card_subtype).lower() or '21' in str(card_subtype).lower():
        marks = []
        if 'link_markers' in request_data:
            for markers in request_data['link_markers']:
                marks.append(get_choices_inverted(choices.LINK_MARKERS)[str(markers).lower()])
            request_data['link_markers'] = marks


def invert_especial_choice_info(request_data, card_type):
    if str(card_type).lower() in ['monster', 'token'] or str(card_type).lower() in ['1', '5']:
        if 'race' in request_data and str(request_data['race']).isnumeric() is False:
            request_data['race'] = get_choices_inverted(choices.MONSTER_RACE)[str(request_data['race']).lower()]
        if 'attribute' in request_data and str(request_data['attribute']).isnumeric() is False:
            request_data['attribute'] = get_choices_inverted(choices.CARD_ATTRIBUTE)[
                str(request_data['attribute']).lower()]


def invert_magic_trap_choice_info(request_data, card_type=None):
    if str(card_type).lower() in ['spell', 'trap'] or str(card_type).lower() in ['2', '3']:
        if str(request_data['race']).isnumeric() is False:
            request_data['race'] = get_choices_inverted(choices.MAGIC_TRAP_RACE)[str(request_data['race']).lower()]


def invert_request_choices_values(request_data, card_type=None, card_subtype=None):
    invert_general_choice_info(request_data)
    invert_magic_trap_choice_info(request_data, card_type)
    invert_especial_choice_info(request_data, card_type)
    invert_link_val_choice_info(request_data, card_subtype)


def get_card_distinct(card_numbers):
    queryset = Card.objects.none()
    try:
        for card_number in card_numbers:
            card = Card.objects.filter(card_number=card_number).first()
            if str(card.type).lower() in ['spell', 'trap']:
                query = MagicTrapCard.objects.filter(card_number=card_number).distinct()
                queryset = combine_queryset(queryset, query, card.serial_code)
            elif str(card.type).lower() == 'skill':
                query = SkillCard.objects.filter(card_number=card_number).distinct()
                queryset = combine_queryset(queryset, query, card.serial_code)

            else:
                if 'pendulum' in str(card.subtype).lower():
                    query = PendulumMonster.objects.filter(card_number=card_number).distinct()
                    queryset = combine_queryset(queryset, query, card.serial_code)

                elif 'link' in str(card.subtype).lower():
                    query = LinkMonster.objects.filter(card_number=card_number).distinct()
                    queryset = combine_queryset(queryset, query, card.serial_code)

                else:
                    query = GeneralMonster.objects.filter(card_number=card_number).distinct()
                    queryset = combine_queryset(queryset, query, card.serial_code)

    except(Exception,) as ex:
        return Card.objects.none()
    return queryset
