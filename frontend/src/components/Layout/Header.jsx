import React from 'react';
import { Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={16} color="var(--text-muted)" />
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="header-user">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
          <div className="avatar">LM</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>Luis Mamani</div>
        </div>
      </div>
    </header>
  );
};
