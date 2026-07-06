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

## Deploy as ONE service (live URL)

The backend now serves the built front-end, so the whole app runs as a single
process — one thing to host, one URL.

```bash
npm run build   # installs deps + builds the front-end into app/dist
npm start       # node server/index.js — serves the app AND the API on $PORT
```

Locally that's `http://localhost:4000`. Any host that runs Node (or Docker) works.

### Option 1 — Render (free, from your GitHub repo)

1. Push this repo to GitHub (already done: `github.com/mohtadymaged/karro`).
2. Go to <https://render.com> → **New → Web Service** → connect the `karro` repo.
3. Settings:
   - **Runtime:** Docker (a `Dockerfile` is included) — or Node with
     **Build:** `npm run build`, **Start:** `npm start`
   - **Environment variable:** `JWT_SECRET` = any long random string
4. Create — Render gives you a public `https://karro-xxxx.onrender.com` URL.

### Option 2 — Docker (any host: Railway, Fly.io, Cloud Run, a VPS)

```bash
docker build -t karro .
docker run -p 4000:4000 -e JWT_SECRET=change-me karro
# → http://localhost:4000
```

### Before real users

- Set a strong `JWT_SECRET` (env var) — don't ship the dev default.
- The database is a JSON file under `server/data/`. On hosts with an ephemeral
  filesystem (Render free tier, Cloud Run) it resets on redeploy — fine for a
  demo. For durable data, attach a persistent disk (mount it at `server/data`)
  or move to a managed database.
