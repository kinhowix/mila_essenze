import React, { useState } from 'react';

const ProductManager = () => {
  // Dados provisórios
  const [products] = useState([
    { id: 1, name: 'Essência de Canela', price: 25.0, stock: 10 },
    { id: 2, name: 'Spray de Lavanda', price: 35.0, stock: 5 }
  ]);

  return (
    <div className="animate-fade-in">
      <div className="admin-panel-header">
        <h3>Gerenciar Produtos</h3>
        <button className="btn btn-primary btn-sm">Adicionar Produto</button>
      </div>

      <div className="admin-list">
        {products.map(product => (
          <div key={product.id} className="admin-list-item">
            <div>
              <strong>{product.name}</strong>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--brown-light)' }}>
                R$ {product.price.toFixed(2)} — Estoque: {product.stock}
              </p>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>Editar</button>
              <button className="btn btn-danger btn-sm">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
