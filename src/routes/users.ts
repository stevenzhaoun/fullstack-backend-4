import { Router } from "express";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../controller/users";
import { PERMISSIONS } from "../constants";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.post('/users', authorization([PERMISSIONS.USERS.EDIT]), createUser)
router.get('/users', authorization([PERMISSIONS.USERS.READ]), listUsers)
router.get('/users/:id', authorization([PERMISSIONS.USERS.READ]), getUser)
router.put('/users/:id', authorization([PERMISSIONS.USERS.EDIT]), updateUser)
router.delete('/users/:id', authorization([PERMISSIONS.USERS.EDIT]), deleteUser)
export default router