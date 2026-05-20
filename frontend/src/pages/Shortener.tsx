import { useState } from 'react';
import { useApp } from '../context/AppContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const Shortener: React.FC = () => {
  const { t } = useApp();
  const s = t.shortener;
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsLoading(true); setErrorMsg(null); setShortUrl(null); setCopied(false);
    try {
      const res = await fetch(`${API_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const host = window.location.port === '5173' ? 'http://localhost:8000' : window.location.origin;
      setShortUrl(`${host}/${data.short_code}`);
    } catch {
      setErrorMsg(s.error);
    } finally {
      setIsLoading(false);
    }
  };

  const copy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px' }}>
      <div className="mb-4"><h1>{s.title}</h1><p>{s.description}</p></div>
      <form onSubmit={handleShorten} className="mb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input type="url" className="input-field" placeholder={s.placeholder}
            value={url} onChange={(e) => setUrl(e.target.value)} required />
          <button type="submit" className="btn-primary" disabled={isLoading} style={{ padding: '0.85rem', fontSize: '1rem' }}>
            {isLoading ? s.shortening : s.btn}
          </button>
        </div>
        {errorMsg && <p style={{ color: 'var(--error)', marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem' }}>⚠ {errorMsg}</p>}
      </form>
      {shortUrl && (
        <div className="short-result">
          <p style={{ color: 'var(--success)', fontWeight: 600, marginBottom: '0.75rem' }}>{s.ready}</p>
          <div className="flex-row" style={{ justifyContent: 'center' }}>
            <a href={shortUrl} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem', wordBreak: 'break-all' }}>
              {shortUrl}
            </a>
            <button className="btn-secondary" onClick={copy} style={{ flexShrink: 0 }}>
              {copied ? t.common.copied : s.copy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
