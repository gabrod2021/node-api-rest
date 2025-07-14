import {Router} from 'express';
import { getAllProducts,
        getProductsById,
        searchProducts,
        postProduct, 
        putProduct, 
        delProduct,
        applyDiscountToCategoryController } from '../controllers/products.controllers.js';


const router = Router();


router.get('/products/search',searchProducts );

router.get('/:id',getProductsById);

router.get('/',getAllProducts);

router.post('/', postProduct);

router.put('/discount', applyDiscountToCategoryController); 

router.put('/:id', putProduct);

router.delete('/:id', delProduct);

export default router;

