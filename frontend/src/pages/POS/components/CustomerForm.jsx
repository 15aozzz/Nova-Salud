import React from 'react';
import { Search } from 'lucide-react';

export const CustomerForm = ({ tipoComprobante }) => {
  const tipoDoc = tipoComprobante === 'FACTURA' ? '6 - RUC' : '1 - DNI';

  return (
    <div className="pos-panel">
      <div className="pos-panel-header">
        <span>DATOS DEL CLIENTE</span>
      </div>
      <div className="pos-panel-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Tipo Documento</label>
            <select className="input-field" value={tipoDoc} readOnly style={{backgroundColor: '#f8fafc', cursor: 'not-allowed'}}>
              <option value="6 - RUC">6 - RUC</option>
              <option value="1 - DNI">1 - DNI</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Nro Documento</label>
            <div style={{ display: 'flex' }}>
              <button style={{ padding: '0 0.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px 0 0 4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Search size={16} />
              </button>
              <input type="text" className="input-field" style={{ borderRadius: '0 4px 4px 0' }} placeholder={`Ingrese ${tipoComprobante === 'FACTURA' ? 'RUC' : 'DNI'}`} />
            </div>
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Nombre del Cliente/ Razón Social</label>
          <input type="text" className="input-field" placeholder={tipoComprobante === 'FACTURA' ? "Razón Social" : "Nombres y Apellidos"} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Dirección</label>
            <input type="text" className="input-field" placeholder="Dirección" />
          </div>
          <div className="input-group">
            <label className="input-label">Teléfono</label>
            <input type="text" className="input-field" placeholder="Teléfono" />
          </div>
        </div>
      </div>
    </div>
  );
};
