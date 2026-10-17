/** Legacy settings keys — removed blocks no longer shown in admin or frontend. */
const REMOVED_SETTINGS_KEYS = [
  'footer_newsletter_tag',
  'footer_newsletter_title_html',
  'footer_newsletter_subtitle',
  'footer_newsletter_disclaimer',
  'footer_cta_eyebrow',
  'footer_cta_title_html',
  'footer_cta_subtitle',
];

export function omitNewsletterSettings(data) {
  if (!data || typeof data !== 'object') return data;
  const next = { ...data };
  REMOVED_SETTINGS_KEYS.forEach((key) => {
    delete next[key];
  });
  return next;
}
