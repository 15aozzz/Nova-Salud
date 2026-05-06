import React from 'react';

export const Cart = ({ items, onRemove, onClear }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="glass-panel cart-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem' }}>Resumen de Venta</h2>
      
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
        {items.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
            🛒 El carrito está vacío
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {item.qty} {item.unit} x S/ {item.price.toFixed(2)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontWeight: '600' }}>S/ {(item.qty * item.price).toFixed(2)}</div>
                  <button className="btn btn-danger" onClick={() => onRemove(item.id)} style={{ padding: '0.4rem 0.6rem' }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          <span>Op. Gravadas</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <span>IGV (18%)</span>
          <span>S/ {igv.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-color)' }}>
          <span>TOTAL</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-danger" onClick={onClear} style={{ flex: 1 }}>Cancelar</button>
          <button className="btn btn-primary" style={{ flex: 2 }}>Cobrar e Imprimir</button>
        </div>
      </div>
    </div>
  );
};
