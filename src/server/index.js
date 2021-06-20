const BACKEND_PORT = process.env.BACKEND_PORT || 5002

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(cors())
app.use(helmet())

// Assign routes to service
require('./routes/drinks')(app)
require('./routes/specs')(app)

app.listen(BACKEND_PORT, function() {
  console.log(`REST service listening at localhost on port ${BACKEND_PORT}.`)
})
