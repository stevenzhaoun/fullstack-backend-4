import { Request, Response } from "express";
import prisma from "../prismaClient";

export const createOrder = async (req: Request, res: Response) => {
    const { email, name, total, productIds } = req.body;
    
    try {
        const order = await prisma.order.create({
            data: {
                email,
                name,
                total,
                products: {
                    connect: productIds?.map((id: number) => ({ id })) || []
                }
            }
        });
        
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

export const listOrders = async (req: Request, res: Response) => {
    const { email, minTotal, maxTotal } = req.query;
    
    try {
        const whereClause: any = {
            total: {
                gte: Number(minTotal) || 0,
                lte: Number(maxTotal) || Number.MAX_VALUE
            }
        };

        if (email) {
            whereClause.email = String(email);
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            include: {
                products: true
            },
        });
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                products: true
            }
        });

        if (!order) {
            res.status(404).send('Order not found');
            return;
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name, total, productIds } = req.body;
    
    try {
        const existingOrder = await prisma.order.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingOrder) {
            res.status(404).send('Order not found');
            return;
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                email: email || existingOrder.email,
                name: name || existingOrder.name,
                total: total !== undefined ? total : existingOrder.total,
                ...(productIds && {
                    products: {
                        set: productIds.map((id: number) => ({ id }))
                    }
                })
            },
            include: {
                products: true
            }
        });
        
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id)
            }
        });
        
        if (!order) {
            res.status(404).send('Order not found');
            return;
        }

        await prisma.order.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};
