const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    passwordHash: { type: String, minlength: 3, required: true },
    number: {
        type: String,
        required: true,
        minlength: 8
    },
    numbers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'number',
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

module.exports = mongoose.model('Person', personSchema)
