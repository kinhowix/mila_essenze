import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION = 'products';

// Get all products
export async function getProducts() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get products by category
export async function getProductsByCategory(category) {
  const q = query(
    collection(db, COLLECTION),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get single product
export async function getProduct(id) {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// Add product
export async function addProduct(productData) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update product
export async function updateProduct(id, data) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete product
export async function deleteProduct(id) {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}

// Update stock
export async function updateStock(id, newStock) {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { stock: newStock });
}

// Upload product image
export async function uploadProductImage(file, productId) {
  const storageRef = ref(
    storage,
    `products/${productId}/${Date.now()}_${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

// Delete product image
export async function deleteProductImage(imageUrl) {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}
