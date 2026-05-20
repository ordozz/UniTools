import { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SqlInBuilder: React.FC = () => {
  const { t } = useApp();
  const s = t.sqlin;
  const c = t.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (!lines.length) { setOutput(''); setCount(null); return; }
    setOutput(lines.map(l => `'${l.replace(/'/g, "''")}'`).join(','));
    setCount(lines.length);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(''); setOutput(''); setCount(null); setCopied(false); };

  return (
    <div className="glass-card">
      <div className="mb-4"><h1>{s.title}</h1><p>{s.description}</p></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={lbl}>{s.inputLabel}</label>
          <textarea className="base64-textarea" style={{ height: '340px' }}
            placeholder={"12345\n233434\n756558"}
            value={input} onChange={(e) => { setInput(e.target.value); setOutput(''); setCount(null); }} spellCheck={false} />
        </div>
        <div>
          <label style={lbl}>
            {s.outputLabel}
            {count !== null && <span style={{ marginLeft: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>{s.valueCount(count)}</span>}
          </label>
          <textarea className="base64-textarea output-area" style={{ height: '340px' }}
            readOnly placeholder="'12345','233434','756558'" value={output} spellCheck={false} />
        </div>
      </div>

      {output && (
        <div style={{ marginTop: '1.25rem', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px', padding: '1rem 1.25rem', fontFamily: 'Menlo,Consolas,monospace', fontSize: '0.85rem', wordBreak: 'break-all' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font)', fontStyle: 'italic' }}>{s.exampleUsage}</span>
          <span style={{ color: '#818CF8' }}>SELECT</span><span style={{ color: 'var(--text-primary)' }}> * </span>
          <span style={{ color: '#818CF8' }}>FROM</span><span style={{ color: 'var(--text-primary)' }}> table </span>
          <span style={{ color: '#818CF8' }}>WHERE</span><span style={{ color: 'var(--text-primary)' }}> id </span>
          <span style={{ color: '#818CF8' }}>IN</span><span style={{ color: 'var(--text-primary)' }}> ({output.length > 60 ? output.slice(0, 60) + '…' : output})</span>
        </div>
      )}

      <div className="flex-row" style={{ marginTop: '1.25rem' }}>
        <button className="btn-primary" onClick={handleConvert} disabled={!input.trim()}>{s.btnConvert}</button>
        <button className="btn-secondary" onClick={copy} disabled={!output}>{copied ? c.copied : c.copy}</button>
        <button className="btn-ghost" onClick={clear} disabled={!input && !output}>{c.clear}</button>
      </div>
    </div>
  );
};

const lbl: React.CSSProperties = {
  display: 'block', marginBottom: '0.5rem', fontWeight: 600,
  color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em',
};
