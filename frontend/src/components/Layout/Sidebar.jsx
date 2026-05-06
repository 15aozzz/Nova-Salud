import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Package, ListTree } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">N</div>
        <div>
          <div className="logo-text">Nova Salud</div>
          <div className="logo-subtext">Administración</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
          <Home size={18} /> Inicio
        </NavLink>
        <NavLink to="/pos" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FileText size={18} /> Facturación
        </NavLink>
        <NavLink to="/inventario" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Package size={18} /> Inventario
        </NavLink>
        <NavLink to="/ventas" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ListTree size={18} /> Ventas
        </NavLink>
      </nav>
    </aside>
  );
};
