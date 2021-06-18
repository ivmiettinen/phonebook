const numbersRouter = require('express').Router()
const PhoneNumber = require('../models/phoneNumber')
const jwt = require('jsonwebtoken')
const Person = require('../models/person')

//GET INFO-ROUTE:

numbersRouter.get('/info', (req, res) => {
    PhoneNumber.find({}).then((persons) => {
        res.send(
            `Phonebook has info for ${persons.length} people` +
                '<br>' +
                new Date()
        )
    })
})

//GET PERSONS-ROUTE:

numbersRouter.get('/', async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id || req.token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const uniqueUser = await Person.findById(decodedToken.id)

    try {
        const phoneNumber = await PhoneNumber.find({ person: uniqueUser })

        res.json(phoneNumber.map((nums) => nums.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

//GET ONE PERSON-ROUTE

numbersRouter.get('/:id', (req, res, next) => {
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

//POST NEW PERSON-ROUTE:

numbersRouter.post('/', async (req, res, next) => {
    const body = req.body

    console.log('Request body:', body)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    } else if (!req.token || !decodedToken.id || req.token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await Person.findById(decodedToken.id)

    const person = new PhoneNumber({
        name: body.name,
        number: body.number,
        date: new Date(),
        person: user._id,
    })

    try {
        if (body.name !== undefined && body.number !== undefined) {
            const saveNumber = await person.save()
            await user.numbers.concat(saveNumber)
            res.json(saveNumber.toJSON())
        } else {
            res.status(400).send('Bad request')
        }
    } catch (exception) {
        next(exception)
    }
})

//DELETE PERSON-ROUTE:

numbersRouter.delete('/:id', async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const person = await Person.findById(decodedToken.id)

    const phoneNumber = await PhoneNumber.findById(req.params.id)

    if (person._id.toString() !== phoneNumber.person.toString()) {
        //Deleter of the blog is not the same person as blog's adder
        return res.status(400).json({ error: 'invalid user' })
    }

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        await PhoneNumber.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (exception) {
        next(exception)
    }
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
