import {Notification} from "../persistence/model/notification.model";
import {CreateNotificationDto} from "../api/controllers/notification/create.notification.dto";

export const NotificationService = {
    async createNotification(data: CreateNotificationDto){
        const notification = new Notification(data)
        notification.created = new Date()
        await notification.save()
        return notification
    },
    async getAllNotifications(){
        return Notification.find()
    }
}