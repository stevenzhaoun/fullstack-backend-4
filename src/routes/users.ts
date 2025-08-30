import { Router } from "express";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../controller/users";

const router = Router();

router.post('/users', createUser)
router.get('/users', listUsers)
router.get('/users/:id', getUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
export default router