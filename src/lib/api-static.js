/**
 * Static site API.
 * Reads from the single `siteConfig` object so generated configs remain compatible
 * even when legacy named exports are omitted.
 *
 * Resources match .qobo-metadata.json apiResources exactly:
 *   services, doctors, testimonials, hero_sections, gallery_items,
 *   appointment_requests, contact_messages, settings
 */
import { siteConfig } from '../config/siteConfig';

const SERVICES = Array.isArray(siteConfig?.services) ? siteConfig.services : [];
const DOCTORS = Array.isArray(siteConfig?.team) ? siteConfig.team : [];
const TESTIMONIALS = Array.isArray(siteConfig?.testimonials) ? siteConfig.testimonials : [];
const WHY_CHOOSE_US = Array.isArray(siteConfig?.whyChooseUs) ? siteConfig.whyChooseUs : [];
const STATS = Array.isArray(siteConfig?.stats) ? siteConfig.stats : [];
const SITE_SETTINGS = (siteConfig?.settingsRecord && typeof siteConfig.settingsRecord === 'object') ? siteConfig.settingsRecord : {};
const GALLERY_ITEMS_SEED = Array.isArray(siteConfig?.galleryItems) ? siteConfig.galleryItems : [];
const CONTACT_SUBMISSIONS_SEED = Array.isArray(siteConfig?.contactSubmissions) ? siteConfig.contactSubmissions : [];
const APPOINTMENT_REQUESTS_SEED = Array.isArray(siteConfig?.appointmentRequests) ? siteConfig.appointmentRequests : [];
const HERO_SECTIONS_SEED = Array.isArray(siteConfig?.heroSections) ? siteConfig.heroSections : [];

// In-memory state (seeded from constants; mutations lost on refresh)
let siteSettings = { ...SITE_SETTINGS };
let galleryItems = [...GALLERY_ITEMS_SEED];
let contactSubmissions = [...CONTACT_SUBMISSIONS_SEED];
let appointmentRequests = [...APPOINTMENT_REQUESTS_SEED];
let heroSections = [...HERO_SECTIONS_SEED];
let services = [...SERVICES];
let doctors = [...DOCTORS];
let testimonials = [...TESTIMONIALS];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));
const nextId = (arr) => String(Math.max(0, ...arr.map((x) => Number(x.id) || 0)) + 1);

function filterPublished(list, opts = {}) {
  if (opts.published === undefined) return list;
  return list.filter((row) => row.published !== false);
}

export const api = {
  /** Services — primary entity */
  services: {
    getAll: async (opts = {}) => {
      await delay();
      return { success: true, data: filterPublished(services, opts) };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: services.find((s) => String(s.id) === String(id)) || null };
    },
    create: async (d) => {
      await delay();
      const row = { id: nextId(services), ...d };
      services.push(row);
      return { success: true, data: row };
    },
    update: async (id, d) => {
      await delay();
      const i = services.findIndex((s) => String(s.id) === String(id));
      if (i === -1) return { success: false };
      services[i] = { ...services[i], ...d };
      return { success: true, data: services[i] };
    },
    delete: async (id) => {
      await delay();
      services = services.filter((s) => String(s.id) !== String(id));
      return { success: true };
    },
  },

  /** Doctors / team members */
  doctors: {
    getAll: async (opts = {}) => {
      await delay();
      return { success: true, data: filterPublished(doctors, opts) };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: doctors.find((d) => String(d.id) === String(id)) || null };
    },
    create: async (d) => {
      await delay();
      const row = { id: nextId(doctors), ...d };
      doctors.push(row);
      return { success: true, data: row };
    },
    update: async (id, d) => {
      await delay();
      const i = doctors.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      doctors[i] = { ...doctors[i], ...d };
      return { success: true, data: doctors[i] };
    },
    delete: async (id) => {
      await delay();
      doctors = doctors.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Testimonials */
  testimonials: {
    getAll: async (opts = {}) => {
      await delay();
      return { success: true, data: filterPublished(testimonials, opts) };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: testimonials.find((t) => String(t.id) === String(id)) || null };
    },
    create: async (d) => {
      await delay();
      const row = { id: nextId(testimonials), ...d };
      testimonials.push(row);
      return { success: true, data: row };
    },
    update: async (id, d) => {
      await delay();
      const i = testimonials.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      testimonials[i] = { ...testimonials[i], ...d };
      return { success: true, data: testimonials[i] };
    },
    delete: async (id) => {
      await delay();
      testimonials = testimonials.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Hero sections */
  hero_sections: {
    getAll: async (opts = {}) => {
      await delay();
      let list = heroSections;
      if (opts.published !== undefined) list = list.filter((s) => s.published !== false);
      return { success: true, data: [...list] };
    },
    getById: async (id) => {
      await delay();
      const s = heroSections.find((x) => String(x.id) === String(id));
      return { success: true, data: s ? { ...s } : null };
    },
    create: async (data) => {
      await delay();
      const newSection = { id: nextId(heroSections), ...data };
      heroSections.push(newSection);
      return { success: true, data: newSection };
    },
    update: async (id, data) => {
      await delay();
      const i = heroSections.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      heroSections[i] = { ...heroSections[i], ...data };
      return { success: true, data: heroSections[i] };
    },
    delete: async (id) => {
      await delay();
      heroSections = heroSections.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Gallery items */
  gallery_items: {
    getAll: async (opts = {}) => {
      await delay();
      return { success: true, data: filterPublished(galleryItems, opts) };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: galleryItems.find((x) => String(x.id) === String(id)) || null };
    },
    create: async (d) => {
      await delay();
      const r = { id: nextId(galleryItems), ...d };
      galleryItems.push(r);
      return { success: true, data: r };
    },
    update: async (id, d) => {
      await delay();
      const i = galleryItems.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      galleryItems[i] = { ...galleryItems[i], ...d };
      return { success: true, data: galleryItems[i] };
    },
    delete: async (id) => {
      await delay();
      galleryItems = galleryItems.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Appointment requests — full CRUD for admin status management */
  appointment_requests: {
    getAll: async (opts = {}) => {
      await delay();
      let list = appointmentRequests;
      if (opts.status) list = list.filter((x) => x.status === opts.status);
      return { success: true, data: list };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: appointmentRequests.find((x) => String(x.id) === String(id)) || null };
    },
    create: async (data) => {
      await delay(600);
      const rec = { id: nextId(appointmentRequests), status: 'pending', ...data };
      appointmentRequests.push(rec);
      return { success: true, message: 'Appointment request received!', data: rec };
    },
    update: async (id, data) => {
      await delay();
      const i = appointmentRequests.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      appointmentRequests[i] = { ...appointmentRequests[i], ...data };
      return { success: true, data: appointmentRequests[i] };
    },
    delete: async (id) => {
      await delay();
      appointmentRequests = appointmentRequests.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Contact messages — full CRUD for admin status management */
  contact_submissions: {
    getAll: async (opts = {}) => {
      await delay();
      let list = contactSubmissions;
      if (opts.status) list = list.filter((x) => x.status === opts.status);
      return { success: true, data: list };
    },
    getById: async (id) => {
      await delay();
      return { success: true, data: contactSubmissions.find((x) => String(x.id) === String(id)) || null };
    },
    update: async (id, data) => {
      await delay();
      const i = contactSubmissions.findIndex((x) => String(x.id) === String(id));
      if (i === -1) return { success: false };
      contactSubmissions[i] = { ...contactSubmissions[i], ...data };
      return { success: true, data: contactSubmissions[i] };
    },
    delete: async (id) => {
      await delay();
      contactSubmissions = contactSubmissions.filter((x) => String(x.id) !== String(id));
      return { success: true };
    },
  },

  /** Contact form — public submission */
  contact: {
    send: async (data) => {
      await delay(600);
      const row = { id: nextId(contactSubmissions), status: 'new', created_at: new Date().toISOString(), ...data };
      contactSubmissions.push(row);
      return { success: true, message: 'Message sent successfully!', data: row };
    },
  },

  /** Settings — singleton */
  settings: {
    getAll: async () => { await delay(); return { success: true, data: siteSettings ? [{ ...siteSettings }] : [] }; },
    get: async () => { await delay(); return siteSettings ? { ...siteSettings } : null; },
    create: async (data) => { await delay(); siteSettings = { id: siteSettings?.id || '1', ...data }; return { success: true, data: siteSettings }; },
    update: async (id, data) => { await delay(); siteSettings = { ...siteSettings, ...data }; return { success: true, data: siteSettings }; },
  },

  /** Utility: static data helpers used by public pages */
  features: {
    getAll: async () => { await delay(); return { success: true, data: WHY_CHOOSE_US }; },
  },
  stats: {
    getAll: async () => { await delay(); return { success: true, data: STATS }; },
  },

  /** File upload (returns blob URL for dev/static mode) */
  getStorageInfo: async () => {
    await delay();
    return { success: true, data: { storage: { used: 0, limit: 100 * 1024 * 1024 } } };
  },

  uploadFile: async (file) => {
    await delay();
    const url = URL.createObjectURL(file);
    return { success: true, data: { file: { url } } };
  },
};
