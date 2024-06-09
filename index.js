const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('data', request => JSON.stringify(request.body))
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



let persons = [   
    {   
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
        
      },
    { 
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
        
      },
    { 
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
        
      },
    { 
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
        
      }
  
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
  })

const randomizeId = () =>  Math.floor(Math.random() * 100000000000)

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if (!body.name || !body.number) {
      return res.status(400).json({ 
          error: 'name or number missing' 
      })
    }
  
  if (persons.find(person => person.name === body.name)) {
      return res.status(400).json({ 
          error: 'name must be unique'
      })
  }
  
  const person = {
    id: randomizeId(),
    name: body.name,
    number: body.number,              
    }

  persons = persons.concat(person)

  res.json(person)
  
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})