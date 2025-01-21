import {Server} from "socket.io";
import * as http from "node:http";
import {CreateNotificationDto} from "../api/controllers/notification/create.notification.dto";
import {NotificationDto} from "../api/controllers/notification/notification.dto";

let sockets = {}
let io = null
// let subscriptions: Map<string, Array<string>> = new Map();

export const socketServer = {
    init(httpServer: http.Server) {
        io = new Server(httpServer, {
            cors: {
                origin: process.env.CORS_ORIGIN.split(',')
            }
        });

        io.on("connection", socket => {
            console.log("Socket.io: A new user " + socket.id + " connected")

            sockets[socket.id] = socket

            socket.on('message', (message: string) => console.log('Socket.io: Received message', message))

            socket.on('re-broadcast', (message: string) => {
                const notification: NotificationDto = { message };
                console.log('Socket.io: Received re-broadcast data', notification);
                io.emit('notification', notification);
            });

            socket.on('disconnect', () => console.log('Socket.io: User ' + socket.id + ' disconnected'))
        });

        console.log('Socket.io: Initialized')
    },

    send(socketId: string, event: string, data: any) {
        if (sockets[socketId]) {
            console.log('Socket.io: Sending to ' + socketId + ' event ' + event, data)
            sockets[socketId].emit(event, data)
        }
    },

    broadcastNotification(notification: CreateNotificationDto) {
        console.log('Socket.io: Broadcasting notification', notification);
        io.emit("notification", { message: notification.message });
    }
}