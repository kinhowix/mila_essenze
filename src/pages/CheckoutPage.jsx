import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import PixPayment from '../components/checkout/PixPayment';
import { createOrder } from '../services/orderService';
import '../components/checkout/checkout.css';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Form, 2: PIX
  const [orderSent, setOrderSent] = useState(false);
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryMethod: 'pickup', // 'pickup' ou 'delivery'
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: ''
    }
  });

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="container section animate-fade-in">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos antes de finalizar a compra.</p>
          <button className="btn btn-primary" onClick={() => navigate('/produtos')}>Ver Produtos</button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setOrderData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setOrderData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const handleCreateOrder = async () => {
    setOrderError(null);
    if (cartItems.length === 0) {
      setOrderError('O carrinho está vazio. Adicione produtos antes de enviar o pedido.');
      return false;
    }

    const orderPayload = {
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryMethod: orderData.deliveryMethod,
      address: orderData.deliveryMethod === 'delivery' ? orderData.address : null,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartTotal,
      status: 'pending',
    };

    try {
      setIsSubmittingOrder(true);
      await createOrder(orderPayload);
      clearCart();
      setOrderSent(true);
      return true;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      setOrderError('Não foi possível registrar o pedido. Tente novamente.');
      return false;
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (orderSent) {
    return (
      <div className="container section animate-fade-in">
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <h3>Pedido enviado!</h3>
          <p>O comprovante foi aberto no WhatsApp e o carrinho foi limpo.</p>
          <button className="btn btn-primary" onClick={() => navigate('/produtos')}>
            Continuar comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Finalizar Pedido</h2>
        <div className="section-divider"></div>
      </div>

      <div className="checkout-container">
        {step === 1 ? (
          <form className="checkout-form-section" onSubmit={handleProceedToPayment}>
            <h3>Seus Dados</h3>
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <input 
                type="text" 
                className="form-input" 
                name="customerName" 
                value={orderData.customerName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp (com DDD)</label>
              <input 
                type="tel" 
                className="form-input" 
                name="customerPhone" 
                value={orderData.customerPhone} 
                onChange={handleInputChange} 
                placeholder="(11) 99999-9999"
                required 
              />
            </div>

            <h3 style={{ marginTop: 'var(--space-xl)' }}>Entrega</h3>
            <div className="form-group">
              <select 
                className="form-input" 
                name="deliveryMethod" 
                value={orderData.deliveryMethod} 
                onChange={handleInputChange}
              >
                <option value="pickup">Retirar Pessoalmente</option>
                <option value="delivery">Entrega no meu Endereço</option>
              </select>
            </div>

            {orderData.deliveryMethod === 'delivery' && (
              <div className="address-fields animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Rua</label>
                  <input type="text" className="form-input" name="address.street" value={orderData.address.street} onChange={handleInputChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-md)' }}>
                  <div className="form-group">
                    <label className="form-label">Número</label>
                    <input type="text" className="form-input" name="address.number" value={orderData.address.number} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bairro</label>
                    <input type="text" className="form-input" name="address.neighborhood" value={orderData.address.neighborhood} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Cidade</label>
                  <input type="text" className="form-input" name="address.city" value={orderData.address.city} onChange={handleInputChange} required />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
              Ir para Pagamento
            </button>
          </form>
        ) : (
          <div className="checkout-form-section">
            <PixPayment
              orderData={orderData}
              cartItems={cartItems}
              cartTotal={cartTotal}
              onOrderSubmit={handleCreateOrder}
              isSubmitting={isSubmittingOrder}
              orderError={orderError}
            />
            <button className="btn btn-secondary btn-sm" onClick={() => setStep(1)} style={{ marginTop: 'var(--space-lg)', width: '100%' }}>
              Voltar para os dados
            </button>
          </div>
        )}

        <div className="checkout-summary-section">
          <h3>Resumo do Pedido</h3>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.quantity}x {item.name}</span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-total">
            <span>Total</span>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
