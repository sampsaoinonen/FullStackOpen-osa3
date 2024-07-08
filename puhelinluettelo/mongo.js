const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://sampsao:${password}@cluster0.dzsrsmc.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
}, { collection: 'persons' })

const Person = mongoose.model('Person', personSchema)

if (!name && !number)  {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error retrieving persons', err)
    mongoose.connection.close()
  })
} else if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error saving person', err)
    mongoose.connection.close()
  })}
else {
  console.log('Name or number missing!')
  mongoose.connection.close()
}