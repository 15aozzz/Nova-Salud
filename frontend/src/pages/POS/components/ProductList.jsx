import React, { useState } from 'react';

export const ProductList = ({ products, onAdd }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="glass-panel product-list-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Catálogo de Productos</h2>
        <input 
          type="text" 
          className="input-field" 
          placeholder="🔍 Buscar producto..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '0.75rem' }}>Descripción</th>
              <th style={{ padding: '0.75rem' }}>Unidad</th>
              <th style={{ padding: '0.75rem' }}>Precio</th>
              <th style={{ padding: '0.75rem' }}>Stock</th>
              <th style={{ padding: '0.75rem' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '0.75rem', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{product.unit}</td>
                <td style={{ padding: '0.75rem', color: 'var(--accent-color)' }}>S/ {product.price.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    background: 'rgba(16,185,129,0.1)', 
                    color: 'var(--success)', 
                    borderRadius: '4px',
                    fontSize: '0.85rem'
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <button className="btn btn-success" onClick={() => onAdd(product)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    + Añadir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
