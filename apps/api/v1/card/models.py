from django.db import models
from apps.api.v1.base.models import BaseModel
from apps.api.v1.card import choices


class Type(BaseModel):
    name = models.CharField(max_length=50, choices=choices.CARD_TYPE)

    class Meta:
        verbose_name = 'Type'
        verbose_name_plural = 'Types'

    def __str__(self):
        return self.get_name_display()


class Subtype(BaseModel):
    name = models.CharField(max_length=50, choices=choices.CARD_SUBTYPE)

    class Meta:
        verbose_name = 'Subtype'
        verbose_name_plural = 'Subtypes'

    def __str__(self):
        return self.get_name_display()


class Race(BaseModel):
    name = models.CharField(max_length=50, choices=choices.MONSTER_RACE)

    class Meta:
        verbose_name = 'Race'
        verbose_name_plural = 'Races'

    def __str__(self):
        return self.get_name_display()


class MagicTrapRace(BaseModel):
    name = models.CharField(max_length=50, choices=choices.MAGIC_TRAP_RACE)

    class Meta:
        verbose_name = 'Magic/Trap Race'
        verbose_name_plural = 'Magic/Trap Races'

    def __str__(self):
        return self.get_name_display()


class Attribute(BaseModel):
    name = models.CharField(max_length=50, choices=choices.CARD_ATTRIBUTE)

    class Meta:
        verbose_name = 'Attribute'
        verbose_name_plural = 'Attributes'

    def __str__(self):
        return self.get_name_display()


class Rarity(BaseModel):
    name = models.CharField(max_length=50, choices=choices.CARD_RARITY)

    class Meta:
        verbose_name = 'Rarity'
        verbose_name_plural = 'Rarities'

    def __str__(self):
        return self.get_name_display()


class LinkMarker(BaseModel):
    name = models.CharField(max_length=50, choices=choices.LINK_MARKERS, default=1)

    class Meta:
        verbose_name = 'Link Marker'
        verbose_name_plural = 'Link Markers'

    def __str__(self):
        return self.get_name_display()


class Card(BaseModel):
    serial_code = models.CharField('Serial Code', max_length=60, unique=True, blank=False, null=False)
    card_number = models.CharField('Card Number', max_length=60, unique=False, blank=False, null=False)
    name = models.CharField('Name', max_length=255, blank=False, null=False)
    set_name = models.CharField('Set Name', max_length=255, blank=True, null=True)
    edition = models.CharField("Edition", blank=True, max_length=80, default='')
    amount = models.IntegerField('Amount', default=0)
    img_code = models.CharField('Image Code', max_length=20, blank=True, null=True)
    format = models.CharField('Format', max_length=255, blank=True, null=True)
    note = models.CharField('Note', max_length=255, blank=True, null=True)
    banned = models.CharField('Banned', max_length=255, blank=True, null=True)
    language = models.CharField('language', max_length=255, blank=False, null=False, default='english')
    type: Type = models.ForeignKey(Type, related_name='type', on_delete=models.CASCADE, null=True)
    subtype: Subtype = models.ForeignKey(Subtype, related_name='subtype', on_delete=models.CASCADE, null=True)
    rarity: Rarity = models.ForeignKey(Rarity, related_name='rarity', on_delete=models.CASCADE, null=True, blank=True)

    @property
    def get_type_display(self):
        return self.type

    @property
    def get_subtype_display(self):
        return self.subtype

    @property
    def get_rarity_display(self):
        return self.rarity

    @property
    def rarity_name(self):
        return self.rarity.name

    @property
    def subtype_name(self):
        return self.subtype.name

    @property
    def type_name(self):
        return self.type.name

    class Meta:
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'
        ordering = ['card_number', 'serial_code', ]

    def __str__(self):
        return f"{self.serial_code}"


class Monster(Card):
    description = models.CharField('Description', max_length=2000, blank=False, null=False)
    attack = models.CharField("Attack", max_length=20)
    archetype = models.CharField('Archetype', max_length=250, blank=True, null=True)

    race: Race = models.ForeignKey(Race, related_name='monster_race', on_delete=models.CASCADE, null=True)
    attribute: Attribute = models.ForeignKey(Attribute, related_name='attribute', on_delete=models.CASCADE, null=True)

    @property
    def get_race_display(self):
        return self.race

    @property
    def get_attribute_display(self):
        return self.attribute

    @property
    def race_name(self):
        return self.race.name

    @property
    def attribute_name(self):
        return self.attribute.name

    class Meta:
        verbose_name = 'Monster'
        verbose_name_plural = 'Monsters'

    def __str__(self):
        return f"{self.name}"


class SkillCard(Card):
    description = models.CharField('Description', max_length=1000, blank=False, null=False)
    race: Race = models.CharField('Race', max_length=250, blank=False, null=False)

    class Meta:
        verbose_name = 'Skill Card'
        verbose_name_plural = 'Skill Cards'

    def __str__(self):
        return f"{self.name}"


class MagicTrapCard(Card):
    description = models.CharField('Description', max_length=1000, blank=False, null=False)
    race: Race = models.ForeignKey(MagicTrapRace, related_name='magic_trap_race', on_delete=models.CASCADE)
    archetype = models.CharField('Archetype', max_length=250, blank=True, null=True)

    @property
    def race_name(self):
        return self.race.name

    @property
    def get_race_display(self):
        return self.race

    class Meta:
        verbose_name = 'Magic/Trap Card'
        verbose_name_plural = 'Magic/Trap Cards'

    def __str__(self):
        return f"{self.name}"


class GeneralMonster(Monster):
    defence = models.CharField("Defence", max_length=20)
    level = models.CharField("Level/Rank", max_length=20, blank=True, null=True)

    class Meta:
        verbose_name = 'General Monster'
        verbose_name_plural = 'General Monster'

    def __str__(self):
        return f"{self.name}"


class LinkMonster(Monster):
    link_value = models.IntegerField('Link Value')
    link_markers: LinkMarker = models.ManyToManyField(LinkMarker, related_name='link_markers')

    class Meta:
        verbose_name = 'Link Monster'
        verbose_name_plural = 'Link Monsters'

    def __str__(self):
        return f"{self.name}"


class PendulumMonster(Monster):
    scale = models.IntegerField('Scale')
    defence = models.CharField("Defence", max_length=20)
    level = models.CharField("Level/Rank", max_length=20, blank=True, null=True)

    class Meta:
        verbose_name = 'Pendulum Monster'
        verbose_name_plural = 'Pendulum Monsters'

    def __str__(self):
        return f"{self.name}"
