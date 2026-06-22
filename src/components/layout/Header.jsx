import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './header.css';

const Header = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Mila Essenza
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/produtos" className="nav-link">Produtos</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
        <div className="header-actions">
          <button className="cart-btn" aria-label="Abrir carrinho" onClick={toggleCart}>
            🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
