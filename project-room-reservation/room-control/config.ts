export const Config = {
    port: process.env.PORT || 3000,
    mongo: {
        url: process.env.MONGO_URL
    },
    reservationSystemUrl: process.env.RESERVATION_SYSTEM_URL || 'http://reservation-system:3001'
}