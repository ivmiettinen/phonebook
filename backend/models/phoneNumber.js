const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const phoneNumberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    person: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person',
        },
    ],
})


phoneNumberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('phoneNumber', phoneNumberSchema)
