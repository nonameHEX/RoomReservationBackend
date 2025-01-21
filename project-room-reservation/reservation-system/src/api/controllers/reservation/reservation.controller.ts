import 'reflect-metadata'
import axios from "axios"
import express = require('express')
import {ReservationService} from "../../../business/reservation.service"
import {validateBody, validateParams} from "../../../middleware/validation.middleware"
import {IdParam} from "../../../types/base.dto"
import {CreateReservationDto} from "./create.reservation.dto"
import {UpdateReservationDto} from "./update.reservation.dto"
import {Config} from "../../../../config";

export class ReservationController {
// Async metoda pro GET
    async getAll(req: express.Request, res: express.Response){
        console.log('getAll')
        const reservations = await ReservationService.getAllReservations()
        res.status(200).send(reservations)
    }

    async getById(req: express.Request, res: express.Response){
        console.log('getById');
        const { id } = await validateParams(req, IdParam)
        const reservation = await ReservationService.getReservationById(id)
        if (reservation === null) {
            res.status(404).send()
            return
        }
        res.status(200).send(reservation)
    }

// Async metoda pro POST
    async create(req: express.Request, res: express.Response){
        console.log('create')
        const dto = await validateBody(req, CreateReservationDto)
        const newReservation = await ReservationService.createReservation(dto)

        const roomUpdateResponse = await axios.put(
            `${Config.roomControlUrl}/rooms/${dto.roomId}/reservation`,
            {
                reservationId: newReservation._id,
                from: newReservation.from,
                to: newReservation.to,
                status: newReservation.status,
            }
        )

        if (roomUpdateResponse.status !== 200) {
            console.error('Failed to update room reservations')
            res.status(500).send({ error: 'Room update failed' })
            return;
        }

        res.status(201).send(newReservation)
    }

// Async metoda pro PUT
    async update(req: express.Request, res: express.Response){
        console.log('update')
        const { id } = await validateParams(req, IdParam)
        console.log('update id ', id)
        const dto = await validateBody(req, UpdateReservationDto)
        const updatedReservation = await ReservationService.updateReservation(id, dto)
        if (updatedReservation === null) {
            res.status(404).send()
            return
        }
        res.status(200).send(updatedReservation)
    }

// Async metoda pro DELETE
    async delete(req: express.Request, res: express.Response){
        console.log('delete')
        const { id } = await validateParams(req, IdParam)
        console.log('delete id ', id)
        const deleted = await ReservationService.deleteReservation(id)
        if (deleted === null) {
            res.status(404).send()
            return
        }
        res.status(204).send()
    }

    async deleteReservationsForRoom(req: express.Request, res: express.Response) {
        console.log('delete for room')
        const { id } = await validateParams(req, IdParam)
        console.log('delete id ', id)
        const isDeleted = await ReservationService.deleteReservationsForRoom(id)
        if(!isDeleted){
            res.status(404).send()
            return
        }
        res.status(200).send()
    }
}