import express from 'express'
import { server } from './config'
import router from './routes/users'
import sequelize from './models/models'
import { createUsersAndRoles } from './helpers/createUsers'
import bodyParser from 'body-parser'

const app = express()

app.use('/users', router)
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })
    console.log('All models were synchronized successfully.')
    app.listen(server.port, () => console.log(`Server start on ${server.port} port`))
    createUsersAndRoles()
  } catch (error) {
    console.error(error)
  }
}

start()
