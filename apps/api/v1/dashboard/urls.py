from django.urls import path

from apps.api.v1.dashboard.views.dashboard_viewsets import (
    TotalTypeCardViewSet,
    TotalSubtypeCardViewSet,
    TotalRarityCardViewSet,
    TotalMonsterAttributeCardViewSet,
    TotalMonsterRaceCardViewSet,
    TotalTrapSpellRaceCardViewSet,
    TotalCardViewSet
)

urlpatterns = [
    path('total_cards', TotalCardViewSet.as_view(), name='total_cards'),
    path('total_type_cards', TotalTypeCardViewSet.as_view(), name='total_type_cards'),
    path('total_subtype_cards', TotalSubtypeCardViewSet.as_view(), name='total_subtype_cards'),
    path('total_rarity_cards', TotalRarityCardViewSet.as_view(), name='total_rarity_cards'),
    path('total_monster_att_cards', TotalMonsterAttributeCardViewSet.as_view(), name='total_monster_att_cards'),
    path('total_monster_race_cards', TotalMonsterRaceCardViewSet.as_view(), name='total_monster_race_cards'),
    path('total_spell_trap_race_cards', TotalTrapSpellRaceCardViewSet.as_view(), name='total_spell_trap_race_cards'),

]
