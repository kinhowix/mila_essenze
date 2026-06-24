import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, updateProofStatus, confirmOrderAndDecrement } from '../../services/orderService';

const statusMap = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = timestamp?.toDate?.() || new Date(timestamp);
  return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
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
      if (status === 'confirmed') {
        // Get the order to access items
        const order = orders.find(o => o.id === id);
        if (order && order.items && order.items.length > 0) {
          // Call the function that confirms and decrements stock
          await confirmOrderAndDecrement(id, order.items);
        } else {
          await updateOrderStatus(id, status);
        }
      } else {
        await updateOrderStatus(id, status);
      }
      await loadOrders();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  const handleProofStatus = async (id, received) => {
    try {
      await updateProofStatus(id, received);
      await loadOrders();
    } catch (error) {
      console.error('Erro ao atualizar comprovante:', error);
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
            <div style={{ flex: 1 }}>
              <strong>Pedido {order.orderNumber}</strong> — {order.customerName}
              <p style={{ margin: '4px 0', fontSize: '0.85rem', color: 'var(--brown-light)' }}>
                Total: R$ {Number(order.total || 0).toFixed(2)} — Status:{' '}
                <span style={{ color: 'var(--gold-dark)', fontWeight: 'bold' }}>
                  {statusMap[order.status] || order.status}
                </span>
              </p>
              <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#999' }}>
                Comprovante: {order.comprovanteEnviado ? '✅ Enviado' : '❌ Não enviado'}
                {order.dataComprovanteEnviado && ` em ${formatDate(order.dataComprovanteEnviado)}`}
              </p>
              {order.comprovanteEnviado && (
                <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#999' }}>
                  Recebido: {order.comprovanteRecebido ? '✅ Sim' : '⏳ Aguardando confirmação'}
                  {order.dataComprovanteRecebido && ` em ${formatDate(order.dataComprovanteRecebido)}`}
                </p>
              )}
            </div>
            <div>
              {order.comprovanteEnviado && !order.comprovanteRecebido && (
                <button
                  className="btn btn-info btn-sm"
                  style={{ backgroundColor: 'var(--blue)', color: 'white', marginRight: '8px' }}
                  onClick={() => handleProofStatus(order.id, true)}
                >
                  ✓ Comprovante OK
                </button>
              )}
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
