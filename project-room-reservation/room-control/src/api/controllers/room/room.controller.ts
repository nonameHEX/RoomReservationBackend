import 'reflect-metadata'
import express = require('express')
import {roomService} from "../../../business/room.service"
import {validateBody, validateParams} from "../../../middleware/validation.middleware"
import {IdParam} from "../../../types/base.dto"
import {CreateRoomDto} from "./create.room.dto"
import {UpdateRoomDto} from "./update.room.dto"
import {UpdateAddReservationDto} from "./update.add.reservation.dto";
import {Config} from "../../../../config";
import axios from "axios";

export class RoomController {
// Async metoda pro GET all a by id
    async getAll(req: express.Request, res: express.Response){
        console.log('getAll')
        const rooms = await roomService.getAllRooms()
        res.status(200).send(rooms)
    }

    async getById(req: express.Request, res: express.Response) {
        console.log('getById');
        const { id } = await validateParams(req, IdParam);
        const room = await roomService.getRoomById(id)
        if (room === null) {
            res.status(404).send()
            return
        }
        res.status(200).send(room)
    }

// Async metoda pro POST
    async create(req: express.Request, res: express.Response) {
        console.log('create')
        const dto = await validateBody(req, CreateRoomDto)
        const newRoom = await roomService.createRoom(dto)
        res.status(201).send(newRoom)
    }

// Async metoda pro PUT
    async update(req: express.Request, res: express.Response) {
        console.log('update')
        const { id } = await validateParams(req, IdParam)
        console.log('update id ', id)
        const dto = await validateBody(req, UpdateRoomDto)
        const updatedRoom = await roomService.updateRoom(id, dto)
        if (updatedRoom === null) {
            res.status(404).send()
            return
        }
        res.status(200).send(updatedRoom)
    }

    async updateAddReservation(req: express.Request, res: express.Response) {
        console.log('updateAddReservation')
        const { id } = await validateParams(req, IdParam)
        console.log('update id ', id)
        const dto = await validateBody(req, UpdateAddReservationDto)
        const updatedRoom = await roomService.updateAddReservationToRoom(id, dto)
        if (updatedRoom === null) {
            res.status(404).send()
            return
        }
        res.status(200).send(updatedRoom)
    }

// Async metoda pro DELETE
    async delete(req: express.Request, res: express.Response) {
        console.log('delete')
        const { id } = await validateParams(req, IdParam)
        console.log('delete id ', id)

        const roomUpdateResponse = await axios.delete(
            `${Config.reservationSystemUrl}/reservations/room/${id}`
        )
        if (roomUpdateResponse.status !== 200) {
            console.error('Failed to delete reservations for room', id)
            res.status(500).send()
            return
        }

        const deleted = await roomService.deleteRoom(id)
        if (deleted === null) {
            res.status(404).send()
            return
        }

        res.status(204).send()
    }
}