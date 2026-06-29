// In dev, VITE_API_BASE_URL is empty so requests hit the Vite proxy ('/api').
// In production (Render static site), set VITE_API_BASE_URL to the backend URL.
const BASE = `${import.meta.env.VITE_API_BASE_URL || ''}/api`;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const getFdProducts = (featured = false) =>
  request(`/fd-products${featured ? '?featured=true' : ''}`);

export const calculate = ({ principal, rate, years, compounding = 4 }) =>
  request(`/calculate?principal=${principal}&rate=${rate}&years=${years}&compounding=${compounding}`);

export const submitContact = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });

export const subscribe = (email) =>
  request('/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
