const personsRouter = require('express').Router()
const Person = require('../models/person')

//GET PERSONS-ROUTE:

personsRouter.get('/', (req, res) => {
    Person.find({}).then((persons) => {
        console.log('aaaaaaaaaaaaa1')
        // console.log('Does it work?')
        console.log('LENGTH:', persons.length)
        res.json(persons.map((person) => person.toJSON()))
    })
})

//GET INFO-ROUTE:

personsRouter.get('/info', (req, res) => {
    Person.find({}).then((persons) => {
        // console.log('LENGTH:', persons.length)

        res.send(
            `Phonebook has info for ${persons.length} people` +
                '<br>' +
                new Date()
        )
    })
})

//GET ONE PERSON-ROUTE

personsRouter.get('/api/persons/:id', (req, res, next) => {
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

personsRouter.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

//POST NEW PERSON-ROUTE:

personsRouter.post('/api/persons', (req, res, next) => {
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

personsRouter.put('/api/persons/:id', (request, response, next) => {
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

module.exports = personsRouter
