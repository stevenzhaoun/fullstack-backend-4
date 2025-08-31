import { Router } from "express";
import { createOrder, deleteOrder, getOrder, listOrders, updateOrder } from "../controller/orders";
import { PERMISSIONS } from "../constants";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.post('/orders', authorization([PERMISSIONS.ORDERS.EDIT]), createOrder);
router.get('/orders', authorization([PERMISSIONS.ORDERS.READ]), listOrders);
router.get('/orders/:id', authorization([PERMISSIONS.ORDERS.READ]), getOrder);
router.put('/orders/:id', authorization([PERMISSIONS.ORDERS.EDIT]), updateOrder);
router.delete('/orders/:id', authorization([PERMISSIONS.ORDERS.EDIT]), deleteOrder);

export default router;
