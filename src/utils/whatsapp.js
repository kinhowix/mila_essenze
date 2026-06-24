export const generateWhatsAppMessage = (orderData, cartItems, cartTotal) => {
  const { customerName, customerPhone, deliveryMethod, address } = orderData;
  
  let message = `Olá! Acabei de fazer um pedido na Mila Essenza 🌸\n\n`;
  message += `*Cliente:* ${customerName}\n`;
  message += `*Telefone:* ${customerPhone}\n\n`;
  
  message += `*Resumo do Pedido:*\n`;
  cartItems.forEach(item => {
    message += `- ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
  });
  
  message += `\n*Total do Pedido: R$ ${cartTotal.toFixed(2)}*\n\n`;
  
  message += `*Entrega:* Retirada pelo WhatsApp\n`;
  
  message += `\nSegue meu comprovante PIX abaixo.`;
  
  return encodeURIComponent(message);
};

export const getWhatsAppLink = (phoneNumber, message) => {
  // Remove caracteres não numéricos do telefone
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${message}`;
};
