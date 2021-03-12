const express = require('express')
const app = express()
const router = require('./router')
const port = process.env.PORT || 3000

// Middleware
app.use('/api', router)

// Server
app.listen(port, () => {
    console.log('Server is running')
})