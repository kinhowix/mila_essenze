import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

const collectionName = 'products';

// Obter todos os produtos
export const getProducts = async () => {
  try {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    throw error;
  }
};

// Adicionar um novo produto
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...productData,
      createdAt: serverTimestamp(),
      stock: Number(productData.stock),
      price: Number(productData.price)
    });
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Erro ao adicionar produto: ", error);
    throw error;
  }
};

// Atualizar um produto existente
export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, collectionName, id);
    const dataToUpdate = { ...updatedData };
    if (dataToUpdate.stock !== undefined) dataToUpdate.stock = Number(dataToUpdate.stock);
    if (dataToUpdate.price !== undefined) dataToUpdate.price = Number(dataToUpdate.price);
    
    await updateDoc(productRef, dataToUpdate);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar produto: ", error);
    throw error;
  }
};

// Deletar um produto
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, collectionName, id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Erro ao deletar produto: ", error);
    throw error;
  }
};
