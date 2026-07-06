// Karro API client. Talks to the backend under /api (proxied to :4000 in dev).
// For iOS: Use full backend URL from env or default to localhost (dev).
// For web: Use relative /api (proxied by dev server or served from same origin in prod).
function getBaseUrl() {
  const isIOS = typeof window !== 'undefined' && window.location.protocol === 'capacitor://';
  if (isIOS || import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  }
  return '/api';
}

const BASE = getBaseUrl();

let token = '';
try { token = localStorage.getItem('karro_token') || ''; } catch { /* ignore */ }

export function setToken(t) {
  token = t || '';
  try { t ? localStorage.setItem('karro_token', t) : localStorage.removeItem('karro_token'); } catch { /* ignore */ }
}
export function getToken() { return token; }

async function req(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  const opts = { method, headers };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(BASE + path, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  register: (b) => req('/auth/register', { method: 'POST', body: b }),
  login: (b) => req('/auth/login', { method: 'POST', body: b }),
  me: () => req('/me'),
  categories: () => req('/categories'),
  sellers: () => req('/sellers'),
  seller: (id) => req('/sellers/' + id),
  reviews: (id) => req('/sellers/' + id + '/reviews'),
  auctions: () => req('/auctions'),
  listings: (query = '') => req('/listings' + (query ? '?' + query : '')),
  listing: (id) => req('/listings/' + id),
  createListing: (b) => req('/listings', { method: 'POST', body: b }),
  messages: (id) => req(`/listings/${id}/messages`),
  sendMessage: (id, text) => req(`/listings/${id}/messages`, { method: 'POST', body: { text } }),
  sendOffer: (id, amount) => req(`/listings/${id}/offers`, { method: 'POST', body: { amount } }),
  bid: (id, amount) => req(`/auctions/${id}/bid`, { method: 'POST', body: { amount } }),
  // Push notifications
  registerDeviceToken: (token) => req('/users/me/device-token', { method: 'POST', body: { token } }),
  // App Store compliance
  reportListing: (id, reason) => req(`/listings/${id}/report`, { method: 'POST', body: { reason } }),
  blockUser: (id) => req(`/users/${id}/block`, { method: 'POST' }),
  deleteAccount: () => req('/me', { method: 'DELETE' }),
};
