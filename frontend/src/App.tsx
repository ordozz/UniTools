import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { JsonFormatter } from './pages/JsonFormatter';
import { SqlFormatter } from './pages/SqlFormatter';
import { XmlFormatter } from './pages/XmlFormatter';
import { Base64Tool } from './pages/Base64Tool';
import { SqlInBuilder } from './pages/SqlInBuilder';
import { Shortener } from './pages/Shortener';
import { Settings } from './pages/Settings';
import './index.css';

type Page = 'json' | 'sql' | 'xml' | 'base64' | 'sqlin' | 'shortener' | 'settings';

function AppInner() {
  const { t } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>('json');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems: { id: Page; icon: string; group: string; label: string }[] = [
    { id: 'json',      icon: '{ }', group: t.nav.groups.formatters, label: t.nav.items.json },
    { id: 'sql',       icon: '⛁',  group: t.nav.groups.formatters, label: t.nav.items.sql },
    { id: 'xml',       icon: '</>', group: t.nav.groups.formatters, label: t.nav.items.xml },
    { id: 'base64',    icon: '⇄',   group: t.nav.groups.encoders,   label: t.nav.items.base64 },
    { id: 'sqlin',     icon: '( )', group: t.nav.groups.sqlTools,   label: t.nav.items.sqlin },
    { id: 'shortener', icon: '🔗',  group: t.nav.groups.utilities,  label: t.nav.items.shortener },
  ];

  const groups = [...new Set(navItems.map(i => i.group))];

  const renderPage = () => {
    switch (currentPage) {
      case 'json':      return <JsonFormatter />;
      case 'sql':       return <SqlFormatter />;
      case 'xml':       return <XmlFormatter />;
      case 'base64':    return <Base64Tool />;
      case 'sqlin':     return <SqlInBuilder />;
      case 'shortener': return <Shortener />;
      case 'settings':  return <Settings />;
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && <span className="brand">UniTools</span>}
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle sidebar">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {groups.map(group => (
            <div key={group} className="nav-group">
              {sidebarOpen && <span className="nav-group-label">{group}</span>}
              {navItems.filter(i => i.group === group).map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Settings pinned to bottom */}
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('settings')}
            title={!sidebarOpen ? t.nav.items.settings : undefined}
          >
            <span className="nav-icon">⚙</span>
            {sidebarOpen && <span className="nav-label">{t.nav.items.settings}</span>}
          </button>
        </div>
      </aside>

      <main className="page-content">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
