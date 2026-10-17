const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.qobo.dev';

export function resolveMediaUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  const base = API_BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
