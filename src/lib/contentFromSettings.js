import * as Lucide from 'lucide-react';

const CURRENCY_ICON_ALIASES = {
  dollar: 'IndianRupee',
  'dollar-sign': 'IndianRupee',
  'circle-dollar-sign': 'IndianRupee',
  'badge-dollar-sign': 'IndianRupee',
  rupee: 'IndianRupee',
  'indian-rupee': 'IndianRupee',
  'badge-indian-rupee': 'IndianRupee',
};

/**
 * Parse a JSON array from admin settings. Empty/whitespace uses fallback.
 * @param {string} raw
 * @param {unknown[]} fallback
 */
export function parseJsonArray(raw, fallback) {
  if (raw == null || String(raw).trim() === '') return fallback;
  try {
    const v = JSON.parse(String(raw));
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Lucide icon by kebab/snake name, e.g. shield-check → ShieldCheck
 */
export function iconFromKey(key) {
  if (!key || typeof key !== 'string') return Lucide.Sparkles;
  const normalized = key.trim().toLowerCase();
  const alias = CURRENCY_ICON_ALIASES[normalized];
  if (alias && Lucide[alias]) return Lucide[alias];
  const name = normalized
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
  return Lucide[name] || Lucide.Sparkles;
}

/** Contact hours row: accept `time` or `hours` */
export function normalizeContactHourRow(row) {
  if (!row || typeof row !== 'object') return null;
  const day = row.day ?? '';
  const time = row.time ?? row.hours ?? '';
  if (!day && !time) return null;
  return { day, time };
}
