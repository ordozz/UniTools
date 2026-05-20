import { useApp } from '../context/AppContext';
import type { LangCode, ThemeCode } from '../i18n/translations';

export const Settings: React.FC = () => {
  const { lang, setLang, theme, setTheme, t } = useApp();
  const s = t.settings;

  const langOptions: { code: LangCode; flag: string }[] = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'ru', flag: '🇷🇺' },
    { code: 'uk', flag: '🇺🇦' },
  ];

  return (
    <div style={{ maxWidth: '440px', width: '100%' }}>
      <div className="glass-card mb-4">
        <h1 style={{ marginBottom: '0.25rem' }}>{s.title}</h1>
        <p>{s.subtitle}</p>
      </div>

      {/* Language */}
      <div className="glass-card mb-4">
        <h2 style={{ marginBottom: '1.25rem' }}>{s.languageLabel}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {langOptions.map(({ code, flag }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '10px',
                border: lang === code ? '2px solid var(--accent)' : '1px solid var(--card-border)',
                background: lang === code ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                color: lang === code ? 'var(--accent)' : 'var(--text-primary)',
                fontFamily: 'var(--font)',
                fontSize: '0.95rem',
                fontWeight: lang === code ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{flag}</span>
              <span>{s.langs[code]}</span>
              {lang === code && <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="glass-card mb-4">
        <h2 style={{ marginBottom: '1.25rem' }}>{s.themeLabel}</h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {(['dark', 'light'] as ThemeCode[]).map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '10px',
                border: theme === th ? '2px solid var(--accent)' : '1px solid var(--card-border)',
                background: theme === th ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                color: theme === th ? 'var(--accent)' : 'var(--text-secondary)',
                fontFamily: 'var(--font)',
                fontSize: '1rem',
                fontWeight: theme === th ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>{th === 'dark' ? '🌙' : '☀️'}</span>
              <span>{th === 'dark' ? s.themeDark : s.themeLight}</span>
              {theme === th && <span style={{ fontSize: '0.75rem' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="glass-card">
        <h2 style={{ marginBottom: '1.25rem' }}>{s.aboutLabel}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{s.version.split(' ')[0]}</span>
            <span style={{ fontWeight: 600 }}>{s.version.split(' ').slice(1).join(' ')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
            <span style={{ fontWeight: 600 }}>{s.copyright}</span>
          </div>
          <p style={{ padding: '0 0.25rem', fontSize: '0.9rem' }}>{s.aboutDesc}</p>
        </div>
      </div>
    </div>
  );
};
