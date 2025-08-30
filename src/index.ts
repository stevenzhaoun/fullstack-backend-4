import express from 'express';
import prisma from './prismaClient';
import rolesRouter from './routes/roles';
import usersRouter from './routes/users';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())

app.use(usersRouter)
app.use(rolesRouter)

app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello world!!!')
})

app.listen(8888, () => {
    console.log('server is running on port 8888')
})