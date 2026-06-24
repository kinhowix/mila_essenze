import React from 'react';
import './productCard.css';

const StockBadge = ({ stock }) => {
  if (stock <= 0) {
    return <span className="badge badge-danger">Esgotado</span>;
  }
  if (stock <= 5) {
    return <span className="badge badge-warning">Disponível {stock}</span>;
  }
  return <span className="badge badge-success">Em estoque</span>;
};

export default StockBadge;
