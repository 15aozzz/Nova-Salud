import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import './HomePage.css';

export const HomePage = () => {
  const stats = [
    { title: 'Ventas de Hoy', value: 'S/ 1,240.50', icon: <DollarSign size={24} color="#3b82f6" />, bg: '#eff6ff' },
    { title: 'Órdenes', value: '42', icon: <ShoppingBag size={24} color="#10b981" />, bg: '#ecfdf5' },
    { title: 'Nuevos Clientes', value: '12', icon: <Users size={24} color="#f59e0b" />, bg: '#fffbeb' },
    { title: 'Crecimiento', value: '+14%', icon: <TrendingUp size={24} color="#8b5cf6" />, bg: '#f5f3ff' },
  ];

  return (
    <div className="home-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Resumen General</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bienvenido al panel de control de Botica Nova Salud.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="card stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.bg }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Últimas Ventas</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Comprobante</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>B001-000001</td>
                <td>Consumidor Final</td>
                <td>05 May 2026</td>
                <td>S/ 33.50</td>
                <td><span className="badge success">Completado</span></td>
              </tr>
              <tr>
                <td>F001-000001</td>
                <td>Farmacia del Pueblo SAC</td>
                <td>05 May 2026</td>
                <td>S/ 140.00</td>
                <td><span className="badge success">Completado</span></td>
              </tr>
              <tr>
                <td>B001-000002</td>
                <td>Juan García Pérez</td>
                <td>04 May 2026</td>
                <td>S/ 12.50</td>
                <td><span className="badge success">Completado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Stock Crítico</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="stock-alert">
              <div style={{ fontWeight: '500' }}>Paracetamol 120mg</div>
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>Quedan 5 unidades (Mín: 20)</div>
            </div>
            <div className="stock-alert">
              <div style={{ fontWeight: '500' }}>Vitamina C 1000mg</div>
              <div style={{ color: 'var(--warning)', fontSize: '0.85rem' }}>Vence el 30 Jun 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
