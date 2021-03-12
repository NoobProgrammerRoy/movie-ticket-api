const express = require('express')
const router = express.Router()
const Ticket = require('./model')

// Middleware
router.use(express.json())

// Get all booked tickets
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.json(tickets)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Get one booked ticket
router.get('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (ticket) {
            res.json(ticket)
        } else {
            res.status(404).json({ message: 'Ticket not found!' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Book a new ticket
router.post('/tickets', async (req, res) => {
    try {
        const ticket = new Ticket({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            movie: req.body.movie,
            seat: req.body.seat,
            price: req.body.price
        })
        const newTicket = await ticket.save()
        res.status(201).json(newTicket)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update a booked ticket
router.patch('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (ticket) {
            if(req.body.name != null) ticket.name = req.body.name 
            if(req.body.mobileNumber != null) ticket.mobileNumber = req.body.mobileNumber 
            if(req.body.movie != null) ticket.movie = req.body.movie 
            if(req.body.seat != null) ticket.seat = req.body.seat 
            if(req.body.price != null) ticket.price = req.body.price
            const updatedTicket = await ticket.save()
            res.json(updatedTicket) 
        } else {
            res.status(404).json({ message: 'Ticket not found!' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete a booked ticket
router.delete('/tickets/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (ticket) {
            await Ticket.remove(ticket)
            res.json({ message: 'Deleted Ticket!' })
        } else {
            res.status(404).json({ message: 'Ticket not found!'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router