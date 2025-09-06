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
        },
        orderBy: {
            id: 'asc'
        }
    })
    res.json(users)
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!user) {
        res.status(404).send('User not found')
        return
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            role: {
                connect: {
                    id: req.body.roleId || user.role_id
                }
            }
        }
    })
    res.json(updatedUser)
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

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    if(!user) {
        res.status(404).send('User not found')
        return
    }

    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })

    res.json({message: 'user deleted'})
}