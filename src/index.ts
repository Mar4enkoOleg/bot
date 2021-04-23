import express from 'express'
import { server } from './config'
import router from './routes/users'
// import sequelize from './db'
import sequelize from './models/models'

const app = express()

app.use('/users', router)

console.log(typeof process.env.PORT)

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })
    console.log('All models were synchronized successfully.')
    app.listen(server.port, () => console.log(`Server start on ${server.port} port`))
  } catch (error) {
    console.error(error)
  }
}

start()
