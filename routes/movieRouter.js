const express = require('express')
const router = express.Router()
const Movie = require('../models/movieModel')

// Middleware
router.use(express.json())

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find()
        if (movies.length > 0) {
            res.json(movies)
        } else {
            res.status(404).json({ message: 'No movies found!'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one movie
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            res.json(movie)
        } else {
            res.status(404).json({ message: 'Movie not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Add a movie
router.post('/movies', async (req, res) => {
    try {
        const movie = new Movie({
            name: req.body.name,
            length: req.body.length,
            genre: req.body.genre,
            rating: req.body.rating
        })
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update a movie
router.patch('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            if (req.body.name != null) movie.name = req.body.name
            if (req.body.length != null) movie.length = req.body.length
            if (req.body.genre != null) movie.genre = req.body.genre
            if (req.body.rating != null) movie.rating = req.body.rating
            const updatedMovie = await movie.save()
            res.json(updatedMovie)
        } else {
            res.status(404).json({ message: 'Movie not found!'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete a movie
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            await movie.remove()
            res.json({ message: 'Movie deleted successfully'})
        } else {
            res.status(404).json({ message: 'Movie not found'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router