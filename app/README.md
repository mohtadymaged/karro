# Karro — Community Marketplace

El Gouna's resident-only marketplace, built as a React app rendered inside an iOS
device frame. This is the production implementation of the `Copy of app` prototype
(see `../project/` and the `../chats/` transcripts for the design history).

## What it is

A single-page React app with in-app state navigation (no router). The whole
experience lives inside an iPhone frame (`ios-frame.jsx`):

- **Landing → Sign In / Register** auth flow (marina hero, frosted-glass panels,
  4-step registration with ID verification)
- **5-tab shell** — Home, Market, Auctions, Sell, Profile
- **Item detail** with photo carousel, seller card, in-page chat, make-an-offer
- **Auctions** with a live bid ticker and bid/submit flows
- **Seller profiles**, reviews, seller dashboard, settings, dark mode
- The **Karro brand identity** — Lagoon / Coral / Deep Water palette, Baloo
  Bhaijaan 2 + Rubik type, the cart logo mark (see
  `../project/uploads/karro-brand-identity.html`)

## Tech

- React 18 + Vite (real ES modules and a production build step)
- No CSS framework — styling is inline + one injected stylesheet (`CSS` in `data.js`)
- Icons are inline SVG stand-ins (`icons.jsx`), no icon dependency

This was ported from the original browser-Babel prototype: the in-browser JSX
transpilation and `window` globals were replaced with a real build and
`import`/`export`, with **no change to the visual design**.

## Run

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Layout

```
src/
  main.jsx          # entry — mounts <StagedApp/> (device frame + root routing)
  app-core.jsx      # MarketplaceApp — the 5-tab shell + nav back-stack
  ios-frame.jsx     # iOS 26 device frame (status bar, island, home indicator)
  data.js           # palette CSS, categories, listings, auctions, sellers, reviews
  icons.jsx         # inline SVG icon set
  shared.jsx        # Logo, Stars, Particles, Confetti, ItemImage, BottomNav, …
  auth.jsx          # Landing, Sign In, Register, Forgot-password
  pages-home.jsx    # Home feed + notifications sheet
  pages-market.jsx  # Market browse + category pages
  page-item.jsx     # Item detail + chat + offer
  page-sell.jsx     # Sell / auction submission sheet
  pages-auctions.jsx# Auctions + live bidding
  pages-sellers.jsx # Seller directory + profile
  pages-settings.jsx# Settings + seller dashboard
  pages-profile.jsx # Profile, edit, purchases, favorites, avatar picker
public/uploads/     # local image assets (auth hero photo, etc.)
```

## Notes

- Listing photos load from Unsplash; each falls back to an emoji glyph
  (`ItemImage`) if a photo fails to load.
- State is session-only (new listings, saved items, theme via `localStorage`) —
  there is no backend.
