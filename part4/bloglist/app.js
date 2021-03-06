const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const logger = require('./utils/logger')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')

const app = express()

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB: ', err.message)
  })
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
