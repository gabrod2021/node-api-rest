//import * as service from "../services/products.service.js";
import * as productService from "../services/products.service.js"; 

export const getAllProducts = (req, res) => {
    res.json(service.getAllProducts());
};

export const searchProducts = (req, res) => {
    const {nombre} = req.query;

    const products = service.getAllProducts();

    const filteredProducts = products.filter((p) => 
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
);
res.json(filteredProducts);

};
export const getProductsById =  (req, res) => {
    const{id} = req.params;

    const product = service.getProductsById(id);
    

if(!product){
    res.status(404).json({error:"Producto inexistente"});
}
res.json(product);

};


export const postProduct = (req, res) => {

    console.log(req.body); 

    const { nombre, precio, cantidad } = req.body; 

    if (!nombre || !precio || !cantidad ) { 
        return res.status(400).json({ error: "Faltan campos obligatorios: nombre, precio, cantidad" });
    }

    const newProduct = service.createProduct(nombre, precio, cantidad);

    res.status(201).json(newProduct);
};

export const putProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const { precio, cantidad } = req.body;

    const updatedProduct = service.updateProduct(productId, precio, cantidad);

    if (!updatedProduct) {
        return res.status(404).json({ error: 'No existe el producto' });
    }

    res.json(updatedProduct);
};


export const delProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);

    const success = service.deleteProduct(productId); 

    if (!success) {
        return res.status(404).json({ error: 'No existe el producto para eliminar' });
    }

    res.status(202).json({ message: "Solicitud de eliminación aceptada" });
};

export const applyDiscountToCategoryController = (req, res) => {
    const { categoria, discount } = req.body; 

    if (!categoria || typeof discount !== 'number' || discount <= 0 || discount >= 1) {
        return res.status(400).json({ error: 'Categoría y/o descuento inválido.' }); 
    }
    try {
        const updatedProducts = productService.applyDiscountCat(categoria, discount); 
        res.status(200).json({ 
            message: `Descuento aplicado a "${categoria}".`,
            updatedProducts: updatedProducts
        });
    } catch (error) {
        console.error("Error al aplicar descuento:", error);
        res.status(500).json({ error: 'Hubo un problema al aplicar el descuento.' });
    }
};