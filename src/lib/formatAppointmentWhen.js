/** Human-readable preferred date/time for admin appointment lists. */
export function formatPreferredDate(value) {
  if (value == null || value === '') return '';

  const str = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split('-').map(Number);
    const local = new Date(y, m - 1, d);
    if (!Number.isNaN(local.getTime())) {
      return local.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }

  if (str.includes('T')) {
    const parsed = new Date(str);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return str.split('T')[0];
  }

  return str;
}

export function formatAppointmentWhen(preferredDate, preferredTime) {
  const parts = [formatPreferredDate(preferredDate), preferredTime].filter(Boolean);
  return parts.length ? parts.join(' · ') : '—';
}
