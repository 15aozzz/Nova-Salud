import React, { useState } from 'react';
import { ComprobanteForm } from './components/ComprobanteForm';
import { CustomerForm } from './components/CustomerForm';
import { CartTable } from './components/CartTable';
import { CartSummary } from './components/CartSummary';
import './POSPage.css';

export const POSPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Paisana extra 5k', price: 19.37, qty: 1 },
    { id: 2, name: 'Canchita natural', price: 3.44, qty: 12 }
  ]);
  
  const [tipoComprobante, setTipoComprobante] = useState('BOLETA');

  const updateQty = (id, newQty) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="pos-container">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#1e293b' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="radio" name="tipo_venta" defaultChecked /> Generar Venta y Enviar Comprobante
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="radio" name="tipo_venta" /> Solo Generar Venta
        </label>
      </div>

      <div className="pos-top-row">
        <ComprobanteForm tipo={tipoComprobante} setTipo={setTipoComprobante} />
        <CustomerForm tipoComprobante={tipoComprobante} />
      </div>
      <div className="pos-bottom-row">
        <CartTable items={cart} onUpdateQty={updateQty} onRemove={removeItem} />
        <CartSummary items={cart} />
      </div>
    </div>
  );
};
