import fs from 'fs'
import path from 'path'
const __dirname = import.meta.dirname

const jsonPath =  path.join(__dirname, "./products.json");

const json = fs.readFileSync(jsonPath,"utf-8");

const products = JSON.parse(json);

console.log(products);

export const getAllProducts = () => {
    return products;
};

export const getProductsById = () =>{
    return products;
}

export const createProduct = (nombre, precio, cantidad) => {
     const newProduct = {
        id: products.length + 1,
        nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10)
    };
    
   products.push(newProduct); 

   fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
         
    return newProduct; 
};
export const updateProduct = (id, newPrecio, newCantidad) => {
    const productId = parseInt(id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return null; 
    }

    products[productIndex] = {
        id: productId,
        nombre: products[productIndex].nombre, 
        precio: parseFloat(newPrecio),
        cantidad: parseInt(newCantidad, 10)
    };

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
    return products[productIndex];
};

export const deleteProduct = (id) => {
    const productId = parseInt(id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return false; 
    }

    products.splice(productIndex, 1); 

 fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");

    return true; 
};

export const saveAllProducts = (updatedProductsArray) => {

    products.splice(0, products.length, ...updatedProductsArray); 

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");

    return products; 
};


