import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            password: true
        }
    })

    if (!user || !user.password) {
        res.status(404).send('User not found')
        return
    }

    if (!bcrypt.compareSync(password, user.password.hash)) {
        res.status(401).send('Invalid credentials')
        return
    }

    const payload = {
        userId: user.id,
        roleId: user.role_id
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
        res.status(500).send('Internal server error')
        return
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1d' })

    res.json({
        token: token,
        userId: user.id,
        roleId: user.role_id,
        email: user.email,
    })
}