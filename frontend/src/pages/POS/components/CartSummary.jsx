import React from 'react';

export const CartSummary = ({ items }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="pos-panel" style={{ width: '320px' }}>
      <div className="pos-panel-header">
        <span>RESUMEN</span>
      </div>
      <div className="pos-panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', fontWeight: '700', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>OP. GRAVADAS</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>OP. INAFECTAS</span>
          <span>S/ 0.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>OP. EXONERADAS</span>
          <span>S/ 0.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>SUBTOTAL</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>IGV</span>
          <span>S/ {igv.toFixed(2)}</span>
        </div>
        
        <div style={{ borderTop: '1px solid var(--panel-border)', margin: '0.5rem 0' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', color: '#1e293b' }}>
          <span>TOTAL</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
          <button className="btn btn-danger" style={{ flex: 1, padding: '0.8rem' }}>CANCELAR</button>
          <button className="btn btn-success" style={{ flex: 1, padding: '0.8rem' }}>VENDER</button>
        </div>
      </div>
    </div>
  );
};
