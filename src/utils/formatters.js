// Format currency to BRL
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Format date
export function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Format phone number
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 13) {
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// Category labels
export const categoryLabels = {
  essencias: 'Essências',
  sprays: 'Sprays',
  kits: 'Kits',
  difusores: 'Difusores',
};

// Status labels
export const statusLabels = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};
