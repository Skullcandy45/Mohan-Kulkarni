import { api as staticApi } from './api-static';
import { api as backendApi, hasBackendApiKey } from './api-backend';

const wantsBackend =
  import.meta.env.VITE_USE_BACKEND_API === 'true' ||
  import.meta.env.VITE_USE_BACKEND_API === '1';

const useBackend = wantsBackend && hasBackendApiKey();

export const isBackendMode = useBackend;

if (wantsBackend && !hasBackendApiKey()) {
  console.warn(
    '[api] VITE_USE_BACKEND_API is set but VITE_API_KEY is missing — using static siteConfig API. ' +
      'Add VITE_API_KEY to .env for local backend testing.'
  );
}

export const api = useBackend ? backendApi : staticApi;
