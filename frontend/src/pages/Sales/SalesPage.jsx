import React from 'react';
import { FileText, Calendar, Search } from 'lucide-react';
import '../POS/POSPage.css'; // Reutilizamos los estilos del POS

export const SalesPage = () => {
  // Datos simulados basados en tu DB
  const sales = [
    { id: 1, doc: 'B001-00000001', client: 'Consumidor Final', date: '05 May 2026', total: 33.50, seller: 'Rosa Flores' },
    { id: 2, doc: 'F001-00000001', client: 'Farmacia del Pueblo SAC', date: '05 May 2026', total: 140.00, seller: 'Rosa Flores' },
    { id: 3, doc: 'B001-00000002', client: 'Juan García Pérez', date: '04 May 2026', total: 12.50, seller: 'Luis Mamani' },
  ];

  return (
    <div className="pos-container">
      <div className="pos-panel" style={{ flex: 1 }}>
        <div className="pos-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" />
            Historial de Ventas
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="btn" style={{ backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }}>
               <Calendar size={16} /> Hoy
             </button>
             <button className="btn btn-primary">
               Exportar Reporte
             </button>
          </div>
        </div>
        <div className="pos-panel-body">
          <div className="input-group" style={{ maxWidth: '300px', marginBottom: '1rem' }}>
            <input type="text" className="input-field" placeholder="Buscar por cliente o comprobante..." />
          </div>
          <div className="pos-table-wrapper">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Comprobante</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Vendedor</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id}>
                    <td style={{ fontWeight: '500' }}>{sale.doc}</td>
                    <td>{sale.client}</td>
                    <td>{sale.date}</td>
                    <td>{sale.seller}</td>
                    <td style={{ fontWeight: '600' }}>S/ {sale.total.toFixed(2)}</td>
                    <td>
                      <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem' }}>
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
