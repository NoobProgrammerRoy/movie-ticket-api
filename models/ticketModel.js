const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/movie-ticket', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database opened successfully')
})

// Schema
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    movie: { type: String, required: true},
    seat: { type: String, required: true },
    price: { type: String, required: true }
})

// Model
const ticket = mongoose.model('ticket', ticketSchema)
module.exports = ticket