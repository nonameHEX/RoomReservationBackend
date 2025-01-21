import 'reflect-metadata'
import express = require('express')
import {NotificationService} from "../../../business/notification.service";
import {validateBody} from "../../../middleware/validation.middleware";
import {CreateNotificationDto} from "./create.notification.dto";
import {socketServer} from "../../../socket/socket.server";

export class NotificationController {
    async create(req: express.Request, res: express.Response){
        console.log('create')
        const dto = await validateBody(req, CreateNotificationDto)

        const newNotification = await NotificationService.createNotification(dto)
        console.log('Socket send msg')
        if (socketServer) {
            socketServer.broadcastNotification(dto);
        } else {
            console.error('Socket server is not initialized or connected');
        }
        res.status(201).send(newNotification)
    }

    async getAll(req: express.Request, res: express.Response){
        console.log('getAll')
        const notifications = await NotificationService.getAllNotifications()
        res.status(200).send(notifications)
    }
}