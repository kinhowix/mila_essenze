import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AdminLogin from '../components/admin/AdminLogin';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products' ou 'orders'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="container section loading-screen">
        <div className="spinner"></div>
        <p>Carregando painel...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container section">
        <AdminLogin />
      </div>
    );
  }

  return (
    <div className="container section animate-fade-in">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Painel Administrativo</h2>
        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Sair</button>
      </div>
      
      <div className="admin-dashboard">
        <div className="admin-sidebar">
          <button 
            className={`admin-menu-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Produtos
          </button>
          <button 
            className={`admin-menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛍️ Pedidos
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'orders' && <OrderManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
