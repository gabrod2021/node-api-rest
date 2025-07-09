
import * as model from '../models/products.model.js';

export const getAllProducts = () => {
    return model.getAllProducts();
};

export const getProductsById = (id) => {
    const productId = parseInt(id, 10);
    return model.getProductsById(id).find((item) =>item.id === productId);
};

export const createProduct = (nombre, precio, cantidad) => {
    return model.createProduct(nombre, precio, cantidad);
};


export const updateProduct = (id, precio, cantidad) => {
    const updatedProduct = model.updateProduct(id, precio, cantidad); 
    return updatedProduct; 
};


export const deleteProduct = (id) => {
    return model.deleteProduct(id);
};   

export const applyDiscountCat = (categoria, discount) => {
    const currentProducts = model.getAllProducts(); 
    const productsWithDiscount = currentProducts.map(product => {
        if (product.categoria === categoria) { 
            const newPrice = product.precio * (1 - discount); 
            return { ...product, precio: newPrice }; 
        }
        return product;
    });

    model.saveAllProducts(productsWithDiscount); 

    return productsWithDiscount;
    console.log(productsWithDiscount);

};