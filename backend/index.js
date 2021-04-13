require('dotenv').config()

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const Person = require('./models/person')

const cors = require('cors')

app.use(cors())

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

//GET PERSONS-ROUTE:

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
    // console.log('Does it work?')
        console.log('LENGTH:', persons.length)
        res.json(persons.map((person) => person.toJSON()))
    })
})

//GET INFO-ROUTE:

app.get('/info', (req, res) => {
    Person.find({}).then((persons) => {
    // console.log('LENGTH:', persons.length)

        res.send(
            `Phonebook has info for ${persons.length} people` + '<br>' + new Date()
        )
    })
})

//GET ONE PERSON-ROUTE

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Haettu id', id)

    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

//DELETE PERSON-ROUTE:

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

//POST NEW PERSON-ROUTE:

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    console.log('Request body:', body)

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        // important: body.important || false,
        date: new Date(),
    })

    person
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((savedAndFormattedPerson) => {
            res.json(savedAndFormattedPerson)
        })
        .catch((error) => next(error))

    //before:
    // person.save().then(savedPerson => {
    //   res.json(savedPerson.toJSON())
    // }).catch(error => next(error))
})

//PUT:

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson.toJSON())
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

//unknown endpoints:
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
