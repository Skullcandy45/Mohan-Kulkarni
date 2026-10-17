import { siteConfig } from '../config/siteConfig';

/** Merged contact fields for public pages (settings override siteConfig). */
export function getPublicContactInfo(settings = {}) {
  const site = siteConfig.site?.contact || {};
  return {
    phone: settings?.contact_phone || site.phone || '',
    email: settings?.contact_email || site.email || '',
    address: settings?.address || site.address || '',
    workingHours: site.workingHours || site.hours || 'Mon to Fri · 9am to 7pm',
  };
}

export function getPublicSiteName(settings = {}) {
  return settings?.site_name || siteConfig.site?.name || 'Site';
}
