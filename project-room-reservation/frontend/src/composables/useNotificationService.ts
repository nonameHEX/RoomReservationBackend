import {io, Socket} from "socket.io-client";
import Config from "@/config";
import type {Notification} from "@/model/Notification";

export function useNotificationService() {
    let socket: Socket | null = null;

    async function init() {
        if (socket?.connected) {
            console.log("Socket already connected");
            return;
        }

        console.log("socket init")
        socket = io(Config.notificationBackendUrl);

        socket.on("disconnect", () => {
            console.log('Socket.io: disconnected');
        });

        socket.on('notification', (data: Notification) => {
            console.log('Socket.io: received notification', data);
            alert(data.message);
        });

        return new Promise<void>(resolve => {
            socket?.on("connect", () => {
                console.log('Socket.io: connected');
                resolve();
            });
        })
    }

    function disconnect() {
        socket?.disconnect();
    }

    function send(message: string) {
        console.log('Socket.io: Sending message', message);
        socket?.emit('message', message);
    }

    function reBroadcast(message: string) {
        console.log('Socket.io: Re-broadcasting message', message);
        socket?.emit('re-broadcast', message);
    }

    return {
        init,
        disconnect,
        send,
        reBroadcast
    }
}