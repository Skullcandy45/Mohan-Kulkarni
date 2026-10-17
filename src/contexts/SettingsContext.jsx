import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../lib/api';
import { DEFAULT_SITE_SETTINGS } from '../config/siteConfig';
import { omitNewsletterSettings } from '../lib/omitNewsletterSettings';

function buildDefaultSettings() {
  return omitNewsletterSettings({ ...DEFAULT_SITE_SETTINGS });
}

const SettingsContext = createContext({
  settings: buildDefaultSettings(),
  loadSettings: async () => {},
  loading: true,
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(buildDefaultSettings);
  const [loading, setLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      const res = await api.settings.getAll();
      const row = res.success && res.data?.[0] ? res.data[0] : {};
      setSettings(
        omitNewsletterSettings({
          ...DEFAULT_SITE_SETTINGS,
          ...row,
        }),
      );
    } catch (e) {
      console.error(e);
      setSettings(omitNewsletterSettings({ ...DEFAULT_SITE_SETTINGS }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const value = useMemo(
    () => ({ settings, loadSettings, loading }),
    [settings, loadSettings, loading],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
