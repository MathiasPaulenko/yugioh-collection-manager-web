from rest_framework.routers import DefaultRouter

from apps.api.v1.collection.views.card_viewsets import (
    CardViewSet,
    IncreaseCardViewSet,
    DecreaseCardViewSet,
    AmountCardViewSet,
    InCollectionCardViewSet,
)

router = DefaultRouter()
router.register(r'card', CardViewSet, basename='card')
router.register(r'increase', IncreaseCardViewSet, basename='increase')
router.register(r'decrease', DecreaseCardViewSet, basename='decrease')
router.register(r'amount', AmountCardViewSet, basename='amount')
router.register(r'incollection', InCollectionCardViewSet, basename='incollection')

urlpatterns = router.urls
