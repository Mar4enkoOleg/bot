import express from 'express'
import { server } from './config'
import router from './routes/users'

const app = express()

const port = server.port || 3000

app.use('/users', router)

app.listen(port, () => console.log(`Server start on ${port} port`))
