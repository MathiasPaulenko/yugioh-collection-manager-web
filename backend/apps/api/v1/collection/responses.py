from rest_framework.response import Response
from rest_framework import status

INVALID_TYPE = Response(
    {'detail': 'invalid card type.'},
    status=status.HTTP_400_BAD_REQUEST
)

GENERAL_ERROR = Response(
    {'detail': 'an unexpected error has occurred'},
    status=status.HTTP_500_INTERNAL_SERVER_ERROR
)

SERIAL_CODE_ERROR = Response(
    {'detail': 'you do not have permissions to modify the serial_code'},
    status=status.HTTP_403_FORBIDDEN
)

SERIAL_CODE_FOUND_ERROR = Response(
    {'detail': 'a card with the serial code was found'},
    status=status.HTTP_400_BAD_REQUEST
)
