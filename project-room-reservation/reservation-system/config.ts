export const Config = {
    port: process.env.PORT || 3001,
    mongo: {
        url: process.env.MONGO_URL
    },
    roomControlUrl: process.env.ROOM_CONTROL_URL || 'http://room-control:3000'
}