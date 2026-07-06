// Karro marketplace API.
// Real: accounts (hashed + JWT), listings (browse/search/create + photo upload),
// messages, offers, bids. Categories / sellers / reviews / auctions are served
// from the same seed data the UI was designed against.
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDb, save, nextId, MEDIA_DIR } from './db.js';
import { CATS, LISTINGS, SELLERS, TESTIMONIALS, AUCTION_BASE } from '../app/src/data.js';

const SECRET = process.env.JWT_SECRET || 'karro-dev-secret-change-me';
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' })); // room for base64 listing photos
app.use('/media', express.static(MEDIA_DIR));

// ── Seed the catalogue once ────────────────────────────────
const boot = getDb();
if (!boot.seeded) {
  boot.listings = LISTINGS.map((l) => ({ ...l, sellerId: null, createdAt: 0 }));
  boot.seeded = true;
  save();
}

// ── Auth helpers ───────────────────────────────────────────
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.uid = jwt.verify(token, SECRET).uid;
    next();
  } catch {
    res.status(401).json({ error: 'Please sign in first' });
  }
}
function publicUser(u) {
  if (!u) return null;
  const { passwordHash, ...rest } = u;
  return rest;
}
function tokenFor(user) {
  return jwt.sign({ uid: user.id }, SECRET, { expiresIn: '30d' });
}

// ── Auth ───────────────────────────────────────────────────
app.post('/api/auth/register', (req, res) => {
  const { name, email, username, password, unit, floor, residentType, interests } = req.body || {};
  if (!name || !email || !username || !password)
    return res.status(400).json({ error: 'Name, email, username and password are required' });
  if (String(password).length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  const db = getDb();
  if (db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
    return res.status(409).json({ error: 'That email is already registered' });
  if (db.users.find((u) => u.username.toLowerCase() === username.toLowerCase()))
    return res.status(409).json({ error: 'That username is already taken' });
  const user = {
    id: nextId('u'),
    name,
    email,
    username,
    passwordHash: bcrypt.hashSync(String(password), 10),
    unit: unit || '',
    floor: floor || '',
    residentType: residentType || '',
    interests: interests || [],
    verified: false,
    createdAt: Date.now(),
  };
  db.users.push(user);
  save();
  res.json({ token: tokenFor(user), user: publicUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const db = getDb();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email || '').toLowerCase());
  if (!user || !bcrypt.compareSync(String(password || ''), user.passwordHash))
    return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: tokenFor(user), user: publicUser(user) });
});

app.get('/api/me', auth, (req, res) => {
  const db = getDb();
  res.json({ user: publicUser(db.users.find((u) => u.id === req.uid)) });
});

// ── Seed catalogue (static) ────────────────────────────────
app.get('/api/categories', (_req, res) => res.json(CATS));
app.get('/api/sellers', (_req, res) => res.json(SELLERS));
app.get('/api/sellers/:id', (req, res) => {
  const s = SELLERS.find((x) => x.id === req.params.id);
  return s ? res.json(s) : res.status(404).json({ error: 'Seller not found' });
});
app.get('/api/sellers/:id/reviews', (req, res) => res.json(TESTIMONIALS[req.params.id] || []));
app.get('/api/auctions', (_req, res) => res.json(AUCTION_BASE));

// ── Listings ───────────────────────────────────────────────
app.get('/api/listings', (req, res) => {
  const { cat, q } = req.query;
  const db = getDb();
  let list = [...db.listings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  if (cat) list = list.filter((l) => l.catId === cat);
  if (q) {
    const s = String(q).toLowerCase();
    list = list.filter(
      (l) => (l.name || '').toLowerCase().includes(s) || (l.seller || '').toLowerCase().includes(s)
    );
  }
  res.json(list);
});

app.get('/api/listings/:id', (req, res) => {
  const db = getDb();
  const l = db.listings.find((x) => x.id === req.params.id);
  return l ? res.json(l) : res.status(404).json({ error: 'Listing not found' });
});

function saveDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') return null;
  if (dataUrl.startsWith('http')) return dataUrl; // already a URL
  const m = dataUrl.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
  if (!m) return null;
  const ext = m[1].split('/')[1].replace('jpeg', 'jpg').replace('+xml', '');
  const fname = nextId('img') + '.' + ext;
  writeFileSync(join(MEDIA_DIR, fname), Buffer.from(m[2], 'base64'));
  return '/media/' + fname;
}

app.post('/api/listings', auth, (req, res) => {
  const db = getDb();
  const user = db.users.find((u) => u.id === req.uid);
  const { name, catId, price, unit, desc, cond, photos, mode } = req.body || {};
  if (!name || !catId || !price)
    return res.status(400).json({ error: 'Name, category and price are required' });
  const imgs = (photos || []).map(saveDataUrl).filter(Boolean);
  const cat = CATS.find((c) => c.id === catId);
  const listing = {
    id: nextId('L'),
    catId,
    name,
    price: Number(price),
    unit: unit || '',
    desc: desc || '',
    cond: cond || 'Good',
    emoji: cat ? cat.emoji : '📦',
    bg: cat ? cat.bg : '#E9F6F5',
    img: imgs[0] || null,
    imgs,
    seller: user.name,
    unit_: user.unit || '—',
    sellerId: user.id,
    posted: 'Just now',
    status: mode === 'auction' ? 'auction' : 'live',
    createdAt: Date.now(),
  };
  db.listings.push(listing);
  save();
  res.json(listing);
});

// ── Messages / offers / bids ───────────────────────────────
app.get('/api/listings/:id/messages', auth, (req, res) => {
  const db = getDb();
  res.json(db.messages.filter((m) => m.listingId === req.params.id && m.userId === req.uid));
});
app.post('/api/listings/:id/messages', auth, (req, res) => {
  const { text } = req.body || {};
  if (!text || !String(text).trim()) return res.status(400).json({ error: 'Message is empty' });
  const db = getDb();
  const msg = { id: nextId('m'), listingId: req.params.id, userId: req.uid, text: String(text), createdAt: Date.now() };
  db.messages.push(msg);
  save();
  res.json(msg);
});
app.post('/api/listings/:id/offers', auth, (req, res) => {
  const { amount } = req.body || {};
  const db = getDb();
  const offer = { id: nextId('o'), listingId: req.params.id, userId: req.uid, amount: Number(amount), createdAt: Date.now() };
  db.offers.push(offer);
  save();
  res.json(offer);
});
app.post('/api/auctions/:id/bid', auth, (req, res) => {
  const { amount } = req.body || {};
  const db = getDb();
  const bid = { id: nextId('b'), auctionId: req.params.id, userId: req.uid, amount: Number(amount), createdAt: Date.now() };
  db.bids.push(bid);
  save();
  res.json(bid);
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ── Serve the built front-end (single-service production deploy) ──
// In dev this folder doesn't exist and Vite serves the UI instead.
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'app', 'dist');
if (existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/media'))
      return res.status(404).json({ error: 'Not found' });
    res.sendFile(join(DIST, 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Karro → http://localhost:${PORT}`));
