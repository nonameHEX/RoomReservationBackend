import config from "@/config"
import axios from "axios"
import {Reservation} from "@/model/Reservation"

export const useReservationService = {
    // GET all reservations
    getAllReservations: async (): Promise<Reservation[]> => {
        try {
            const response = await axios.get(`${config.reservationBackendUrl}/reservations`)
            return response.data.map((reservation: any) => ({
                ...reservation,
                id: reservation._id,
            })) as Reservation[]
        } catch (error) {
            console.error("Error fetching reservations:", error)
            throw error
        }
    },

    // GET reservation by ID
    getReservationById: async (reservationId: string): Promise<Reservation> => {
        try {
            const response = await axios.get(`${config.reservationBackendUrl}/reservations/${reservationId}`)
            const reservation = response.data
            return {
                ...reservation,
                id: reservation._id,
            } as Reservation
        } catch (error) {
            console.error("Error fetching reservation:", error)
            throw error
        }
    },

    // POST (create reservation)
    createReservation: async (reservationData: Partial<Reservation>): Promise<Reservation> => {
        try {
            const response = await axios.post(`${config.reservationBackendUrl}/reservations`, reservationData)
            const reservation = response.data
            return {
                ...reservation,
                id: reservation._id,
            } as Reservation
        } catch (error) {
            console.error("Error creating reservation:", error)
            throw error
        }
    },

    // PUT (update reservation)
    updateReservation: async (reservationId: string, reservationData: Partial<Reservation>): Promise<Reservation> => {
        try {
            const response = await axios.put(
                `${config.reservationBackendUrl}/reservations/${reservationId}`,
                reservationData
            )
            const updatedReservation = response.data
            return {
                ...updatedReservation,
                id: updatedReservation._id,
            } as Reservation
        } catch (error) {
            console.error("Error updating reservation:", error)
            throw error
        }
    },

    // DELETE reservation
    deleteReservation: async (reservationId: string): Promise<number> => {
        try {
            const response = await axios.delete(`${config.reservationBackendUrl}/reservations/${reservationId}`)
            return response.status
        } catch (error) {
            console.error("Error deleting reservation:", error)
            throw error
        }
    },
}