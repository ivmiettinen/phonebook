require('dotenv').config()

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const cors = require('cors')

app.use(cors())

const personsRouter = require('./controllers/persons')

const registerRouter = require('./controllers/register')

app.use(express.static('build'))

app.use(bodyParser.json())

app.use(express.json())

const morgan = require('morgan')

morgan.token('post-testing', function (req) {
    return JSON.stringify(req.body)
})

app.use(
    morgan(
        ':method  :url :status :res[content-length] - :response-time ms :post-testing'
    )
)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/persons', personsRouter)

app.use('/api/register', registerRouter)

//unknown endpoints:
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

module.exports = app
