import prisma from "../prismaClient"
import { faker } from "@faker-js/faker"
const populateProducts = async () => {

    const products = new Array(30).fill(0).map(() => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price({ min: 0, max: 100 })),
        }
    })

    console.log(`Creating ${products.length} products`)
    await prisma.product.createMany({
        data: products
    })

    console.log("Products populated")
}

populateProducts()