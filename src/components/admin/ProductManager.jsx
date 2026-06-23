import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Essências',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      alert("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setFormData({ name: '', category: 'Essências', price: '', stock: '', description: '', image: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({ ...product });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        alert("Produto atualizado com sucesso!");
      } else {
        await addProduct(formData);
        alert("Produto adicionado com sucesso!");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert("Erro ao salvar produto.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id);
        alert("Produto excluído!");
        fetchProducts();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  };

  if (loading && products.length === 0) return <p>Carregando produtos...</p>;

  return (
    <div className="animate-fade-in">
      <div className="admin-panel-header">
        <h3>Gerenciar Produtos</h3>
        <button className="btn btn-primary btn-sm" onClick={openAddModal}>Adicionar Produto</button>
      </div>

      <div className="admin-list">
        {products.map(product => (
          <div key={product.id} className="admin-list-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} referrerPolicy="no-referrer" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <strong>{product.name}</strong> <span style={{ fontSize: '0.8rem', color: 'var(--brown-light)' }}>({product.category})</span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--brown-medium)' }}>
                  R$ {Number(product.price).toFixed(2)} — Estoque: {product.stock}
                </p>
              </div>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }} onClick={() => openEditModal(product)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Excluir</button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p style={{ textAlign: 'center', color: 'var(--brown-light)' }}>Nenhum produto cadastrado.</p>}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nome do Produto</label>
                  <input type="text" className="form-input" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="form-group">
                    <label className="form-label">Preço (R$)</label>
                    <input type="number" step="0.01" className="form-input" name="price" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estoque</label>
                    <input type="number" className="form-input" name="stock" value={formData.stock} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <select className="form-input" name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Essências">Essências</option>
                    <option value="Sprays">Sprays</option>
                    <option value="Kits">Kits</option>
                    <option value="Difusores">Difusores</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Link da Imagem (URL)</label>
                  <input type="url" className="form-input" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://i.ibb.co/..." />
                  {formData.image && (
                    <div style={{ marginTop: '8px' }}>
                      <img src={formData.image} alt="Preview" referrerPolicy="no-referrer" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '4px', border: '1px solid var(--brown-light)' }} onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                  )}
                  <small style={{ color: 'var(--brown-light)', fontSize: '0.8rem' }}>
                    Use o link direto da imagem (ex: <code>https://i.ibb.co/xyz/nome.jpg</code>).<br />
                    No ImgBB: clique na imagem &gt; "Embed codes" &gt; "Direct link". Não use o link da página.
                  </small>
                </div>

                <div className="form-group">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-input form-textarea" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
