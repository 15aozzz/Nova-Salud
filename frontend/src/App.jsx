import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { POSPage } from './pages/POS/POSPage';
import { InventoryPage } from './pages/Inventory/InventoryPage';
import { SalesPage } from './pages/Sales/SalesPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pos" element={<POSPage />} />
          <Route path="/inventario" element={<InventoryPage />} />
          <Route path="/ventas" element={<SalesPage />} />
          <Route path="*" element={
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <h2>Página en construcción 🚧</h2>
              <p style={{color: 'var(--text-muted)'}}>Esta sección estará disponible pronto.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
