
import * as model from '../models/products.model.js';

export const getAllProducts = async() => {
    return await model.getAllProducts();
};

export const getProductsById = async(id) => {
    return await model.getProductsById(id);
};

export const createProduct = async(nombre, precio, cantidad,categoria) => {
    return await model.createProduct(nombre, precio, cantidad,categoria);
};


export const updateProduct = async (id, updatedFields) => {
    return await model.updateProduct(id, updatedFields);
};


export const deleteProduct = async (id) => {
    return await model.deleteProduct(id);
};   

export const applyDiscountCat = async (categoria, discount) => {
    if (typeof categoria !== 'string' || !categoria.trim()) {
        throw new Error("La categoría debe ser una cadena de texto no vacía.");
    }
    if (typeof discount !== 'number' || discount <= 0 || discount >= 1) {
        throw new Error("El porcentaje de descuento debe ser un número (decimal) entre 0 (exclusivo) y 1 (exclusivo).");
    }

    const result = await model.applyDiscountToCategoryInFirestore(categoria, discount);

    return result; 
};