import express from 'express'
import { sequelize } from './db/models'
import errorHandler from './middleware/errorHandler'
import './db/models/user'
import './db/models/role'
import './db/models/question'
import './db/models/subject'
import './db/models/group'
import './db/models/cafedraInfo'
import usersRouter from './routes/users'
import subjectsRouter from './routes/subjects'
import questionsRouter from './routes/questions'
import popQuestionsRouter from './routes/popQuestions'
import noAnswerRouter from './routes/questionsNoAnswer'
import infoRouter from './routes/cafedraInfo'
import botInfoRouter from './routes/botInfo'
import usersInfoRouter from './routes/usersInfo'
import updateAdminRouter from './routes/updateAdmin'
import bodyParser from 'body-parser'
import { createUsersAndRolesAndGroups, createSubjectsAndQuestions } from './db/helpers/createUsers'
import createInfo from './db/helpers/createInfo'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/subjects', subjectsRouter)
app.use('/questions', questionsRouter)
app.use('/info', infoRouter)
app.use('/botInfo', botInfoRouter)
app.use('/popQuestions', popQuestionsRouter)
app.use('/noAnswer', noAnswerRouter)
app.use('/usersInfo', usersInfoRouter)
app.use('/admins', updateAdminRouter)

app.use(errorHandler)

const start = async () => {
  try {
    console.log(process.env.NODE_ENV)
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })
    console.log('All models were synchronized successfully.')
    await createInfo()
    createUsersAndRolesAndGroups()
    createSubjectsAndQuestions()
    app.listen(port, () => console.log(`Server start on ${port} port`))
  } catch (error) {
    console.error(error)
  }
}

start()
