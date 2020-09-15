import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { ApolloServer } from 'apollo-server'
import context from './modules/auth/auth.context'
import application from './modules/application'

import errorHandler from './shared/middleware/error.middleware'
import notFoundHandler from './shared/middleware/notFound.middleware'

import routes from './routes'

const setupCors = app => {
  app.use(cors())
  app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })
}

const setupBodyParser = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

const setupSecurity = app => {
  app.use(helmet())
  app.disable('x-powered-by')
}

const setupRoutes = app => {
  app.use('/ping', (req, res) => res.status(200).end())
  app.use('/api/v1', routes)
}

const setupHandlers = app => {
  app.use(errorHandler)
  app.use(notFoundHandler)
}

export const setupDatabase = async () => {
  const { DB_HOST, DB_PORT, DB_NAME } = process.env
  const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // eslint-disable-next-line no-console
    console.log('Connected successfully to database')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Unable to connect to database', error)
  }
}

const setupGraphQLServer = () => {
  const schema = application.createSchemaForApollo()

  const apolloServer = new ApolloServer({
    context,
    schema
  })
  apolloServer
    .listen()
    .then(({ url }) => console.log(`Apollo Server started at ${url}`))
    .catch(error => console.log('Apollo Server failed: ', error))
}

function createApp() {
  const app = express()

  setupCors(app)
  setupBodyParser(app)
  setupSecurity(app)
  setupRoutes(app)
  setupHandlers(app)
  setupDatabase()
  setupGraphQLServer()

  return app
}

export default createApp()
