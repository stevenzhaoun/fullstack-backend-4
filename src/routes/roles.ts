import { Router } from "express";
import { listRoles, createRole } from "../controller/roles";
import { authorization } from "../middlewares/authorization";
import { PERMISSIONS } from "../constants";

const router = Router();

router.get('/roles', authorization([PERMISSIONS.ROLES.READ]), listRoles)
router.post('/roles', authorization([PERMISSIONS.ROLES.EDIT]), createRole)

export default router