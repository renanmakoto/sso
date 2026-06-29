import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react';
import {CopyKey, translate} from '../i18n';
import {Language, supportedLanguages} from '../types';

type AppContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  t: (key: CopyKey) => string;
};

const AppContext = createContext<AppContextValue | null>(null);
const LANGUAGE_KEY = '@compassto/language';
const FAVORITES_KEY = '@compassto/favorites';

export function AppProvider({children}: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>('en');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(LANGUAGE_KEY), AsyncStorage.getItem(FAVORITES_KEY)])
      .then(([storedLanguage, storedFavorites]) => {
        if (storedLanguage && supportedLanguages.includes(storedLanguage as Language)) {
          setLanguageState(storedLanguage as Language);
        }
        if (storedFavorites) {
          setFavorites(new Set(JSON.parse(storedFavorites) as string[]));
        }
      })
      .catch(() => {
        // The app remains usable if local storage is unavailable.
      });
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    AsyncStorage.setItem(LANGUAGE_KEY, nextLanguage).catch(() => undefined);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...next])).catch(() => undefined);
      return next;
    });
  };

  const value = useMemo<AppContextValue>(
    () => ({
      language,
      setLanguage,
      favorites,
      toggleFavorite,
      t: key => translate(language, key),
    }),
    [favorites, language],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}
