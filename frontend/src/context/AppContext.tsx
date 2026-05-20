import { createContext, useContext, useState, useEffect } from 'react';
import type { LangCode, ThemeCode, Translations } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface AppContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  theme: ThemeCode;
  setTheme: (t: ThemeCode) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | null>(null);

function detectLang(): LangCode {
  const saved = localStorage.getItem('lang') as LangCode | null;
  if (saved && ['en', 'ru', 'uk'].includes(saved)) return saved;
  const sys = navigator.language.slice(0, 2).toLowerCase();
  if (sys === 'ru') return 'ru';
  if (sys === 'uk') return 'uk';
  return 'en';
}

function detectTheme(): ThemeCode {
  const saved = localStorage.getItem('theme') as ThemeCode | null;
  if (saved && ['dark', 'light'].includes(saved)) return saved;
  return 'dark';
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangCode>(detectLang);
  const [theme, setThemeState] = useState<ThemeCode>(detectTheme);

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  const setTheme = (t: ThemeCode) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = translations[lang] as Translations;

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
