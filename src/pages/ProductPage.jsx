import React from 'react';
import ProductGrid from '../components/product/ProductGrid';

const mockProducts = [
  { id: 1, name: 'Essência de Canela', category: 'Essências', price: 25.00, stock: 10, description: 'Aroma quente e acolhedor, ideal para dias mais frios.', image: 'https://images.unsplash.com/photo-1608528577891-b20464f1cc88?w=400&q=80' },
  { id: 2, name: 'Spray de Lavanda', category: 'Sprays', price: 35.00, stock: 5, description: 'Perfeito para borrifar nos lençóis antes de dormir e garantir uma noite relaxante.', image: 'https://images.unsplash.com/photo-1612441804231-77a36b284856?w=400&q=80' },
  { id: 3, name: 'Kit Relaxamento', category: 'Kits', price: 85.00, stock: 0, description: 'Conjunto completo para um dia de spa em casa.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80' },
  { id: 4, name: 'Difusor de Alecrim', category: 'Difusores', price: 45.00, stock: 2, description: 'Aroma fresco que estimula a concentração e a memória.', image: 'https://images.unsplash.com/photo-1595906231920-c205e4624424?w=400&q=80' },
  { id: 5, name: 'Essência de Baunilha', category: 'Essências', price: 28.00, stock: 15, description: 'Aroma doce e reconfortante.', image: 'https://images.unsplash.com/photo-1522849696084-818b291c6bce?w=400&q=80' },
  { id: 6, name: 'Água de Lençóis - Bambu', category: 'Sprays', price: 32.00, stock: 8, description: 'Aroma leve e sofisticado.', image: 'https://images.unsplash.com/photo-1596223575327-99a5be4faf20?w=400&q=80' }
];

const ProductPage = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Produtos</h2>
        <div className="section-divider"></div>
      </div>
      <ProductGrid products={mockProducts} />
    </div>
  );
};

export default ProductPage;
