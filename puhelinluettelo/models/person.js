const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validateNumber = (number) => {
  const parts = number.split('-')
  if (parts.length !== 2) {
    return false
  }
  const [part1, part2] = parts
  if (!/^\d{2,3}$/.test(part1) || !/^\d{5,}$/.test(part2)) {
    return false
  }
  return true
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: validateNumber,
      message: props => `${props.value} is not a valid phone number!`
    }
  },
}, { collection: 'persons' })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)