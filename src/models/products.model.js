import fs from 'fs'
import path from 'path'
const __dirname = import.meta.dirname

const jsonPath =  path.join(__dirname, "./products.json");

const json = fs.readFileSync(jsonPath,"utf-8");

const products = JSON.parse(json);

console.log(products);

import {db} from './data.js'
import { collection,getDoc,getDocs,doc, addDoc, deleteDoc,updateDoc,writeBatch,query,where } from 'firebase/firestore';
const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
    
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({id:doc.id,...doc.data() }));
    } catch(error) {
        console.error(error);
    }
};

export const getProductsById = async (id) => {
    try{
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        return snapshot.exists() ? {id:snapshot.id,...snapshot.data()} : null;
        
    }catch(error) {
        console.error(`Error al obtener el producto con ${id}: `,error);
        throw error;
   }
};

export const createProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsCollection, productData); // Aquí se usa addDo
        return { id: docRef.id, ...productData };
    } catch (error) {
        console.error("Error al agregar producto a Firestore:", error);
        throw error;
    }
};

export const updateProduct = async (id, updatedFields) => {
    try {
        const productRef = doc(productsCollection, id); 

        await updateDoc(productRef, updatedFields);

        return { id, ...updatedFields }; 
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id} en Firestore: `, error);
        throw error; 
    }
};

export const deleteProduct = async (id) => {
    try{
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists){
            return false;
        }
        await deleteDoc(productRef);
        return true;
    } catch(error){
        console.error(error)
    }
}

export const applyDiscountToCategoryInFirestore = async (category, discount) => {
    try {
        console.log(`[MODELO - DESCUENTO INICIADO] Aplicando ${discount * 100}% de descuento a la categoría: ${category}`);

        const q = query(productsCollection, where("categoria", "==", category));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
        
            return { updatedCount: 0, message: `No se encontraron productos en la categoría '${category}'.` };
        }

        const batch = writeBatch(db);
        let updatedCount = 0;
        let productsToUpdate = [];

        querySnapshot.forEach((documentSnapshot) => {
            const currentProduct = documentSnapshot.data();
            const oldPrice = currentProduct.precio;
            const productId = documentSnapshot.id;

            const priceAsNumber = parseFloat(oldPrice);

            if (isNaN(priceAsNumber)) {
                console.warn(`[MODELO - DESCUENTO - ADVERTENCIA] Producto ${productId} tiene un precio inválido: ${oldPrice}. Saltando.`);
                return;
            }

            const newPrice = priceAsNumber * (1 - discount);
            const roundedNewPrice = parseFloat(newPrice.toFixed(2));

            const productRef = doc(productsCollection, productId);

            batch.update(productRef, { precio: roundedNewPrice });
            updatedCount++;
            productsToUpdate.push({ id: productId, oldPrice, newPrice: roundedNewPrice });

            console.log(`[MODELO - DESCUENTO - PREPARADO] Producto '${productId}' - Precio anterior: ${oldPrice}, Nuevo precio: ${roundedNewPrice}`);
        });

        await batch.commit(); // ¡Esto guarda los cambios en Firebase!
        
        return { updatedCount, message: `Descuento aplicado a ${updatedCount} productos en la categoría '${category}'.` };

    } catch (error) {
        console.error(`Error al aplicar descuento a la categoría ${category} en Firestore: `, error);
        throw error;
    }
};
