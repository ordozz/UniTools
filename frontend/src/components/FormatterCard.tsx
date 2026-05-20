import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useApp } from '../context/AppContext';

type ToolType = 'json' | 'sql' | 'xml';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const FormatterCard: React.FC<{ type: ToolType }> = ({ type }) => {
  const { t, theme } = useApp();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pageT = t[type as keyof typeof t] as { title: string; description: string };
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  const handleFormat = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_URL}/format/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: code }),
      });
      const data = await response.json();
      if (data.is_valid) setCode(data.formatted);
      else setErrorMsg(data.error || 'Invalid format');
    } catch {
      setErrorMsg(t.common.serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="mb-2">
        <h1>{pageT.title}</h1>
        <p>{pageT.description}</p>
      </div>
      <div className="flex-row mb-2">
        <button className="btn-primary" onClick={handleFormat} disabled={isLoading}>
          {isLoading ? t.common.formatting : t.common.formatBtn}
        </button>
        {errorMsg && <span style={{ color: 'var(--error)', fontWeight: 500, fontSize: '0.9rem' }}>⚠ {errorMsg}</span>}
      </div>
      <div className="editor-container">
        <Editor
          height="calc(100vh - 280px)"
          language={type}
          theme={editorTheme}
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 }, scrollBeyondLastLine: false, wordWrap: 'on' }}
        />
      </div>
    </div>
  );
};
