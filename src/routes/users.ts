import { Router } from "express";
import { createUser, getUser, listUsers } from "../controller/users";

const router = Router();

router.post('/users', createUser)
router.get('/users', listUsers)
router.get('/users/:id', getUser)
export default router