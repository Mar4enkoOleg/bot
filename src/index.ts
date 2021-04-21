import express from 'express'
import { server } from './config'
import router from './routes/users'

const app = express()

app.use('/users', router)

app.listen(server.port, () => console.log(`Server start on ${server.port} port`))
