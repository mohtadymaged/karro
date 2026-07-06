// Tiny JSON-file persistence layer — zero native deps, survives restarts.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = join(__dirname, 'data');
export const MEDIA_DIR = join(DATA_DIR, 'media');
const DB_FILE = join(DATA_DIR, 'db.json');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(MEDIA_DIR)) mkdirSync(MEDIA_DIR, { recursive: true });

let db;

function load() {
  if (existsSync(DB_FILE)) {
    db = JSON.parse(readFileSync(DB_FILE, 'utf8'));
  } else {
    db = { users: [], listings: [], messages: [], offers: [], bids: [], counters: {}, seeded: false };
    save();
  }
}

export function save() {
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function getDb() {
  if (!db) load();
  return db;
}

// Monotonic per-prefix ids (u1, L1, m1, …) — stable across restarts.
export function nextId(prefix) {
  const d = getDb();
  d.counters[prefix] = (d.counters[prefix] || 0) + 1;
  return prefix + d.counters[prefix];
}
