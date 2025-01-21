import * as mongoose from "mongoose";
import {ObjectId} from "mongodb";

export const Room = mongoose.model('Room', new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    equipment: { type: [String], required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    reservations: [{
        reservationId: { type: mongoose.Schema.Types.ObjectId, required: true },
        from: { type: Date, required: true },
        to: { type: Date,  required: true },
        status: { type: String, enum: ['unconfirmed', 'confirmed', 'cancelled'], required: true }
    }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
}))