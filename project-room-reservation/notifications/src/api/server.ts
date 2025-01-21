import express = require('express');
import cors = require('cors');
import {statusController} from "./controllers/status/status.controller";
import {apiErrorHandler} from "../middleware/error.middleware";
import {NotificationController} from "./controllers/notification/notification.controller";

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

const notificationController = new NotificationController()
// POST Notifications
server.post('/notifications', notificationController.create)
// GET Notifications
server.get('/notifications', notificationController.getAll)

// Middleware: Error handling
server.use(apiErrorHandler)