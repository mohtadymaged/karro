# Running Karro (full stack)

Karro is now a real, operating marketplace: a React front-end (`app/`) talking to
an API + database back-end (`server/`).

## What's real

- **Accounts** — register & sign in. Passwords are hashed (bcrypt), sessions are
  JWTs. Accounts persist.
- **Listings** — browse, search, filter by category, open detail. Served from the
  database.
- **Selling** — post an item (with real photo upload) from the Sell button. It's
  saved, shows up in the Market for everyone, and survives a refresh/restart.
- **Messages & offers** — stored server-side against your account.

## Still demo (next phase)

- Auctions live-bid ticker and the seller directory / reviews are seeded content.
- The in-item chat stores your messages but the seller's replies are simulated
  (a real two-way inbox is a follow-up).

## Run it (two terminals)

**1. Backend** — the API + database (port 4000):

```bash
cd server
npm install
npm start          # → Karro API on http://localhost:4000
```

**2. Frontend** — the app (port 5173, proxies /api and /media to the backend):

```bash
cd app
npm install
npm run dev        # → http://localhost:5173
```

Open http://localhost:5173, click **Join Karro**, create an account, and post an
item — it persists.

## Data & reset

The backend stores everything in `server/data/` (a `db.json` file + uploaded
photos under `server/data/media/`). This folder is git-ignored. Delete it to start
from a clean, freshly-seeded catalogue:

```bash
rm -rf server/data
```

## Production build

```bash
cd app && npm run build      # static bundle → app/dist
```

For a real deployment you'd serve `app/dist` behind the same origin as the API (or
set `VITE_API_URL` to the API's URL) and run the backend behind a process manager.
The default `JWT_SECRET` and file-based store are fine for demo/dev — swap the
secret (env `JWT_SECRET`) and move to a managed database before going live.
