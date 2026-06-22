import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './cartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remover</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
