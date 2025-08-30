import { Request, Response, NextFunction } from "express"
import prisma from "../prismaClient"


export const authorization = (targetPermissions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).userId as string

        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        })

        if(!user) {
            res.status(404).send('User not found')
            return
        }

        const userPermissions = user.role.permissions.map((permission) => permission.name)

        const hasPermission = targetPermissions.every((tP) => {
            return userPermissions.includes(tP)
        })

        if(!hasPermission) {
            res.status(403).send('Forbidden')
            return
        }

        next()
    }
}