import express from 'express';
import { authentication } from './middlewares/authentication';
import rolesRouter from './routes/roles';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(authRouter)

app.use(authentication)

app.use(usersRouter)
app.use(rolesRouter)


app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello world!!!')
})

app.listen(8888, () => {
    console.log('server is running on port 8888')
})