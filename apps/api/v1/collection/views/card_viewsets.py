import requests
from django.db.models import F
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.api.v1.card.api.serializers.info_card_serializer import InfoCardSerializer
from apps.api.v1.collection.fixtures import (
    get_choices_inverted,
    invert_request_choices_values
)
from apps.api.v1.collection.serializers.card_serializer import (
    CardSerializer,
    DecreaseIncreaseCardSerializer,
    CreateGeneralMonsterSerializer,
    CreateSkillCardSerializer,
    CreateMagicTrapCardSerializer,
    CreatePendulumMonsterSerializer,
    CreateLinkMonsterSerializer, AmountCardSerializer
)
from apps.api.v1.collection import filters, responses
from apps.api.v1.card.models import Card, GeneralMonster, LinkMonster, PendulumMonster, MagicTrapCard, SkillCard
from apps.api.v1.card import choices


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    queryset = Card.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.CardFilter
    http_method_names = ['get', 'post', 'delete']


class CreateUpdateCardViewSet(APIView):
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    http_method_names = ['post', 'put']

    @staticmethod
    def post(request):
        try:

            try:
                Card.objects.get(serial_code=request.data['serial_code'])
                return responses.SERIAL_CODE_FOUND_ERROR
            except(Exception,):
                pass

            card_type = get_choices_inverted(choices.CARD_TYPE)[str(request.data['type']).lower()]
            card_subtype = get_choices_inverted(choices.CARD_SUBTYPE)[str(request.data['subtype']).lower()]
            invert_request_choices_values(request.data, card_type, card_subtype)

            if str(card_type).lower() == '4':
                serializer = CreateSkillCardSerializer(data=request.data)
            elif str(card_type).lower() in ['2', '3']:
                serializer = CreateMagicTrapCardSerializer(data=request.data)
            elif str(card_type).lower() in ['1', '5']:
                subtype_choices = dict(choices.CARD_SUBTYPE)
                card_subtype = subtype_choices[str(request.data['subtype'])]
                if 'pendulum' in str(card_subtype).lower():
                    serializer = CreatePendulumMonsterSerializer(data=request.data)
                elif 'link' in str(card_subtype).lower():
                    serializer = CreateLinkMonsterSerializer(data=request.data)
                else:
                    serializer = CreateGeneralMonsterSerializer(data=request.data)

            else:
                return responses.INVALID_TYPE
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

        except (Exception,) as ex:
            print(ex)
            return responses.GENERAL_ERROR

    @staticmethod
    def put(request, serial_code):
        try:

            if 'serial_code' in request.data:
                if serial_code != request.data['serial_code']:
                    return responses.SERIAL_CODE_ERROR

            card = Card.objects.get(serial_code=serial_code)
            card_type = card.type
            card_subtype = card.subtype
            invert_request_choices_values(request.data, card_type, card_subtype)

            if str(card_type).lower() == 'skill':
                card = SkillCard.objects.get(serial_code=serial_code)
                serializer = CreateSkillCardSerializer(card, data=request.data, partial=True)
            elif str(card_type).lower() in ['trap', 'spell']:
                card = MagicTrapCard.objects.get(serial_code=serial_code)
                serializer = CreateMagicTrapCardSerializer(card, data=request.data, partial=True)
            elif str(card_type).lower() in ['monster', 'token']:
                if 'pendulum' in str(card_subtype).lower():
                    pendulum_monster = PendulumMonster.objects.get(serial_code=serial_code)
                    serializer = CreatePendulumMonsterSerializer(pendulum_monster, data=request.data, partial=True)
                elif 'link' in str(card_subtype).lower():
                    link_monster = LinkMonster.objects.get(serial_code=serial_code)
                    serializer = CreateLinkMonsterSerializer(link_monster, data=request.data, partial=True)
                else:
                    monster = GeneralMonster.objects.get(serial_code=serial_code)
                    serializer = CreateGeneralMonsterSerializer(monster, data=request.data, partial=True)
            else:
                return responses.INVALID_TYPE

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
        except (Exception,) as ex:
            print(ex)
            return responses.GENERAL_ERROR


class IncreaseCardViewSet(viewsets.ModelViewSet):
    serializer_class = DecreaseIncreaseCardSerializer
    lookup_field = 'serial_code__iexact'
    queryset = Card.objects.all()
    http_method_names = ['get', ]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        type(instance).objects.filter(pk=instance.pk).update(
            amount=F('amount') + 1,
        )

        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)


class DecreaseCardViewSet(viewsets.ModelViewSet):
    serializer_class = DecreaseIncreaseCardSerializer
    lookup_field = 'serial_code__iexact'
    queryset = Card.objects.all()
    http_method_names = ['get', ]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        card = type(instance).objects.filter(pk=instance.pk)
        if card.first().amount > 0:
            card.update(amount=F('amount') - 1, )

        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)


class AmountCardViewSet(viewsets.ModelViewSet):
    serializer_class = AmountCardSerializer
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    queryset = Card.objects.all()
    http_method_names = ['get', ]


class InCollectionCardViewSet(viewsets.ModelViewSet):
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    serializer_class = InfoCardSerializer
    queryset = Card.objects.all()
    http_method_names = ['get', ]

    def retrieve(self, request, *args, **kwargs):
        serial_code = kwargs[self.lookup_field]
        card = self.get_serializer().Meta.model.objects.filter(serial_code=serial_code, state=True).first()
        if card:
            return Response(self.serializer_class(card).data, status=status.HTTP_200_OK)
        return Response({'detail': "Not Found"}, status=status.HTTP_200_OK)


class RepeatedByNameCardViewSet(APIView):
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    http_method_names = ['get', ]

    @staticmethod
    def get(request):
        card_numbers = list(Card.objects.filter().values_list('card_number', flat=True).distinct())
        card_numbers = list(set(card_numbers))

        response_card = []
        final_response = {'data': response_card}

        for card_number in card_numbers:
            card = Card.objects.filter(card_number=card_number)

            repeated = {
                'card_number': "",
                'name': "",
                'amount': 0
            }

            for query in card:
                iter_card = Card.objects.filter(serial_code=query.serial_code).first()

                repeated['card_number'] = iter_card.card_number
                repeated['name'] = iter_card.name
                repeated['amount'] += iter_card.amount

            if repeated['amount'] > 3:
                final_response['data'].append(repeated)

        return Response(final_response, status=status.HTTP_200_OK)


class TotalPricesCardViewSet(APIView):
    lookup_field = "serial_code__iexact"
    lookup_value_regex = '[^/]+'
    http_method_names = ['get', ]

    @staticmethod
    def get(request):
        fields = ['serial_code', 'amount']
        card_numbers = list(Card.objects.filter().values_list(*fields))

        s = requests.Session()
        total_price = 0.0
        data = {
            'data': total_price
        }
        for code in card_numbers:
            card_code = code[0]
            amount = code[1]
            print(card_code)

            url = f"https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode={card_code}"
            try:
                with s.get(url) as response:
                    response = response.json()
                    result = float(response['set_price']) * amount
                    data['data'] += result
            except (Exception,) as ex:
                print(ex)

        data['data'] = str(float("{:.2f}".format(data['data'])))
        print(data['data'])
        return Response(data, status=status.HTTP_200_OK)
