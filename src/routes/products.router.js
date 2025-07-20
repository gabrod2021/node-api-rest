import {Router} from 'express';
import { getAllProducts,
        getProductsById,
        searchProducts,
        postProduct, 
        putProduct, 
        delProduct,
        applyDiscountToCategoryController } from '../controllers/products.controllers.js';

import { auth } from "../middlewares/auth.middleware.js";

const router = Router();


router.get('/search',searchProducts );

router.get('/:id',getProductsById);

router.get('/',getAllProducts);

router.post('/', auth, postProduct);

router.put('/discount', auth, applyDiscountToCategoryController); 

router.put('/:id',auth, putProduct);

router.delete('/:id', auth, delProduct);

export default router;

