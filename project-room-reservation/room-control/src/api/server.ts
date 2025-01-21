import express = require('express');
import cors = require('cors');
import {statusController} from "./controllers/status/status.controller";
import {RoomController} from "./controllers/room/room.controller";
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

const roomController = new RoomController()
// GET Rooms
server.get('/rooms', roomController.getAll)
server.get('/rooms/:id', roomController.getById)
// POST Rooms
server.post('/rooms', roomController.create)
// PUT Rooms
server.put('/rooms/:id', roomController.update)
// DELETE Rooms
server.delete('/rooms/:id', roomController.delete)

// PUT ROOM update added reservation
server.put('/rooms/:id/reservation', roomController.updateAddReservation)

// Middleware: Error handling
server.use(apiErrorHandler)