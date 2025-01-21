export interface Reservation {
    id: string
    userId: string
    roomId: string
    from: string
    to: string
    status: "unconfirmed" | "confirmed" | "cancelled"
    totalPrice: number
}