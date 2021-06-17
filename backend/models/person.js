const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = mongoose.Schema({
    email: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    passwordHash: { type: String, minlength: 3, required: true },
    numbers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Number',
        },
    ],
})

//Apply the uniqueValidator plugin to userSchema:

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
