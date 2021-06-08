const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const Person = require('../models/person')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10

    if (body.password === undefined) {
        return response.status(400).json({
            error: 'password must be included in your post',
        })
    }

    if (body.password.length < 3) {
        return response.status(400).json({
            error: 'password must be 3 letters or longer',
        })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new Person({
        email: body.email,
        passwordHash,
    })

    //Create and sign a token:

    const userForToken = {
        email: user.email,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    try {
        await user.save()
        response
            .status(201)
            .send({ token, email: user.email })
    } catch (exception) {
        next(exception)
    }
})


module.exports = usersRouter
