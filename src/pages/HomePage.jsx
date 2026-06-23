import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts } from '../services/productService';

const HomePage = () => {
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
    <div className="animate-fade-in-up">
      <section className="section" style={{ textAlign: 'center', backgroundColor: 'var(--surface-secondary)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <h1 style={{ color: 'var(--gold-dark)', marginBottom: 'var(--space-md)' }}>Bem-vindo à Mila Essenza</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-xl)' }}>
            Descubra aromas exclusivos para transformar sua casa em um verdadeiro refúgio de bem-estar.
          </p>
          <Link to="/produtos" className="btn btn-primary btn-lg">Explorar Produtos</Link>
        </div>
      </section>
      
      <section className="section container">
        <div className="section-header">
          <h2>Nossos Produtos</h2>
          <div className="section-divider"></div>
          <p>Essências, sprays e difusores selecionados com carinho.</p>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando produtos...</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
