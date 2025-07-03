import {Router} from 'express';
import { getAllProducts,
        getProductsById,
        searchProducts,
        postProduct, 
        putProduct, 
        delProduct } from '../controllers/products.controllers.js';


const router = Router();


router.get('/products/',getAllProducts);

router.get('/products/search',searchProducts );

router.get('/products/:id',getProductsById);

router.post('/products', postProduct);

router.put('/products/:id', putProduct);

router.delete('/products/:id', delProduct);

export default router;

