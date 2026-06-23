import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../services/orderService';

const statusMap = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      await loadOrders();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando pedidos...</p>;
  }

  return (
    <div className="animate-fade-in">
      <div className="admin-panel-header">
        <h3>Gerenciar Pedidos</h3>
      </div>

      <div className="admin-list">
        {orders.map(order => (
          <div key={order.id} className="admin-list-item">
            <div>
              <strong>Pedido {order.orderNumber}</strong> — {order.customerName}
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--brown-light)' }}>
                Total: R$ {Number(order.total || 0).toFixed(2)} — Status:{' '}
                <span style={{ color: 'var(--gold-dark)', fontWeight: 'bold' }}>
                  {statusMap[order.status] || order.status}
                </span>
              </p>
            </div>
            <div>
              <button
                className="btn btn-success btn-sm"
                style={{ backgroundColor: 'var(--green)', color: 'white', marginRight: '8px' }}
                onClick={() => handleStatus(order.id, 'confirmed')}
                disabled={order.status !== 'pending'}
              >
                Confirmar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleStatus(order.id, 'cancelled')}
                disabled={order.status !== 'pending'}
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
      </div>
    </div>
  );
};

export default OrderManager;
