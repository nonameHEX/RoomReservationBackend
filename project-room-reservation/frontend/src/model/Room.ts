export interface Room {
    id: string
    name: string
    capacity: number
    equipment: string[]
    location: string
    pricePerHour: number
    reservations: ReservationInRoom[]
    ownerId: string
}

export interface ReservationInRoom {
    reservationId: string
    from: string
    to: string
    status: "unconfirmed" | "confirmed" | "cancelled"
}