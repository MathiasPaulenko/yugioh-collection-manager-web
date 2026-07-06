# Roadmap

## Bugs

- [ ] Fix add card functionality
- [ ] Fix card front detail view (`/card/:serial_code`)
- [ ] Fix progress bar in cardset list (`/cardsetlist`) — not filling based on cards in collection
- [ ] Fix `coolstuffinc_price` bug in `CardPrices.js` — uses `amazon_price` instead of `coolstuffinc_price`
- [ ] Fix N+1 fetch in `CardSetList.js` — individual API call per card for collection status

## Improvements

- [ ] Improve overall frontend design
- [ ] Optimize backend third-party API calls (YGOProDeck) — cache responses, reduce N+1, avoid redundant fetches
- [ ] Responsive design — optimize grids and layouts for mobile
- [ ] Search by partial name — `/search_card` and `/prices` require exact card name
- [ ] Add search/filter to `/cardsetlist` — ~400 sets with no search bar
- [ ] Consistent pagination across all screens — some screens paginate, others don't (e.g. `/archetypes_list`)
- [ ] Error handling — several hooks silently catch errors without user feedback
