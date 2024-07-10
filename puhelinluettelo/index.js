require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('data', request => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({}).then(count => {
    res.send(`<p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>`)
  }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      res.json(savedPerson)
    }).catch(error => next(error))
  }).catch(error => next(error))
})


app.put('/api/persons/:id', async (req, res, next) => {
  const body = req.body

  try {
    await Person.validate({
      name: body.name,
      number: body.number,
    })
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true, runValidators: true, context: 'query' })

    if (!updatedPerson) {
      return res.status(404).end()
    }

    res.json(updatedPerson)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message })
    } else {
      next(error)
    }
  }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})