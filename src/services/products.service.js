const products=[
  {id : 1,"nombre": "zapatillas","precio":30000,"cantidad":100},
  {id : 2,"nombre": "remeras","precio":40000,"cantidad":200},
  {id : 3,"nombre": "calzas","precio":20000,"cantidad":1000},
  {id : 4,"nombre": "joggin","precio":50000,"cantidad":500},
  {id : 5,"nombre": "short","precio":10000,"cantidad":160},
]

export const getAllProducts = () => {
    return products;
};

export const getProductsById = (id) => {
    const productId = parseInt(id, 10);
    return products.find((item) => item.id === productId);
};

export const createProduct = (nombre, precio, cantidad) => {
     const newProduct = {
        id: products.length + 1,
        nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10)
    };
    
    products.push(newProduct); 
    
    return newProduct; 
};

export const updateProduct = (id, precio, cantidad) => {
    const productId = parseInt(id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
         res.status(404).json({ error: 'No existe el producto' });
    }

    products[productIndex] = {
        id: productId, 
        nombre: products[productIndex].nombre, 
        precio: parseFloat(precio), 
        cantidad: parseInt(cantidad, 10)
    };

    return products[productIndex];
};

export const deleteProduct = (id) => {
    const productId = parseInt(id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return false; 
    }

    products.splice(productIndex, 1); 

    return true; 
};

    