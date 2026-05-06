import React from 'react';

export const ComprobanteForm = ({ tipo, setTipo }) => {
  return (
    <div className="pos-panel">
      <div className="pos-panel-header">
        <span>COMPROBANTE DE PAGO</span>
      </div>
      <div className="pos-panel-body">
        <div className="input-group">
          <label className="input-label">Empresa Emisora</label>
          <select className="input-field"><option>BOTICA NOVA SALUD</option></select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Fecha Emisión</label>
            <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="input-group">
            <label className="input-label">Tipo de Comprobante</label>
            <select className="input-field" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="BOLETA">BOLETA</option>
              <option value="FACTURA">FACTURA</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Serie</label>
            <select className="input-field"><option>{tipo === 'FACTURA' ? 'F001' : 'B001'}</option></select>
          </div>
          <div className="input-group">
            <label className="input-label">Correlativo</label>
            <input type="text" className="input-field" value="1" readOnly style={{backgroundColor: '#f1f5f9'}} />
          </div>
          <div className="input-group">
            <label className="input-label">Moneda</label>
            <select className="input-field"><option>PEN - SOLES</option></select>
          </div>
        </div>
      </div>
    </div>
  );
};
