import { useState } from 'react';
import Editor from '@monaco-editor/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

type ToolType = 'json' | 'sql' | 'xml';

const FormatterCard: React.FC<{ type: ToolType, title: string, description: string }> = ({ type, title, description }) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormat = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_URL}/format/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: code })
      });
      const data = await response.json();
      if (data.is_valid) {
        setCode(data.formatted);
      } else {
        setErrorMsg(data.error || 'Invalid format');
      }
    } catch (error) {
      setErrorMsg('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card mb-4">
      <div className="mb-2">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>

      <div className="flex-row mb-2" style={{ alignItems: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={handleFormat}
          disabled={isLoading}
        >
          {isLoading ? 'Formatting...' : 'Format & Validate'}
        </button>
        {errorMsg && <span style={{ color: 'var(--error-color)', fontWeight: 500, fontSize: '0.9rem' }}>{errorMsg}</span>}
      </div>

      <div className="editor-container">
        <Editor
          height="400px"
          language={type}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            roundedSelection: false,
            wordWrap: 'on'
          }}
        />
      </div>
    </div>
  );
};

export const Formatters: React.FC = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div className="text-center mb-4">
        <h1>Code Formatters</h1>
        <p>Isolated environments to validate and beautifully format your JSON, SQL, or XML code.</p>
      </div>

      <FormatterCard 
        type="json" 
        title="JSON Formatter" 
        description="Validate and pretty-print JSON objects." 
      />
      <FormatterCard 
        type="sql" 
        title="SQL Formatter (MS SQL)" 
        description="Strictly validate T-SQL syntax and format queries." 
      />
      <FormatterCard 
        type="xml" 
        title="XML Formatter" 
        description="Validate and format XML documents." 
      />
    </div>
  );
};
