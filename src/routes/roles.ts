import { Router } from "express";
import prisma from "../prismaClient";
import { listRoles, createRole } from "../controller/roles";

const router = Router();

router.get('/roles', listRoles)
router.post('/roles', createRole)

export default router