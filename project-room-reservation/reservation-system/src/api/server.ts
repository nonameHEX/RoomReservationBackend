import express = require('express');
import cors = require('cors');
import {statusController} from "./controllers/status/status.controller";
import {ReservationController} from "./controllers/reservation/reservation.controller";
import {apiErrorHandler} from "../middleware/error.middleware";

export const server = express()

server.use(cors({
    origin: process.env.CORS_ORIGIN
}))
console.log('Allowed CORS for', process.env.CORS_ORIGIN)

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

// ENDPOINTY
// GET Status
server.get('/', statusController.getStatus)

const reservationController = new ReservationController()
// GET Reservations
server.get('/reservations', reservationController.getAll)
// GET Reservation by ID
server.get('/reservations/:id', reservationController.getById)
// POST Reservation
server.post('/reservations', reservationController.create)
// PUT Reservation
server.put('/reservations/:id', reservationController.update)
// DELETE Reservation
server.delete('/reservations/:id', reservationController.delete)

// DELETE Reservations by Room ID
server.delete('/reservations/room/:id', reservationController.deleteReservationsForRoom)

// Middleware: Error handling
server.use(apiErrorHandler)
