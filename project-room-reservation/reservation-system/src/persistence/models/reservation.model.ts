import * as mongoose from "mongoose";
import {ObjectId} from "mongodb";

export enum ReservationStatus {
    unconfirmed = 'unconfirmed',
    confirmed = 'confirmed',
    cancelled = 'cancelled',
}

export const Reservation = mongoose.model('Reservation', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    status: { type: String, enum: Object.values(ReservationStatus), required: true },
    totalPrice: { type: Number, required: true },
}))