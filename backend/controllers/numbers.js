const numbersRouter = require('express').Router()
const PhoneNumber = require('../models/phoneNumber')
const jwt = require('jsonwebtoken')

//GET INFO-ROUTE:

numbersRouter.get('/info', (req, res) => {
    PhoneNumber.find({}).then((persons) => {
        // console.log('LENGTH:', persons.length)

        res.send(
            `Phonebook has info for ${persons.length} people` +
                '<br>' +
                new Date()
        )
    })
})

//GET PERSONS-ROUTE:

numbersRouter.get('/', (req, res, next) => {
    PhoneNumber
        .find({})
        .then((numbers) => {
            res.json(numbers.map((nums) => nums.toJSON()))
        })
        .catch((error) => next(error))
})

//GET ONE PERSON-ROUTE

numbersRouter.get('/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Haettu id', id)

    PhoneNumber.findById(req.params.id)
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

numbersRouter.delete('/:id', (req, res, next) => {

    PhoneNumber.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

//POST NEW PERSON-ROUTE:

numbersRouter.post('/', (req, res, next) => {
    const body = req.body

    console.log('Request body:', body)

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const person = new PhoneNumber({
        name: body.name,
        number: body.number,
        date: new Date(),

    })

    person
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((savedAndFormattedPerson) => {
            res.json(savedAndFormattedPerson)
        })
        .catch((error) => next(error))
})

//PERSON PUT:

numbersRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    PhoneNumber.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson.toJSON())
        })
        .catch((error) => next(error))
})

module.exports = numbersRouter
