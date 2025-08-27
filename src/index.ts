import express from 'express';
import prisma from './prismaClient';

const app = express();

app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello')
})

app.get('/roles', async (req, res) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true
        }
    })
    res.json(roles)
})

app.listen(8888, () => {
    console.log('server is running on port 8888')
})