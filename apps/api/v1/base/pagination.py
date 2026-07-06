from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsSetPagination(PageNumberPagination):
    page_query_param = "offset"  # this is the "page"
    page_size_query_param = "limit"  # this is the "page_size"
    max_page_size = 5000
    page_size = 120

    def get_paginated_response(self, data):
        return Response(
            {
                'count': self.page.paginator.count,
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'page_size': self.page_size,
                'data': data

            }
        )
