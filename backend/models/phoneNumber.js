const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const uniqueValidator = require('mongoose-unique-validator')

const phoneNumberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    numbers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'personNumbers',
        },
    ],
})

//Apply the uniqueValidator plugin to userSchema:

phoneNumberSchema.plugin(uniqueValidator)

phoneNumberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    },
})

module.exports = mongoose.model('phoneNumber', phoneNumberSchema)
