import * as mongoose from "mongoose";
import {ObjectId} from "mongodb";

export const Notification = mongoose.model('Notification', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    created: { type: Date, default: Date.now }
}))