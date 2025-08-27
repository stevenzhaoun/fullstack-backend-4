import prisma from "../prismaClient";
import { PERMISSIONS } from "../constants";

const createInitialPermissions = async () => {
    await prisma.permission.createMany({
        data: [
            {name: PERMISSIONS.USERS.READ},
            {name: PERMISSIONS.USERS.EDIT},
            {name: PERMISSIONS.ROLES.READ},
            {name: PERMISSIONS.ROLES.EDIT},
            {name: PERMISSIONS.PRODUCTS.READ},
            {name: PERMISSIONS.PRODUCTS.EDIT},
            {name: PERMISSIONS.ORDERS.READ},
            {name: PERMISSIONS.ORDERS.EDIT},
        ],
        skipDuplicates: true,
    })

    console.log("Initial permissions created")
}

createInitialPermissions()