import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container section animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="empty-state">
        <div className="empty-state-icon" style={{ fontSize: '6rem' }}>404</div>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página não encontrada</h3>
        <p style={{ marginBottom: '2rem' }}>A página que você está procurando não existe ou foi movida.</p>
        <a href="/" className="btn btn-primary">Voltar para Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
