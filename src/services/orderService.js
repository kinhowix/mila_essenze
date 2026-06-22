import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

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
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, orderNumber };
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
