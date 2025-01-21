import {Room} from "../persistence/models/room.model";
import {CreateRoomDto} from "../api/controllers/room/create.room.dto";
import {UpdateRoomDto} from "../api/controllers/room/update.room.dto";
import {UpdateAddReservationDto} from "../api/controllers/room/update.add.reservation.dto";

export const roomService = {
    async getAllRooms(){
        return Room.find()
    },
    async getRoomById(id: string) {
        return Room.findById(id)
    },
    async createRoom(dto: CreateRoomDto) {
        const room = new Room(dto)
        await room.save()
        return room
    },
    async updateRoom(id: string, dto: UpdateRoomDto) {
        return Room.findByIdAndUpdate(id, dto, { new: true })
    },
    async updateAddReservationToRoom(id: string, dto: UpdateAddReservationDto) {
        const room = await Room.findById(id);
        if (!room) {
            return null;
        }
        room.reservations.push({
            reservationId: dto.reservationId,
            from: new Date(dto.from),
            to: new Date(dto.to),
            status: dto.status,
        });
        await room.save();
        return room;
    },
    async deleteRoom(id: string) {
        return Room.findByIdAndDelete(id)
    }
}