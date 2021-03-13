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
const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: String, required: true},
    genre: { type: String, required: true},
    rating: { type: String, required: true}
})

// Model
const movie = mongoose.model('movie', movieSchema)
module.exports = movie