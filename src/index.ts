import express from 'express'
import { server } from './config'

const app = express()

app.listen(server.port, () => console.log(`Server start on ${server.port} port`))
