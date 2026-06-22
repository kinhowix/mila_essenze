import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="produtos" element={<ProductPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
