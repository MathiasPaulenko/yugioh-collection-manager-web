from rest_framework.routers import DefaultRouter

from apps.api.v1.card.api.views.attribute_viewsets import AttributeViewSet
from apps.api.v1.card.api.views.general_monster_viewsets import GeneralMonsterViewSet
from apps.api.v1.card.api.views.info_card_viewsets import InfoCardViewSet
from apps.api.v1.card.api.views.link_marker_viewsets import LinkMarkerViewSet
from apps.api.v1.card.api.views.magictraprace_viewsets import MagicTrapRaceViewSet
from apps.api.v1.card.api.views.race_viewsets import RaceViewSet
from apps.api.v1.card.api.views.rarity_viewsets import RarityViewSet
from apps.api.v1.card.api.views.subtype_viewsets import SubtypeViewSet
from apps.api.v1.card.api.views.type_viewsets import TypeViewSet

router = DefaultRouter()
router.register(r'card', InfoCardViewSet, basename='card')
router.register(r'attribute', AttributeViewSet, basename='attribute')
router.register(r'link_markers', LinkMarkerViewSet, basename='link_markers')
router.register(r'magic_trap_race', MagicTrapRaceViewSet, basename='magic_trap_race')
router.register(r'race', RaceViewSet, basename='race')
router.register(r'rarity', RarityViewSet, basename='rarity')
router.register(r'subtype', SubtypeViewSet, basename='subtype')
router.register(r'types', TypeViewSet, basename='types')


router.register(r'general_monster', GeneralMonsterViewSet, basename='general_monster')


urlpatterns = router.urls
