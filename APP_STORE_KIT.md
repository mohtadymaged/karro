# Karro — App Store Submission Kit

Everything here is ready to paste into App Store Connect once the Apple
Developer account exists. Items marked ⚠️ need a real value from you first.

---

## 1. App Information

| Field | Value |
|---|---|
| Name | **Karro — El Gouna Marketplace** |
| Subtitle (30 chars) | `Buy & sell with your neighbours` (31 — alt: `Your neighbourhood market`) |
| Bundle ID | `com.gouna.karro` |
| Primary category | Shopping |
| Secondary category | Lifestyle |
| Age rating | 17+ (unrestricted web access not needed; user-generated content → answer "frequent/mild" for UGC questions honestly; with moderation + report + block in place, 17+ is the safe rating for a marketplace) |
| Privacy policy URL | `https://karro-j955.onrender.com/privacy` ⚠️ (move to custom domain later) |
| Terms of use URL | `https://karro-j955.onrender.com/terms` |
| Support URL | ⚠️ needs a real page or email link |
| Copyright | © 2026 Karro |

## 2. Description (EN)

```
Karro is the community marketplace for El Gouna — a safe, friendly place
for residents to buy and sell with their neighbours.

SELL IN A MINUTE
Snap a photo, set a price (or start an auction), and your item reaches
the whole town. Every listing is verified by our community team before
it goes live.

BUY WITH CONFIDENCE
Everyone on Karro is a Gouna resident. See who you're buying from, chat
in the app, make an offer, and pick up around the corner — no shipping,
no strangers, no surprises.

AUCTIONS
Watch live auctions, place bids, and win treasures from around town.

BUILT ON TRUST
• Every member belongs to the community
• Listings reviewed before going live
• Report any listing, block any member
• Our team reviews every report within 24 hours

Karro — your neighbourhood, trading.
```

## 3. Keywords (100 chars)

```
el gouna,gouna,marketplace,buy,sell,secondhand,community,egypt,hurghada,auction,neighbours,local
```

## 4. Promotional Text (170 chars)

```
The El Gouna marketplace is open! Join your neighbours — list your first
item in under a minute, or find a deal just around the corner.
```

## 5. What's New (v1.0)

```
Welcome to Karro! First release: browse listings, sell with photos from
your camera, live auctions, in-app chat and offers, and community
safety tools (report, block, verified listings).
```

## 6. App Privacy questionnaire (answers)

"Do you or your third-party partners collect data from this app?" → **Yes**

| Data type | Collected? | Linked to user? | Tracking? | Purpose |
|---|---|---|---|---|
| Contact Info → Email Address | Yes | Yes | No | App Functionality |
| Contact Info → Name | Yes | Yes | No | App Functionality |
| Contact Info → Physical Address (unit/floor) | Yes | Yes | No | App Functionality |
| User Content → Photos or Videos | Yes | Yes | No | App Functionality |
| User Content → Other User Content (listings, messages) | Yes | Yes | No | App Functionality |
| Identifiers → Device ID (push token) | Yes | Yes | No | App Functionality |
| Location | **No** | — | — | — |
| Everything else (browsing, purchases, diagnostics, ads) | **No** | — | — | — |

Tracking (ATT): **None** — no ads, no data sold, no cross-app tracking.
This matches `ios/App/App/PrivacyInfo.xcprivacy` already in the project.

## 7. Review notes (paste into "Notes" for the reviewer)

```
Karro is a closed community marketplace for residents of El Gouna, Egypt.

Demo account for review:
  email:    review@karro.app      ⚠️ create this account before submitting
  password: ⚠️ set one

UGC safety (Guideline 1.2): the app includes required terms acceptance at
first launch, listing reporting (··· menu on any listing), user blocking,
automatic hiding of listings after multiple reports, a 24-hour moderation
commitment, and in-app account deletion (Profile → Delete Account).

Camera is used only to photograph items for sale. Push notifications are
used for marketplace activity (messages, offers, bids).
```

## 8. Screenshots — required sizes

Take these in the iOS Simulator (Cmd+S saves a PNG to the Desktop):

| Device | Size | Required |
|---|---|---|
| iPhone 6.9" (15 Pro Max / 16 Pro Max) | 1320 × 2868 | Yes |
| iPhone 6.5" (11 Pro Max / Xs Max) | 1242 × 2688 | Yes (or auto-scaled from 6.9") |
| iPad 13" (if you ship iPad) | 2064 × 2752 | Only if iPad enabled |

Suggested shots (5–6): Home feed → Item detail with chat → Sell flow with
camera → Auctions → Sellers → Profile. Screenshot the app only (no fake
device frame; the native build is already full-screen).

## 9. Still blocked on the Apple Developer account

| Task | Where |
|---|---|
| Enrol ($99/yr) | developer.apple.com — start early, ID verification can take days |
| Signing team in Xcode | Xcode → App target → Signing & Capabilities |
| Push Notifications capability + APNs key (.p8) | Developer portal → Keys |
| Server-side APNs sender (send pushes on new message/offer/bid) | needs the .p8 key — implement when available |
| App Store Connect app record + TestFlight upload | App Store Connect |

## 10. Pre-submission hardening checklist (server)

- [ ] Set `JWT_SECRET` env var on Render (currently falls back to a dev value)
- [ ] Set `ADMIN_KEY` env var on Render (moderation endpoints)
- [ ] Render persistent disk for `server/data/` (JSON db + photos are on ephemeral disk now — they vanish on redeploy)
- [ ] Replace `support@karro.app` placeholder in `server/legal.js` with a real address
- [ ] Point the app build at production: `VITE_API_URL=https://karro-j955.onrender.com/api npm run build:ios`
