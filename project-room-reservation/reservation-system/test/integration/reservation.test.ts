import {beforeEach, describe, expect, it} from "vitest";
import request from "../request";
import {Reservation} from "../../src/persistence/models/reservation.model";
import {Schema, Types} from "mongoose";

describe('TESTS /reservations', () => {
    beforeEach(async () => {
        await new Reservation({
            _id: new Types.ObjectId('a10000000000000000000000'),
            roomId: new Types.ObjectId('b10000000000000000000000'),
            userId: new Types.ObjectId('c10000000000000000000000'),
            from: "2025-01-12T10:00:00.000Z",
            to: "2025-01-12T12:00:00.000Z",
            status: "confirmed",
            totalPrice: 2000
        }).save()
    });

    it('should get all reservations', async () => {
        const response = await request.get('/reservations');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a reservation by ID', async () => {
        const reservationId = 'a10000000000000000000000';
        const response = await request.get(`/reservations/${reservationId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(reservationId);
        expect(response.body.roomId).toBe("b10000000000000000000000");
        expect(response.body.status).toBe("confirmed");
    });

    it('should return 400 for a non-existing/invalid reservation ID', async () => {
        const response = await request.get('/reservations/invalidId');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters');
    });

    it('should create a new reservation', async () => {
        const newReservation = {
            roomId: "b20000000000000000000000",
            userId: "c20000000000000000000000",
            from: "2025-01-13T10:00:00.000Z",
            to: "2025-01-13T12:00:00.000Z",
            status: "confirmed",
            totalPrice: 2500
        };

        const response = await request
            .post('/reservations')
            .send(newReservation)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body.roomId).toBe(newReservation.roomId);
        expect(response.body.totalPrice).toBe(newReservation.totalPrice);
    });

    it('should update an existing reservation', async () => {
        const reservationId = 'a10000000000000000000000';
        const updatedReservation = {
            from: "2025-01-12T14:00:00.000Z",
            to: "2025-01-12T16:00:00.000Z",
            status: "unconfirmed",
            totalPrice: 1500
        };

        const response = await request
            .put(`/reservations/${reservationId}`)
            .send(updatedReservation)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.from).toBe(updatedReservation.from);
        expect(response.body.status).toBe(updatedReservation.status);
    });

    it('should return 400 for updating a non-existing/ivalid reservation', async () => {
        const response = await request
            .put('/reservations/invalidId')
            .send({
                from: "2025-01-12T14:00:00.000Z",
                to: "2025-01-12T16:00:00.000Z",
                status: "unconfirmed",
                totalPrice: 1500
            })
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters');
    });

    it('should delete a reservation', async () => {
        const reservationId = 'a10000000000000000000000';
        const response = await request.delete(`/reservations/${reservationId}`);

        expect(response.status).toBe(204); // No content on successful deletion
    });

    it('should return 400 for deleting a non-existing/invalid reservation', async () => {
        const response = await request.delete('/reservations/invalidId');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters');
    });
});