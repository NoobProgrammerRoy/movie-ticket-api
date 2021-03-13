const express = require('express')
const app = express()
const movieRouter = require('./routes/movieRouter')
const ticketRouter = require('./routes/ticketRouter')
const port = process.env.PORT || 3000

// Middleware
app.use('/api', movieRouter)
app.use('/api', ticketRouter)

// Server
app.listen(port, () => {
    console.log('Server is running')
})