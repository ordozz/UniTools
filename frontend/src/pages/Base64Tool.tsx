import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { copyToClipboard, pasteFromClipboard } from '../utils/clipboard';

type Mode = 'encode' | 'decode';

export const Base64Tool: React.FC = () => {
  const { t } = useApp();
  const b = t.base64;
  const c = t.common;
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const reset = () => { setInput(''); setOutput(''); setError(null); setCopied(false); };

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) return;
    try {
      setOutput(mode === 'encode'
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input.trim()))));
    } catch {
      setError(mode === 'encode' ? b.errEncode : b.errDecode);
    }
  };

  const handleSwap = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output); setOutput(''); setError(null);
  };

  const copy = async () => {
    if (!output) return;
    const ok = await copyToClipboard(output);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    if (text) { setInput(text); setOutput(''); setError(null); }
  };

  return (
    <div className="glass-card">
      <div className="mb-2"><h1>{b.title}</h1><p>{b.description}</p></div>

      <div className="tool-selector mb-4">
        <div className={`tool-tab ${mode === 'encode' ? 'active' : ''}`} onClick={() => { setMode('encode'); reset(); }}>{b.modeEncode}</div>
        <div className={`tool-tab ${mode === 'decode' ? 'active' : ''}`} onClick={() => { setMode('decode'); reset(); }}>{b.modeDecode}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={lbl}>{mode === 'encode' ? b.inputEncode : b.inputDecode}</label>
          <textarea className="base64-textarea" placeholder={mode === 'encode' ? b.phEncode : b.phDecode}
            value={input} onChange={(e) => { setInput(e.target.value); setOutput(''); setError(null); }} />
        </div>
        <div>
          <label style={lbl}>{mode === 'encode' ? b.outputEncode : b.outputDecode}</label>
          <textarea className="base64-textarea output-area" readOnly placeholder={b.phResult} value={output} />
        </div>
      </div>

      <div className="flex-row" style={{ marginTop: '1.25rem' }}>
        <button className="btn-primary" onClick={handleConvert} disabled={!input.trim()}>
          {mode === 'encode' ? b.btnEncode : b.btnDecode}
        </button>
        <button className="btn-secondary" onClick={handleSwap} disabled={!output}>{b.swap}</button>
        <button className="btn-secondary" onClick={handlePaste}>📋 {c.paste}</button>
        <button className="btn-secondary" onClick={copy} disabled={!output}>{copied ? c.copied : c.copy}</button>
        <button className="btn-ghost" onClick={reset} disabled={!input && !output}>{c.clear}</button>
        {error && <span style={{ color: 'var(--error)', fontWeight: 500, fontSize: '0.9rem' }}>⚠ {error}</span>}
      </div>
    </div>
  );
};

const lbl: React.CSSProperties = {
  display: 'block', marginBottom: '0.5rem', fontWeight: 600,
  color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em',
};
