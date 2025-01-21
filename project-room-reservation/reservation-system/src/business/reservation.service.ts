import {Reservation} from "../persistence/models/reservation.model";
import {CreateReservationDto} from "../api/controllers/reservation/create.reservation.dto";
import {UpdateReservationDto} from "../api/controllers/reservation/update.reservation.dto";
import mongoose from "mongoose";

export const ReservationService = {
    async getAllReservations(){
        return Reservation.find()
    },
    async getReservationById(id: string){
        return Reservation.findById(id)
    },
    async createReservation(data: CreateReservationDto){
        const reservation = new Reservation(data)
        await reservation.save()
        return reservation
    },
    async updateReservation(id: string, updates: UpdateReservationDto) {
        return Reservation.findByIdAndUpdate(id, updates, { new: true })
    },
    async deleteReservation(id: string) {
        return Reservation.findByIdAndDelete(id)
    },
    async deleteReservationsForRoom(id: string): Promise<boolean> {
        try {
            await Reservation.deleteMany({ roomId: new mongoose.Types.ObjectId(id) });
            return true
        } catch (error) {
            console.error('Error deleting reservations:', error);
            return false
        }
    }
}