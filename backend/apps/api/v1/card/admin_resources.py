from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

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
    SkillCard,
    Monster
)

general_fields = [
    'card_number',
    'serial_code',
    'name',
    'description',
    'type',
    'subtype',
    'race',
    'rarity',
    'edition',
    'set_name',
    'img_code',
    'amount',
]


class TypeResources(resources.ModelResource):
    class Meta:
        model = Type


class TypeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['id', 'get_name_display', 'state']
    ordering = ('id',)
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = TypeResources


class SubtypeResources(resources.ModelResource):
    class Meta:
        model = Subtype


class SubtypeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    ordering = ('id',)
    list_display = ['id', 'get_name_display', 'state', ]
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = SubtypeResources


class RaceResources(resources.ModelResource):
    class Meta:
        model = Race


class RaceAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['id', 'get_name_display', 'state', ]
    ordering = ('id',)
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = RaceResources


class MagicTrapRaceResources(resources.ModelResource):
    class Meta:
        model = MagicTrapRace


class MagicTrapRaceAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    ordering = ('id',)
    list_display = ['id', 'get_name_display', 'state', ]
    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = MagicTrapRaceResources


class AttributeResources(resources.ModelResource):
    class Meta:
        model = Attribute


class AttributeAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    ordering = ('id',)
    list_display = ['id', 'get_name_display', 'state', ]
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = AttributeResources


class RarityResources(resources.ModelResource):
    class Meta:
        model = Rarity


class RarityAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['id', 'get_name_display', 'state', ]
    ordering = ('id',)
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = RarityResources


class LinkMarkerResources(resources.ModelResource):
    class Meta:
        model = LinkMarker


class LinkMarkerAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['id', 'get_name_display', 'state', ]
    ordering = ('id',)
    exclude = (
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = LinkMarkerResources


class GeneralMonsterResources(resources.ModelResource):
    class Meta:
        model = GeneralMonster


class GeneralMonsterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
        'archetype',
    ]

    list_display = general_fields + ['attack', 'defence', 'archetype']

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = GeneralMonsterResources


class LinkMonsterResources(resources.ModelResource):
    class Meta:
        model = LinkMonster


class LinkMonsterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
        'archetype',
    ]

    list_display = general_fields + ['link_value', 'get_link_markers', 'attack', 'archetype']

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = LinkMonsterResources

    @staticmethod
    def get_link_markers(obj):
        return [lk.get_name_display() for lk in obj.link_markers.all()]


class PendulumMonsterResources(resources.ModelResource):
    class Meta:
        model = PendulumMonster


class PendulumMonsterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
        'archetype',
    ]

    list_display = general_fields + ['scale', 'defence', 'attack', 'defence', 'level', 'archetype']

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = PendulumMonster


class MagicTrapCardResources(resources.ModelResource):
    class Meta:
        model = MagicTrapCard


class MagicTrapCardAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
    ]

    list_display = general_fields + ['archetype']

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = MagicTrapCardResources


class CardResources(resources.ModelResource):
    class Meta:
        model = Card


class CardAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
    ]

    list_display = [
        'card_number',
        'serial_code',
        'name',
        'amount',
        'type',
        'subtype',
        'rarity',
    ]

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = CardResources


class SkillCardResources(resources.ModelResource):
    class Meta:
        model = SkillCard


class SkillCardAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
    ]

    list_display = general_fields

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = SkillCardResources


class MonsterResources(resources.ModelResource):
    class Meta:
        model = Monster


class MonsterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = [
        'name',
        'description',
        'card_number',
        'serial_code',
        'archetype',
    ]

    list_display = general_fields

    exclude = (
        'state',
        'created_date',
        'modified_date',
        'deleted_date',
    )
    resource_class = MonsterResources
