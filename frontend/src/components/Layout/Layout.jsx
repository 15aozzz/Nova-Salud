import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};
