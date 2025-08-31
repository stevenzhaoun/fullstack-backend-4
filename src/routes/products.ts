import { Router } from "express";
import { listProducts, createProduct, getProduct } from "../controller/products";
import { authorization } from "../middlewares/authorization";
import { PERMISSIONS } from "../constants";

const router = Router();

router.get('/products', authorization([PERMISSIONS.PRODUCTS.READ]), listProducts)
router.post('/products', authorization([PERMISSIONS.PRODUCTS.EDIT]), createProduct)
router.get('/products/:id', authorization([PERMISSIONS.PRODUCTS.READ]), getProduct)
export default router