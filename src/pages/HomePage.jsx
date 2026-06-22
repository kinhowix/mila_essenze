import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';

const mockProducts = [
  { id: 1, name: 'Essência de Canela', category: 'Essências', price: 25.00, stock: 10, description: 'Aroma quente e acolhedor, ideal para dias mais frios.', image: 'https://images.unsplash.com/photo-1608528577891-b20464f1cc88?w=400&q=80' },
  { id: 2, name: 'Spray de Lavanda', category: 'Sprays', price: 35.00, stock: 5, description: 'Perfeito para borrifar nos lençóis antes de dormir e garantir uma noite relaxante.', image: 'https://images.unsplash.com/photo-1612441804231-77a36b284856?w=400&q=80' },
  { id: 3, name: 'Kit Relaxamento', category: 'Kits', price: 85.00, stock: 0, description: 'Conjunto completo para um dia de spa em casa.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80' },
  { id: 4, name: 'Difusor de Alecrim', category: 'Difusores', price: 45.00, stock: 2, description: 'Aroma fresco que estimula a concentração e a memória.', image: 'https://images.unsplash.com/photo-1595906231920-c205e4624424?w=400&q=80' }
];

const HomePage = () => {
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
        <ProductGrid products={mockProducts} />
      </section>
    </div>
  );
};

export default HomePage;
