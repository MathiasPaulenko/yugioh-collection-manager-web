from django.urls import path

from apps.api.v1.card.api.views.race_viewsets import CardRacesListView

urlpatterns = [
    path('card_races', CardRacesListView.as_view(), name='card_races'),
]

