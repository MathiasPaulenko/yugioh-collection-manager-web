# Database

## Overview

The database is a PostgreSQL instance named `yugioh` running on port 5432. The schema is managed by Django ORM migrations and tracked by `simple_history` for audit logging.

A full schema dump (structure only, no data) is available at `db/schema.sql`. To regenerate it:

```bash
cd backend
python manage.py export_schema
```

To replicate the database from scratch:

```bash
createdb yugioh
psql -U postgres -d yugioh -f db/schema.sql
```

## BaseModel

All models inherit from `BaseModel` (`apps/api/v1/base/models.py`):

| Field | Type | Description |
|---|---|---|
| `id` | AutoField (PK) | Auto-incrementing primary key |
| `state` | BooleanField | Soft-delete flag (default: `True`) |
| `created_date` | DateField | Set on creation (`auto_now_add`) |
| `modified_date` | DateField | Updated on save (`auto_now`) |
| `deleted_date` | DateField | Updated on save (`auto_now`) |
| `historical` | HistoricalRecords | Audit log via `simple_history` |

## Model Hierarchy

```
BaseModel (abstract)
├── Type              # Card type (Monster, Spell, Trap, etc.)
├── Subtype           # Card subtype (Normal, Fusion, Synchro, etc.)
├── Race              # Monster race (Dragon, Spellcaster, etc.)
├── MagicTrapRace     # Magic/Trap race (Normal, Continuous, etc.)
├── Attribute         # Monster attribute (Dark, Light, etc.)
├── Rarity            # Card rarity (Common, Rare, Ultra Rare, etc.)
├── LinkMarker        # Link arrow positions (Top, Bottom, etc.)
└── Card              # Base card model
    ├── Monster
    │   ├── GeneralMonster    # Normal/Synchro/XYZ/Ritual/Fusion
    │   ├── LinkMonster       # Link monsters (has link_markers M2M)
    │   └── PendulumMonster   # Pendulum monsters (has scale)
    ├── SkillCard             # Skill cards
    └── MagicTrapCard         # Spell/Trap cards
```

## Tables

### `card_card` (base card table)

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | integer | NO | auto | Primary key |
| `state` | boolean | NO | true | Soft-delete flag |
| `created_date` | date | NO | auto | Creation date |
| `modified_date` | date | NO | auto | Last modification date |
| `deleted_date` | date | NO | auto | Deletion date |
| `serial_code` | varchar(60) | NO | — | Unique card identifier (e.g. `SDCB-EN001`) |
| `card_number` | varchar(60) | NO | — | Card number within set (indexed) |
| `name` | varchar(255) | NO | — | Card name (indexed) |
| `set_name` | varchar(255) | YES | NULL | Set name (free text) |
| `edition` | varchar(80) | NO | `''` | Edition (1st, Unlimited, etc.) |
| `amount` | integer | NO | 0 | Quantity in collection |
| `img_code` | varchar(20) | YES | NULL | Image code for YGOProDeck |
| `format` | varchar(255) | YES | NULL | Format (TCG, OCG, etc.) |
| `note` | varchar(255) | YES | NULL | User notes |
| `banned` | varchar(255) | YES | NULL | Banlist status |
| `language` | varchar(255) | NO | `'english'` | Card language |
| `rarity_id` | integer | YES | NULL | FK → `card_rarity.id` |
| `subtype_id` | integer | YES | NULL | FK → `card_subtype.id` |
| `type_id` | integer | YES | NULL | FK → `card_type.id` |

**Indexes**: `serial_code` (unique), `card_number`, `name`
**Foreign keys**: `rarity_id` → `card_rarity`, `subtype_id` → `card_subtype`, `type_id` → `card_type`

### `card_monster` (extends Card)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `card_ptr_id` | integer | NO | PK, FK → `card_card.id` |
| `description` | varchar(2000) | NO | Card effect/description |
| `attack` | varchar(20) | NO | Attack value |
| `archetype` | varchar(250) | YES | Archetype name |
| `race_id` | integer | YES | FK → `card_race.id` |
| `attribute_id` | integer | YES | FK → `card_attribute.id` |

### `card_generalmonster` (extends Monster)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `monster_ptr_id` | integer | NO | PK, FK → `card_monster.card_ptr_id` |
| `defence` | varchar(20) | NO | Defence value |
| `level` | varchar(20) | YES | Level or Rank |

### `card_linkmonster` (extends Monster)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `monster_ptr_id` | integer | NO | PK, FK → `card_monster.card_ptr_id` |
| `link_value` | integer | NO | Link rating (1-4) |

**M2M**: `link_markers` → `card_linkmarker` (through `card_linkmonster_link_markers`)

### `card_pendulummonster` (extends Monster)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `monster_ptr_id` | integer | NO | PK, FK → `card_monster.card_ptr_id` |
| `scale` | integer | NO | Pendulum scale value |
| `defence` | varchar(20) | NO | Defence value |
| `level` | varchar(20) | YES | Level or Rank |

### `card_magictrapcard` (extends Card)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `card_ptr_id` | integer | NO | PK, FK → `card_card.id` |
| `description` | varchar(1000) | NO | Card effect |
| `race_id` | integer | NO | FK → `card_magictraprace.id` |
| `archetype` | varchar(250) | YES | Archetype name |

### `card_skillcard` (extends Card)

| Column | Type | Nullable | Description |
|---|---|---|---|
| `card_ptr_id` | integer | NO | PK, FK → `card_card.id` |
| `description` | varchar(1000) | NO | Skill description |
| `race` | varchar(250) | NO | Race (stored as text, not FK) |

### Metadata tables

| Table | Columns | Description |
|---|---|---|
| `card_type` | id, state, dates, `name` (varchar 50) | Card types: Monster, Spell, Trap, Skill, Token |
| `card_subtype` | id, state, dates, `name` (varchar 50) | Subtypes: Normal, Fusion, Synchro, XYZ, Link, Pendulum, Ritual, etc. |
| `card_race` | id, state, dates, `name` (varchar 50) | Monster races: Dragon, Spellcaster, Warrior, etc. |
| `card_magictraprace` | id, state, dates, `name` (varchar 50) | Magic/Trap races: Normal, Continuous, Equip, Field, etc. |
| `card_attribute` | id, state, dates, `name` (varchar 50) | Attributes: Dark, Light, Earth, Water, Fire, Wind, Divine |
| `card_rarity` | id, state, dates, `name` (varchar 50) | Rarities: Common, Rare, Super Rare, Ultra Rare, Secret Rare, etc. |
| `card_linkmarker` | id, state, dates, `name` (varchar 50) | Link markers: Top, Bottom, Left, Right, Top-Left, etc. |

### Django framework tables

| Table | Purpose |
|---|---|
| `auth_user` | Django auth users |
| `auth_group` | Django auth groups |
| `auth_group_permissions` | Group-permission M2M |
| `auth_permission` | Django permissions |
| `auth_user_groups` | User-group M2M |
| `auth_user_user_permissions` | User-permission M2M |
| `django_admin_log` | Admin action log |
| `django_content_type` | Content types |
| `django_migrations` | Migration records |
| `django_session` | Session data |

### Historical tables

`simple_history` creates a `card_historical*` table for each model. These tables track all changes to records with:

| Column | Description |
|---|---|
| `history_id` | Auto-incrementing PK |
| `history_date` | When the change occurred |
| `history_change_reason` | Optional reason |
| `history_type` | `+` (created), `~` (modified), `-` (deleted) |
| `history_user_id` | FK → `auth_user.id` |

Historical tables: `card_historicalcard`, `card_historicalmonster`, `card_historicalgeneralmonster`, `card_historicallinkmonster`, `card_historicalpendulummonster`, `card_historicalmagictrapcard`, `card_historicalskillcard`, `card_historicalattribute`, `card_historicalrace`, `card_historicalmagictraprace`, `card_historicalrarity`, `card_historicalsubtype`, `card_historicaltype`, `card_historicallinkmarker`

## Entity Relationship

```
card_type ──┐
            │
card_subtype ┤
            │
card_rarity ─┤
            │
            ▼
        card_card ──────────────────────────
        │     │     │                       │
        │     │     └── card_magictrapcard  │
        │     │           │                  │
        │     │           └── card_magictraprace
        │     │
        │     └── card_skillcard
        │
        └── card_monster
                │   │   │
                │   │   ├── card_attribute
                │   │   ├── card_race
                │   │   │
                │   │   ├── card_generalmonster
                │   │   ├── card_linkmonster ── card_linkmarker (M2M)
                │   │   └── card_pendulummonster
                │
                └── (inherits all card_card fields)
```

## Choices

Defined in `backend/apps/api/v1/card/choices.py`:

| Choice set | Count | Examples |
|---|---|---|
| `CARD_TYPE` | 6 | Monster, Spell, Trap, Skill, Token |
| `CARD_SUBTYPE` | 29 | Normal, Fusion, Synchro, XYZ, Link, Pendulum, Ritual, etc. |
| `MONSTER_RACE` | 25 | Dragon, Spellcaster, Warrior, Zombie, Fiend, etc. |
| `MAGIC_TRAP_RACE` | 7 | Normal, Continuous, Equip, Field, Quick-Play, Ritual, Trap |
| `CARD_ATTRIBUTE` | 7 | Dark, Light, Earth, Water, Fire, Wind, Divine |
| `CARD_RARITY` | 16 | Common, Rare, Super Rare, Ultra Rare, Secret Rare, etc. |
| `LINK_MARKERS` | 8 | Top, Bottom, Left, Right, Top-Left, Top-Right, Bottom-Left, Bottom-Right |
