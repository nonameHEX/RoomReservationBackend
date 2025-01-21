import config from "@/config"
import axios from "axios"
import {Room} from "@/model/Room"

export const useRoomService = {
    // GET all rooms
    getAllRooms: async (): Promise<Room[]> => {
        try {
            const response = await axios.get(`${config.roomBackendUrl}/rooms`)
            return response.data.map((room: any) => ({
                ...room,
                id: room._id,
            })) as Room[]
        } catch (error) {
            console.error("Error fetching rooms:", error)
            throw error
        }
    },

    // GET room by ID
    getRoomById: async (roomId: string): Promise<Room> => {
        try {
            const response = await axios.get(`${config.roomBackendUrl}/rooms/${roomId}`)
            const room = response.data
            return {
                ...room,
                id: room._id,
            } as Room
        } catch (error) {
            console.error("Error fetching room:", error)
            throw error
        }
    },

    // POST (create room)
    createRoom: async (roomData: Partial<Room>): Promise<Room> => {
        try {
            const response = await axios.post(`${config.roomBackendUrl}/rooms`, roomData)
            const room = response.data
            return {
                ...room,
                id: room._id,
            } as Room
        } catch (error) {
            console.error("Error creating room:", error)
            throw error
        }
    },

    // PUT (update room)
    updateRoom: async (roomId: string, roomData: Partial<Room>): Promise<Room> => {
        try {
            const response = await axios.put(
                `${config.roomBackendUrl}/rooms/${roomId}`,
                roomData
            )
            const updatedRoom = response.data
            return {
                ...updatedRoom,
                id: updatedRoom._id,
            } as Room
        } catch (error) {
            console.error("Error updating room:", error)
            throw error
        }
    },

    // DELETE room
    deleteRoom: async (roomId: string): Promise<number> => {
        try {
            const response = await axios.delete(`${config.roomBackendUrl}/rooms/${roomId}`)
            return response.status
        } catch (error) {
            console.error("Error deleting room:", error)
            throw error
        }
    },
}