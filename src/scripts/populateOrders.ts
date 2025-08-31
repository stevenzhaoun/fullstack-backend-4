import { faker } from "@faker-js/faker"
import prisma from "../prismaClient"
const populateOrders = async () => {
    const products = await prisma.product.findMany()

    const orders = new Array(30).fill(0).map(() => {

        const orderProducts = faker.helpers.arrayElements(products, {min: 1, max: 5})

        const total = orderProducts.reduce((acc, product) => acc + product.price, 0)

        return {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            total: total,
            createdAt: faker.date.recent({days: 7}),
            productIds: orderProducts.map((product) => product.id)
        }
    })

    console.log(`Creating ${orders.length} orders`)

    for (const order of orders) {
        await prisma.order.create({
            data: {
              email: order.email,
              name: order.name,
              total: order.total,
              createdAt: order.createdAt,
              products: {
                connect: order.productIds.map((id) => ({ id }))
              }
            }
        })
    }

    console.log("Orders populated")
}

populateOrders()