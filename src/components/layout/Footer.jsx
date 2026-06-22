import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--dark)', color: 'var(--cream)', padding: 'var(--space-2xl) 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>Mila Essenza</h2>
        <p style={{ color: 'var(--beige-dark)', textAlign: 'center' }}>Aromas que transformam seu ambiente.</p>
        <div style={{ marginTop: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--brown-light)' }}>
          &copy; {new Date().getFullYear()} Mila Essenza. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
