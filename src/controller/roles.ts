import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listRoles = async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true
        }
    })
    res.json(roles)
}

export const createRole = async (req: Request, res: Response) => {
    const { name, permissions } = req.body
    const role = await prisma.role.create({
        data: {
            name: name.toLowerCase(),
            permissions: {
                connect: permissions.map((pName: string) => {
                    return {
                        name: pName
                    }
                })
            }
        },
    })
    console.log(`Role ${role.name}: ${role.id} created`)
    res.json({message: `Role ${role.name}: ${role.id} created`})
}