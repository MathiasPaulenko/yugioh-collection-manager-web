# Architecture

## Overview

Yu-Gi-Oh! Card Collection Manager is a local web application for managing Yu-Gi-Oh! card collections. It follows a classic client-server architecture with a decoupled frontend and backend.

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│                   React SPA (:3000)                      │
├─────────────────────────────────────────────────────────┤
│              React Router 6 (BrowserRouter)              │
│  ┌───────────┐  ┌───────────┐  ┌───────────────────┐   │
│  │  Screens  │  │  Hooks    │  │  Common Components│   │
│  │  (pages)  │  │  (fetch)  │  │  (Navbar, etc)    │   │
│  └─────┬─────┘  └─────┬─────┘  └───────────────────┘   │
│        │              │                                  │
│        └──────────────┤                                  │
│                       ▼                                  │
│              ┌────────────────┐                          │
│              │  helpers/       │                          │
│              │  constants.js   │                          │
│              │  utils.js       │                          │
│              └────────┬───────┘                          │
├───────────────────────┼─────────────────────────────────┤
│                       │  HTTP / REST                     │
├───────────────────────▼─────────────────────────────────┤
│                  Django REST API (:8000)                 │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  card    │  │  collection  │  │  dashboard       │   │
│  │  (info)  │  │  (CRUD)      │  │  (analytics)     │   │
│  └────┬─────┘  └──────┬───────┘  └────────┬─────────┘   │
│       │               │                    │              │
│       └───────────────┼────────────────────┘              │
│                       ▼                                   │
│              ┌────────────────┐                           │
│              │  PostgreSQL    │                           │
│              │  (yugioh db)   │                           │
│              └────────────────┘                           │
├─────────────────────────────────────────────────────────┤
│              External APIs (YGOProDeck)                  │
│  ┌────────────────┐  ┌───────────────┐  ┌────────────┐  │
│  │  Card info     │  │  Card sets    │  │  Images    │  │
│  │  /api/v7/      │  │  /api/v7/     │  │  /images/  │  │
│  │  cardinfo      │  │  cardsets     │  │  cards/    │  │
│  └────────────────┘  └───────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Backend

### Stack

- **Framework**: Django 4.x + Django REST Framework 3.13-3.14
- **Database**: PostgreSQL (`yugioh`, port 5432, user `postgres`)
- **Settings**: Split into `settings/base.py` (shared) and `settings/local.py` (environment-specific)
- **Entry point**: `backend/manage.py` → `yugioh-backend.settings.local`
- **Port**: 8000

### Third-party packages

| Package | Purpose |
|---|---|
| `drf-yasg` | Swagger/OpenAPI documentation (`/swagger/`, `/redoc/`) |
| `simple_history` | Model history tracking (audit log) |
| `import_export` | CSV/XLS import/export |
| `corsheaders` | CORS support for frontend |
| `django_filters` | DRF filtering (`DjangoFilterBackend`) |

### Apps

All apps live under `backend/apps/api/v1/`:

#### `base`
- Abstract `BaseModel` with `id`, `state`, `created_date`, `modified_date`, `deleted_date`, and `historical` (via `simple_history`)
- `StandardResultsSetPagination` — page_size=60, params: `offset` (page number), `limit` (page size)

#### `card`
- Card metadata models and read-only info endpoints
- URL prefix: `/info/`
- Routers: `card`, `attribute`, `link_markers`, `magic_trap_race`, `race`, `rarity`, `subtype`, `types`, `general_monster`

#### `collection`
- Collection CRUD operations
- URL prefix: `/collection/`
- Endpoints: `create`, `create/<serial_code>/`, `repeated`, `total_price`
- ViewSets: `CardViewSet` (ModelViewSet), `IncreaseCardViewSet`, `DecreaseCardViewSet`, `AmountCardViewSet`, `InCollectionCardViewSet`
- Filters: `CardFilter` (DjangoFilterBackend) — filters by `serial_code`, `card_number`, `name`, `set_name`, `game_format`, `banned`, `language`

#### `dashboard`
- Analytics endpoints
- URL prefix: `/dashboard/`
- Endpoints: `total_cards`, `total_type_cards`, `total_subtype_cards`, `total_rarity_cards`, `total_monster_att_cards`, `total_monster_race_cards`, `total_spell_trap_race_cards`

### API URL structure

```
http://127.0.0.1:8000/
├── admin/              # Django admin
├── swagger/            # Swagger UI
├── redoc/              # ReDoc UI
├── collection/         # Collection CRUD
│   ├── ?name=...       # Filter by name (icontains)
│   ├── ?serial_code=...# Filter by serial code (icontains)
│   ├── ?card_number=...# Filter by card number (icontains)
│   ├── ?set_name=...   # Filter by set name (icontains)
│   ├── create/         # POST - create card
│   ├── repeated/       # GET - repeated cards (amount > 3)
│   ├── total_price/    # GET - total collection price
│   └── incollection/<serial_code>/  # GET - check if in collection
├── info/               # Card metadata
│   ├── card/
│   ├── attribute/
│   ├── race/
│   ├── rarity/
│   ├── subtype/
│   ├── types/
│   ├── link_markers/
│   ├── magic_trap_race/
│   └── general_monster/
└── dashboard/          # Analytics
    ├── total_cards/
    ├── total_type_cards/
    └── ...
```

### Pagination

All list endpoints use `StandardResultsSetPagination`:
- `offset` — page number (default: 1)
- `limit` — page size (default: 60, max: 5000)
- Response shape: `{ count, next, previous, page_size, data }`

### Caching

- Backend uses `LocMemCache` with 60s timeout
- `CardViewSet.list()` caches non-search queries (queries without `name`, `serial_code`, `card_number`, `archetype`, `description`)

## Frontend

### Stack

- **Framework**: React 17 (CRA / react-scripts 5)
- **Router**: React Router 6 (BrowserRouter)
- **UI**: Bootstrap 5 + React-Bootstrap 5 + MUI 5
- **Icons**: react-icons (FontAwesome)
- **Images**: react-lazy-load-image-component
- **Charts**: Victory
- **Selects**: react-select
- **Port**: 3000

### Structure

```
frontend/src/
├── YugiohApp.js              # Root component
├── routers/
│   ├── AppRouter.js          # BrowserRouter wrapper
│   └── MainRoutes.js         # All route definitions
├── components/
│   ├── screens/              # Page components
│   │   ├── CollectionsScreen.js
│   │   ├── Dashboard.js
│   │   ├── CardScreen.js
│   │   ├── CardSetScreen.js
│   │   ├── CardSetListScreen.js
│   │   ├── PricesScreen.js
│   │   ├── FiltersScreen.js
│   │   ├── Repeated.js
│   │   ├── BanlistScreen.js
│   │   ├── StapleScreen.js
│   │   ├── SearchCardScreen.js
│   │   ├── ArchetypesListScreen.js
│   │   ├── ArchetypeCardsScreen.js
│   │   ├── UpdateCard.js
│   │   └── AddCard/          # Add card by type
│   │       ├── AddCardScreen.js
│   │       ├── NormalAddCardScreen.js
│   │       ├── FusionAddCardScreen.js
│   │       ├── SynchroAddCardScreen.js
│   │       ├── XYZAddCardScreen.js
│   │       ├── LinkAddCardScreen.js
│   │       ├── TrapAddCardScreen.js
│   │       ├── SpellAddCardScreen.js
│   │       ├── SkillAddCardScreen.js
│   │       ├── TokenAddCardScreen.js
│   │       ├── PendulumAddCardScreen.js
│   │       └── RitualAddCardScreen.js
│   └── common/               # Shared components
│       ├── Navbar.js
│       ├── Footer.js
│       ├── Loading.js
│       ├── Title.js
│       ├── ReturnButton.js
│       ├── ScrollTopArrow.js
│       ├── card/             # Card-related components
│       │   ├── CardSetList.js
│       │   └── CardPrices.js
│       └── search/
│           └── SearchCard.js
├── hooks/                    # Custom React hooks
│   ├── useCard.js            # Generic fetch hook
│   ├── useCardset.js         # Card set fetch hook
│   ├── useCardSearch.js      # Card search hook
│   ├── usePrices.js          # Price fetch hook
│   ├── useAddCard.js         # Add card form hook
│   ├── useFilterCard.js      # Filter hook
│   └── useForm.js            # Form input handler
├── helpers/
│   ├── constants.js          # API URLs and constants
│   └── utils.js              # Utility functions
└── statics/
    └── css/
        └── main.css          # Global styles
```

### Routes

| Route | Component | Description |
|---|---|---|
| `/` | `CollectionsScreen` | Main collection view |
| `/collections` | `CollectionsScreen` | Same as `/` |
| `/dashboard` | `Dashboard` | Analytics dashboard |
| `/filters` | `FiltersScreen` | Filter collection |
| `/card/:serial_code` | `CardScreen` | Card detail |
| `/card/update/:serial_code` | `UpdateCard` | Edit card |
| `/repeated` | `Repeated` | Repeated cards (amount > 3) |
| `/prices` | `PricesScreen` | Card prices |
| `/cardset` | `CardSetScreen` | Cards in a set |
| `/cardsetlist` | `CardSetListScreen` | All card sets |
| `/banlist` | `BanlistScreen` | Banlist |
| `/staples` | `StapleScreen` | Staple cards |
| `/search_card` | `SearchCardScreen` | Search cards |
| `/archetypes_list` | `ArchetypesListScreen` | All archetypes |
| `/archetype_cards` | `ArchetypeCardsScreen` | Cards by archetype |
| `/add` | `AddCardScreen` | Add card type selector |
| `/add/normal` | `NormalAddCardScreen` | Add normal monster |
| `/add/fusion` | `FusionAddCardScreen` | Add fusion monster |
| `/add/synchro` | `SynchroAddCardScreen` | Add synchro monster |
| `/add/xyz` | `XYZAddCardScreen` | Add XYZ monster |
| `/add/link` | `LinkAddCardScreen` | Add link monster |
| `/add/pendulum` | `PendulumAddCardScreen` | Add pendulum monster |
| `/add/ritual` | `RitualAddCardScreen` | Add ritual monster |
| `/add/trap` | `TrapAddCardScreen` | Add trap card |
| `/add/spell` | `SpellAddCardScreen` | Add spell card |
| `/add/skill` | `SkillAddCardScreen` | Add skill card |
| `/add/token` | `TokenAddCardScreen` | Add token card |

### Hooks

| Hook | Purpose |
|---|---|
| `useCard(url)` | Generic fetch hook — returns `{ data, loading, error }` |
| `useCardset(url, q)` | Fetch card set data from YGOProDeck API |
| `useCardSearch(url)` | Search cards |
| `usePrices(url)` | Fetch card prices from YGOProDeck API |
| `useAddCard(initialState)` | Add card form state management |
| `useFilterCard()` | Filter card state |
| `useForm(initialState)` | Form input handler — returns `{ formValues, handleInputChange }` |

### External APIs

| API | URL | Purpose |
|---|---|---|
| YGOProDeck Card Info | `https://db.ygoprodeck.com/api/v7/cardinfo.php` | Card data |
| YGOProDeck Card Sets | `https://db.ygoprodeck.com/api/v7/cardsets.php` | Set list |
| YGOProDeck Images | `https://images.ygoprodeck.com/images/cards/` | Card images |
| YGOProDeck Set Images | `https://images.ygoprodeck.com/images/sets/` | Set images |
| Exchange Rate API | `https://api.exchangerate-api.com/v4/latest/USD` | USD to EUR conversion |

## Project Structure

```
yugioh-collection-manager-web/
├── backend/                 # Django REST API
│   ├── manage.py
│   ├── yugioh-backend/      # Django project settings
│   │   ├── settings/
│   │   │   ├── base.py      # Shared settings
│   │   │   └── local.py     # Local dev settings (DB, cache)
│   │   └── urls.py          # Root URL configuration
│   ├── apps/api/v1/
│   │   ├── base/            # Abstract models, pagination
│   │   ├── card/            # Card metadata models & endpoints
│   │   ├── collection/      # Collection CRUD
│   │   └── dashboard/       # Analytics
│   └── venv/                # Python virtual environment
├── frontend/                # React SPA
│   ├── src/
│   ├── public/
│   └── package.json
├── db/
│   ├── data/                # XLS reference exports
│   └── schema.sql           # Database schema (structure only)
├── docs/
│   └── design/              # Design resources (PSD, PNG)
├── dev.sh                   # Dev startup script
├── Makefile                 # Dev commands
└── ROADMAP.md               # Pending tasks
```
