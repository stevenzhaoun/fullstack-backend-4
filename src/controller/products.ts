import { Request, Response } from "express";
import prisma from "../prismaClient";

export const createProduct = async (req: Request, res: Response) => {
    const { title, description, price } = req.body
    const product = await prisma.product.create({
        data: {
            title, description, price
        }
    })
    res.status(201).json(product)
}

export const listProducts = async (req: Request, res: Response) => {
    const { minPrice, maxPrice } = req.query

    const products = await prisma.product.findMany({
        where: {
            price: {
                gte: Number(minPrice || 0),
                lte: Number(maxPrice) || Number.MAX_VALUE
            }
        }
    })
    res.json(products)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!product) {
        res.status(404).send('Product not found')
        return
    }

    res.json(product)
}