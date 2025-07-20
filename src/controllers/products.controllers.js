import * as productService from "../services/products.service.js"; 

export const getAllProducts = async (req, res) => {
    try {
        
        const products = await productService.getAllProducts();
    
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor al obtener productos." });
    }
};

export const searchProducts = async (req, res) => {
    const {nombre} = req.query;

    const products = await productService.getAllProducts();

    const filteredProducts = products.filter((p) => 
        p.nombre.toLowerCase().includes(nombre.toLowerCase())
    
);
res.json(filteredProducts);

};
export const getProductsById = async (req, res) => {
    const{id} = req.params;

    const product = await productService.getProductsById(id);
    
if(!product){
    res.status(404).json({error:"Producto inexistente"});
}
res.json(product);

};

export const postProduct = async (req, res) => { 
    try {
        const newProductData = req.body; 

        if (!newProductData || typeof newProductData !== 'object' || Object.keys(newProductData).length === 0) {
            return res.status(400).json({ message: "Datos del producto no válidos o vacíos. Se espera un objeto JSON." });
        }
        const addedProduct = await productService.createProduct(newProductData);
        
    res.status(201).json({ message: "Producto agregado exitosamente", product: addedProduct });

    } catch (error) {
        console.error("Error al agregar el producto en el controlador:", error);    
    }
};

export const putProduct = async (req, res) => {
    const { id } = req.params; 
    const updatedFields = req.body; 
    
    if (!updatedFields || Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: "No se proporcionaron campos para actualizar." });
    }

    try {
        const result = await productService.updateProduct(id, updatedFields);
        
        res.status(200).json({ message: "Producto actualizado exitosamente", updatedData: result });

    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id} en el controlador:`, error);
        
        if (error.code === 'not-found') { 
            return res.status(404).json({ message: "Producto no encontrado para actualizar." });
        }
        res.status(500).json({ message: "Error interno del servidor al actualizar el producto." });
    }
};

export const delProduct = async (req, res) => {
    const productId = req.params.id;

    const success = await productService.deleteProduct(productId); 

    if (!success) {
        return res.status(404).json({ error: 'No existe el producto para eliminar' });
    }

    res.status(202).json({ message: "Solicitud de eliminación aceptada" });
};

export const applyDiscountToCategoryController = async (req, res) => {
    const { categoria, discount } = req.body; 

    if (!categoria || typeof discount !== 'number' || discount <= 0 || discount >= 1) {
        return res.status(400).json({ error: 'Categoría y/o descuento inválido.' }); 
    }
    try {
        const updatedProducts = await productService.applyDiscountCat(categoria, discount); 
        res.status(200).json({ 
            message: `Descuento aplicado a "${categoria}".`,
            updatedProducts: updatedProducts
        });
    } catch (error) {
        console.error("Error al aplicar descuento:", error);
        res.status(500).json({ error: 'Hubo un problema al aplicar el descuento.' });
    }
};