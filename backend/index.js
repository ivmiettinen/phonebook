require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const cors = require('cors')

app.use(cors())

const loginRouter = require('./controllers/login')

const numbersRouter = require('./controllers/numbers')

const registerRouter = require('./controllers/register')

const logger = require('./utils/logger')

const config = require('./utils/config')

const middleware = require('./utils/middleware')

app.use(express.static('build'))

app.use(bodyParser.json())

app.use(express.json())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

logger.info('connecting to', config.MONGODB_URI)
mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)

app.use('/api/persons', numbersRouter)

app.use('/api/register', registerRouter)

//unknown endpoints and request handling:

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
