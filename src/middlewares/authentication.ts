import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authentication = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization']
    

    if(!headerToken) {
        res.status(401).send('Unauthorized')
        return
    }
    const token = headerToken.split(' ')[1] as string

    try {

        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, roleId: string }

        (req as any).userId = decodedPayload.userId;
        (req as any).roleId = decodedPayload.roleId;

        next()
    } catch(e) {
        res.status(401).send('Unauthorized')
        return
    }
}