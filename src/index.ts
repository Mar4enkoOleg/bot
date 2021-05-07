import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { sequelize } from './db/models'
import errorHandler from './middleware/errorHandler'
import './db/models/user'
import './db/models/question'
import './db/models/subject'
import './db/models/group'
import './db/models/cafedraInfo'
import usersRouter from './routes/users'
import subjectsRouter from './routes/subjects'
import questionsRouter from './routes/questions'
import infoRouter from './routes/info'
import usersInfoRouter from './routes/usersInfo'
import updateAdminRouter from './routes/updateAdmin'

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/subjects', subjectsRouter)
app.use('/questions', questionsRouter)
app.use('/info', infoRouter)
app.use('/usersInfo', usersInfoRouter)
app.use('/admins', updateAdminRouter)

app.use(errorHandler)

const start = async () => {
  try {
    console.log(process.env.NODE_ENV)
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync()
    console.log('All models were synchronized successfully.')
    app.listen(port, () => console.log(`Server start on ${port} port`))
  } catch (error) {
    console.error(error)
  }
}

start()
