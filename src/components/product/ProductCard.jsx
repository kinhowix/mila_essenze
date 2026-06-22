import React from 'react';
import { useCart } from '../../context/CartContext';
import StockBadge from './StockBadge';
import './productCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="card product-card animate-scale-in">
      <div className="product-image-container">
        <img 
          src={product.image || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="product-image"
        />
        <div className="product-badge-overlay">
          <StockBadge stock={product.stock} />
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">R$ {product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Indisponível' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
