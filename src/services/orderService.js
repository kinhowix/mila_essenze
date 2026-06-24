import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { updateProduct } from './productService';

const COLLECTION = 'orders';

// Generate order number
function generateOrderNumber() {
  const now = new Date();
  const num = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `ME-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${num}`;
}

// Create order
export async function createOrder(orderData) {
  const orderNumber = generateOrderNumber();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...orderData,
    orderNumber,
    status: 'pending',
    comprovanteEnviado: false,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, orderNumber };
}

// Mark payment proof as sent
export async function markProofSent(orderId) {
  const docRef = doc(db, COLLECTION, orderId);
  await updateDoc(docRef, {
    comprovanteEnviado: true,
    dataComprovanteEnviado: serverTimestamp(),
  });
}

// Get all orders
export async function getOrders() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Update order status
export async function updateOrderStatus(id, status) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

// Update payment proof status (mark as received by admin)
export async function updateProofStatus(id, received) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    comprovanteRecebido: received,
    dataComprovanteRecebido: received ? serverTimestamp() : null,
  });
}

// Delete an order
export async function deleteOrder(id) {
  const orderRef = doc(db, COLLECTION, id);
  await deleteDoc(orderRef);
}

// Decrement product stock when order is confirmed
export async function decrementProductStock(items) {
  try {
    for (const item of items) {
      const currentStock = item.currentStock || 0;
      const newStock = Math.max(0, currentStock - item.quantity);
      await updateProduct(item.id, {
        stock: newStock
      });
    }
  } catch (error) {
    console.error('Erro ao decrementar estoque:', error);
    throw error;
  }
}

// Confirm order and decrement stock
export async function confirmOrderAndDecrement(orderId, items) {
  try {
    await updateOrderStatus(orderId, 'confirmed');
    await decrementProductStock(items);
  } catch (error) {
    console.error('Erro ao confirmar pedido e decrementar estoque:', error);
    throw error;
  }
}
