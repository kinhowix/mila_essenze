import React, { useState } from 'react';

const OrderManager = () => {
  // Dados provisórios
  const [orders] = useState([
    { id: 'ME-001', customer: 'João Silva', total: 95.0, status: 'Pendente' }
  ]);

  return (
    <div className="animate-fade-in">
      <div className="admin-panel-header">
        <h3>Gerenciar Pedidos</h3>
      </div>

      <div className="admin-list">
        {orders.map(order => (
          <div key={order.id} className="admin-list-item">
            <div>
              <strong>Pedido {order.id}</strong> — {order.customer}
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--brown-light)' }}>
                Total: R$ {order.total.toFixed(2)} — Status: <span style={{ color: 'var(--gold-dark)', fontWeight: 'bold' }}>{order.status}</span>
              </p>
            </div>
            <div>
              <button className="btn btn-success btn-sm" style={{ backgroundColor: 'var(--green)', color: 'white', marginRight: '8px' }}>Confirmar</button>
              <button className="btn btn-danger btn-sm">Cancelar</button>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
      </div>
    </div>
  );
};

export default OrderManager;
