from django.contrib import admin
from apps.api.v1.card.models import (
    Type,
    Subtype,
    Race,
    MagicTrapRace,
    Attribute,
    Rarity,
    LinkMarker,
    GeneralMonster,
    LinkMonster,
    PendulumMonster,
    MagicTrapCard,
    Card,
    SkillCard, Monster,
)
from apps.api.v1.card.admin_resources import (
    TypeAdmin,
    SubtypeAdmin,
    RaceAdmin,
    MagicTrapRaceAdmin,
    AttributeAdmin,
    RarityAdmin,
    LinkMarkerAdmin,
    GeneralMonsterAdmin,
    LinkMonsterAdmin,
    PendulumMonsterAdmin,
    MagicTrapCardAdmin,
    CardAdmin,
    SkillCardAdmin, MonsterAdmin,
)

admin.site.register(Type, TypeAdmin)
admin.site.register(Subtype, SubtypeAdmin)
admin.site.register(Race, RaceAdmin)
admin.site.register(MagicTrapRace, MagicTrapRaceAdmin)
admin.site.register(Attribute, AttributeAdmin)
admin.site.register(Rarity, RarityAdmin)
admin.site.register(LinkMarker, LinkMarkerAdmin)
admin.site.register(GeneralMonster, GeneralMonsterAdmin)
admin.site.register(LinkMonster, LinkMonsterAdmin)
admin.site.register(PendulumMonster, PendulumMonsterAdmin)
admin.site.register(MagicTrapCard, MagicTrapCardAdmin)
admin.site.register(SkillCard, SkillCardAdmin)
admin.site.register(Card, CardAdmin)
admin.site.register(Monster, MonsterAdmin)
