import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import '../POS/POSPage.css'; // Reutilizamos los estilos del POS

export const InventoryPage = () => {
  // Datos simulados basados en tu DB
  const inventory = [
    { id: 1, name: 'Diclofenaco 75mg/5mL', category: 'Antiinflamatorios', stock: 200, minStock: 20, price: 3.50, expiry: '2026-12-31' },
    { id: 2, name: 'Paracetamol 120mg/5mL', category: 'Analgésicos', stock: 5, minStock: 20, price: 12.50, expiry: '2026-06-30' },
    { id: 3, name: 'Amoxicilina 500mg', category: 'Antibióticos', stock: 300, minStock: 50, price: 15.00, expiry: '2025-12-31' },
    { id: 4, name: 'Vitamina C 1000mg', category: 'Vitaminas', stock: 500, minStock: 30, price: 1.50, expiry: '2027-01-01' }
  ];

  return (
    <div className="pos-container">
      <div className="pos-panel" style={{ flex: 1 }}>
        <div className="pos-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} color="var(--primary)" />
            Inventario de Productos
          </div>
          <button className="btn btn-primary">
            + Nuevo Producto
          </button>
        </div>
        <div className="pos-panel-body">
          <div className="input-group" style={{ maxWidth: '300px', marginBottom: '1rem' }}>
            <input type="text" className="input-field" placeholder="Buscar medicamento por nombre o principio activo..." />
          </div>
          <div className="pos-table-wrapper">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio Venta</th>
                  <th>Stock Actual</th>
                  <th>Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td>{item.category}</td>
                    <td>S/ {item.price.toFixed(2)}</td>
                    <td style={{ color: item.stock <= item.minStock ? 'var(--danger)' : 'inherit', fontWeight: item.stock <= item.minStock ? '600' : 'normal' }}>
                      {item.stock} {item.stock <= item.minStock && <AlertTriangle size={14} style={{ display: 'inline', marginLeft: '4px' }} />}
                    </td>
                    <td>{item.expiry}</td>
                    <td>
                      {item.stock <= item.minStock ? (
                         <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>Stock Crítico</span>
                      ) : (
                         <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>Normal</span>
                      )}
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
