from django.db.models import Sum


def get_amounts_cards(cards: dict, choices, queryset, field):
    for data in choices:
        key = f"{data[1].lower() + '_cards'}"
        key = key.replace('/', '').replace(' ', '_')
        value = int(data[0])
        amount = queryset.filter((field, value)).aggregate(Sum('amount'))['amount__sum']
        cards[key] = amount if amount else 0

    return cards


def get_unique_cards(cards: dict, choices, queryset, field):
    for data in choices:
        key = f"{data[1].lower() + '_cards'}"
        key = key.replace('/', '').replace(' ', '_')
        value = int(data[0])
        amount = queryset.filter((field, value)).count()
        cards[key] = amount if amount else 0

    return cards
