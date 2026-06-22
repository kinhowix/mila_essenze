import React from 'react';
import { getWhatsAppLink, generateWhatsAppMessage } from '../../utils/whatsapp';

const PixPayment = ({ orderData, cartItems, cartTotal }) => {
  // Dados reais da loja
  const pixKey = "camila@oticasparisssul.com.br"; 
  const pixName = "Camila Boursheid Pessalli de Oliveira";
  const storePhone = "5551992653899";

  const handleWhatsAppRedirect = () => {
    const message = generateWhatsAppMessage(orderData, cartItems, cartTotal);
    const link = getWhatsAppLink(storePhone, message);
    window.open(link, '_blank');
  };

  return (
    <div className="pix-payment">
      <div className="pix-header">
        <h3>Pagamento via PIX</h3>
        <p>Sua compra está quase finalizada!</p>
      </div>

      <div className="pix-instructions">
        <ol>
          <li>Abra o app do seu banco.</li>
          <li>Escolha a opção PIX e depois Transferir ou Copia e Cola.</li>
          <li>Utilize a chave abaixo para realizar o pagamento no valor de <strong>R$ {cartTotal.toFixed(2)}</strong>.</li>
        </ol>
      </div>

      <div className="pix-key-box">
        <p className="pix-label">Chave PIX (E-mail):</p>
        <div className="pix-key-display">
          <code>{pixKey}</code>
          <button 
            className="btn btn-sm btn-secondary" 
            onClick={() => {
              navigator.clipboard.writeText(pixKey);
              alert("Chave PIX copiada!");
            }}
          >
            Copiar
          </button>
        </div>
        <p className="pix-name-label">Titular: {pixName}</p>
      </div>

      <div className="pix-warning">
        <div className="pix-warning-icon">⚠️</div>
        <p>
          Após o pagamento, é <strong>obrigatório</strong> enviar o comprovante pelo WhatsApp 
          para confirmarmos o seu pedido e reservarmos o estoque.
        </p>
      </div>

      <button className="btn btn-whatsapp btn-lg" onClick={handleWhatsAppRedirect}>
        📱 Enviar Comprovante no WhatsApp
      </button>
    </div>
  );
};

export default PixPayment;
