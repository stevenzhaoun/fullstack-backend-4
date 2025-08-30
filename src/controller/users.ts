import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    const { email, name, password, roleId } = req.body
    console.log(email, name, password, roleId)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            role: {
                connect: {
                    id: roleId
                }
            },
            password: {
                create: {
                    hash: bcrypt.hashSync(password, 10)
                }
            }
        }
    })

    console.log(`User ${user.id} created`)
    res.json({message: `User ${user.id} created`})
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            role: true
        }
    })
    res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            role: true
        }
    })
    if(!user) {
        res.status(404).send('User not found')
        return
    }
    res.json(user)
}