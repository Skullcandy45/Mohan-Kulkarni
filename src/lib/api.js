/**
 * Database-backed API — Services archetype (Qobo Central API).
 *
 * Drop-in replacement for api.js: same method signatures and
 * `{ success, data }` shapes so components keep working.
 *
 * Enable with `VITE_USE_BACKEND_API=true` and set:
 *   VITE_API_BASE_URL  (e.g. https://api.qobo.dev)
 *   VITE_API_KEY       (project-scoped key)
 *
 * Resources match .qobo-metadata.json apiResources exactly:
 *   services, doctors, testimonials, hero_sections, gallery_items,
 *   appointment_requests, contact_messages, settings
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.qobo.dev';

/** Build-time env + optional runtime injection (Vercel / QOBO_CONFIG). */
export function resolveApiKey() {
  const fromEnv = import.meta.env.VITE_API_KEY;
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && window.QOBO_CONFIG?.apiKey) {
    return window.QOBO_CONFIG.apiKey;
  }
  return '';
}

export function hasBackendApiKey() {
  return Boolean(resolveApiKey());
}


if (!hasBackendApiKey()) {
  console.warn('[api-backend] VITE_API_KEY is not set — requests may fail with 401.');
}

async function apiRequest(endpoint, options = {}) {
  if (shouldFetchAllListPages(endpoint, options)) {
    const qIndex = endpoint.indexOf('?');
    const pathname = qIndex >= 0 ? endpoint.slice(0, qIndex) : endpoint;
    const params = Object.fromEntries(
      new URLSearchParams(qIndex >= 0 ? endpoint.slice(qIndex + 1) : ''),
    );
    return fetchAllList(pathname, params);
  }

  options = { ...options };
  delete options._skipListPaging;

  const apiKey = resolveApiKey();
  if (!apiKey) {
    return {
      success: false,
      data: null,
      error: {
        code: 'MISSING_API_KEY',
        message: 'API key is required. Include X-API-Key header.',
      },
    };
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;
  const headers = {
    'X-API-Key': apiKey,
    ...options.headers,
  };
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const isAdminPath = typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/admin');

  const token = localStorage.getItem(
    isAdminPath ? 'admin_token' : 'auth_token',
  );

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error(`[api-backend] ${options.method || 'GET'} ${endpoint} → ${response.status}`, errorData);
      return { success: false, data: null, meta: null, error: errorData };
    }

    const json = await response.json();

    if (json && typeof json === 'object' && 'data' in json) {
      return {
        success: json.success !== false,
        data: json.data,
        meta: json.meta || null,
        error: json.error || null,
      };
    }
    return {
      success: json.success !== false,
      data: json,
      error: json.error || null,
    };
  } catch (err) {
    console.error(`[api-backend] Network error on ${endpoint}:`, err.message);
    return { success: false, data: null, meta: null, error: { message: err.message } };
  }
}

function qs(params) {
  if (!params || Object.keys(params).length === 0) return '';
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  const str = sp.toString();
  return str ? `?${str}` : '';
}


/** Qobo Central API defaults to limit=20 per page — we page through list endpoints. */
const LIST_PAGE_SIZE = 100;
const LIST_MAX_PAGES = 50;
const NON_LIST_RESOURCES = new Set(['storage', 'upload', 'auth', 'health']);

function isListCollectionPath(pathname) {
  const parts = String(pathname || '').replace(/^\/+/, '').split('/').filter(Boolean);
  if (parts.length !== 3) return false;
  if (parts[0] !== 'api') return false;
  if (!/^v\d+$/.test(parts[1])) return false;
  if (NON_LIST_RESOURCES.has(parts[2])) return false;
  return true;
}

function shouldFetchAllListPages(endpoint, options = {}) {
  const method = String(options.method || 'GET').toUpperCase();
  if (method !== 'GET') return false;
  if (options._skipListPaging) return false;
  const qIndex = endpoint.indexOf('?');
  const pathname = qIndex >= 0 ? endpoint.slice(0, qIndex) : endpoint;
  if (!isListCollectionPath(pathname)) return false;
  const sp = new URLSearchParams(qIndex >= 0 ? endpoint.slice(qIndex + 1) : '');
  if (sp.has('page') || sp.has('limit')) return false;
  return true;
}

async function fetchListPage(listPath, queryParams = {}) {
  return apiRequest(`${listPath}${qs(queryParams)}`, { _skipListPaging: true });
}

async function fetchAllList(listPath, queryParams = {}, options = {}) {
  const pageSize = options.pageSize || LIST_PAGE_SIZE;
  const all = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= LIST_MAX_PAGES) {
    const res = await fetchListPage(listPath, {
      ...queryParams,
      page,
      limit: pageSize,
    });

    if (!res.success) {
      return page === 1
        ? res
        : { success: true, data: all, meta: { total: all.length, partial: true } };
    }

    const batch = Array.isArray(res.data) ? res.data : [];
    all.push(...batch);

    if (res.meta?.totalPages != null) {
      totalPages = Number(res.meta.totalPages) || 1;
    } else if (batch.length < pageSize) {
      break;
    }

    page += 1;
  }

  return {
    success: true,
    data: all,
    meta: { total: all.length, pageSize, pagesFetched: page - 1 },
  };
}

function listGetAll(listPath, buildParams, opts = {}, afterFetch) {
  const params = (typeof buildParams === 'function' ? buildParams(opts) : buildParams) || {};
  const run = () => {
    if (opts.all === false || opts.fetchAll === false) {
      const single = { ...params };
      if (opts.page != null) single.page = opts.page;
      if (opts.limit != null) single.limit = opts.limit;
      return fetchListPage(listPath, single);
    }
    if (opts.page != null && opts.page !== '') {
      const single = { ...params, page: opts.page };
      if (opts.limit != null) single.limit = opts.limit;
      return fetchListPage(listPath, single);
    }
    if (opts.limit != null && opts.limit !== '' && opts.all !== true) {
      return fetchListPage(listPath, { ...params, limit: opts.limit });
    }
    return fetchAllList(listPath, params, { pageSize: opts.pageSize });
  };
  return run().then((res) => (afterFetch ? afterFetch(res) : res));
}


function one(res) {
  if (!res.success) return res;
  const d = res.data;
  return { success: true, data: Array.isArray(d) ? d[0] ?? null : d };
}

function normalizeUploadResponse(res) {
  if (!res.success || !res.data) return res;
  const d = res.data;
  if (d.file && d.file.url) return res;
  const url = d.url || d.file_url || d.public_url;
  if (url) {
    return { success: true, data: { file: { url } } };
  }
  return res;
}

export const api = {
  /** Services — primary entity */
  services: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.published !== undefined) params.published = opts.published;
      return apiRequest(`/api/v2/services${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/services/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/services', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/services/${id}`, { method: 'DELETE' }),
  },

  /** Doctors / team members */
  doctors: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.published !== undefined) params.published = opts.published;
      return apiRequest(`/api/v2/doctors${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/doctors/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/doctors', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/doctors/${id}`, { method: 'DELETE' }),
  },

  /** Testimonials */
  testimonials: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.published !== undefined) params.published = opts.published;
      return apiRequest(`/api/v2/testimonials${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/testimonials/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/testimonials/${id}`, { method: 'DELETE' }),
  },

  /** Hero sections */
  hero_sections: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.published !== undefined) params.published = opts.published;
      return apiRequest(`/api/v2/hero_sections${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/hero_sections/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/hero_sections', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/hero_sections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/hero_sections/${id}`, { method: 'DELETE' }),
  },

  /** Gallery items */
  gallery_items: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.published !== undefined) params.published = opts.published;
      return apiRequest(`/api/v2/gallery_items${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/gallery_items/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/gallery_items', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/gallery_items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/gallery_items/${id}`, { method: 'DELETE' }),
  },

  /** Appointment requests — full CRUD for status management in admin */
  appointment_requests: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.status) params.status = opts.status;
      return apiRequest(`/api/v2/appointment_requests${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/appointment_requests/${id}`)),
    create: async (data) =>
      apiRequest('/api/v2/appointment_requests', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) =>
      apiRequest(`/api/v2/appointment_requests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/appointment_requests/${id}`, { method: 'DELETE' }),
  },

  /** Contact messages — full CRUD for status management in admin (matches apiResources) */
  contact_messages: {
    getAll: async (opts = {}) => {
      const params = {};
      if (opts.status) params.status = opts.status;
      return apiRequest(`/api/v2/contact_messages${qs(params)}`);
    },
    getById: async (id) => one(await apiRequest(`/api/v2/contact_messages/${id}`)),
    update: async (id, data) =>
      apiRequest(`/api/v2/contact_messages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id) => apiRequest(`/api/v2/contact_messages/${id}`, { method: 'DELETE' }),
  },

  /** Contact form — public submission */
  contact: {
    send: async (data) =>
      apiRequest('/api/v2/contact_messages', { method: 'POST', body: JSON.stringify(data) }),
  },

  /** Settings — singleton */
  settings: {
    getAll: async () => apiRequest('/api/v2/settings'),
    get: async () => {
      const res = await apiRequest('/api/v2/settings');
      if (res.success && Array.isArray(res.data)) return res.data[0] || null;
      return res.data || null;
    },
    create: async (data) =>
      apiRequest('/api/v2/settings', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id, data) => {
      let settingsId = id;
      if (!settingsId) {
        const existing = await apiRequest('/api/v2/settings');
        if (existing.success && Array.isArray(existing.data) && existing.data.length > 0) {
          settingsId = existing.data[0].id;
        }
      }
      if (!settingsId) {
        return apiRequest('/api/v2/settings', { method: 'POST', body: JSON.stringify(data) });
      }
      return apiRequest(`/api/v2/settings/${settingsId}`, { method: 'PUT', body: JSON.stringify(data) });
    },
  },

  /** File upload (shared) */
  getStorageInfo: async () => {
    const res = await apiRequest('/api/v1/storage');
    if (res.success) return res;
    return { success: false, data: null, error: res.error };
  }
};

/** Legacy aliases */
api.contact_submissions = api.contact_messages;
api.team_members = api.doctors;
