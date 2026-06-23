import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts } from '../services/productService';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Produtos</h2>
        <div className="section-divider"></div>
      </div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando produtos...</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ProductPage;
