import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export const CartTable = ({ items, onRemove, onUpdateQty }) => {
  return (
    <div className="pos-panel" style={{ flex: 1 }}>
      <div className="pos-panel-header">
        <span>LISTADO DE PRODUCTOS</span>
      </div>
      <div className="pos-panel-body" style={{ padding: '0.5rem' }}>
        <div className="input-group" style={{ padding: '0 0.5rem' }}>
          <label className="input-label">Digite el Producto a vender</label>
          <input type="text" className="input-field" placeholder="Ingrese el código de barras o el nombre del producto" style={{ borderRadius: '20px' }} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '0.8rem', padding: '0.5rem' }}>
          <div className="input-group">
            <label className="input-label">Tipo Operación</label>
            <select className="input-field"><option>0101 - Venta interna</option></select>
          </div>
          <div className="input-group">
            <label className="input-label">Forma de Pago</label>
            <select className="input-field"><option>Contado</option></select>
          </div>
          <div className="input-group">
            <label className="input-label">Total Recibido</label>
            <input type="text" className="input-field" defaultValue="71.57" />
          </div>
          <div className="input-group">
            <label className="input-label">Vuelto</label>
            <input type="text" className="input-field" placeholder="Vuelto" readOnly style={{backgroundColor: '#f1f5f9'}} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', alignItems: 'center' }}>
          <select className="input-field" style={{ width: 'auto' }}><option>Show 10 rows</option></select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Buscar:</span>
            <input type="text" className="input-field" style={{ width: '150px' }} />
          </div>
        </div>

        <div className="pos-table-wrapper">
          <table className="pos-table">
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>VALOR</th>
                <th style={{ textAlign: 'center' }}>CANTIDAD</th>
                <th>SUBTOTAL</th>
                <th>IGV</th>
                <th>IMPORTE</th>
                <th style={{ textAlign: 'center' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const subtotal = item.price * item.qty;
                const igv = subtotal * 0.18;
                const importe = subtotal + igv;
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
                        style={{ width: '60px', padding: '0.2rem', textAlign: 'center', border: '1px solid #cbd5e1', borderRadius: '15px', outline: 'none' }} 
                        min="1"
                      />
                    </td>
                    <td>{subtotal.toFixed(2)}</td>
                    <td>{igv.toFixed(2)}</td>
                    <td>{importe.toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => onRemove(item.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', marginRight: '0.8rem' }}>
                        <Trash2 size={16} />
                      </button>
                      <button style={{ color: '#16a34a', border: 'none', background: 'none', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
