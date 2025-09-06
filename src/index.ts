import express from 'express';
import { authentication } from './middlewares/authentication';
import rolesRouter from './routes/roles';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';
import bodyParser from 'body-parser';
import cors from 'cors';
const port = process.env.PORT || 8888 

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.use(authRouter)

app.use(authentication)


app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello world!!!')
})

app.use(usersRouter)
app.use(rolesRouter)
app.use(productsRouter)
app.use(ordersRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})