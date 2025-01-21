import {beforeEach, describe, expect, it} from "vitest";
import {Room} from "../../src/persistence/models/room.model";
import {Schema, Types} from "mongoose";
import request from "../request";

describe('TESTS /rooms', () => {
    beforeEach(async () => {
        // Před každým testem vytvoříme místnost
        await new Room({
            _id: new Types.ObjectId('c10000000000000000000000'),
            name: "Meeting Room A",
            capacity: 10,
            equipment: ["Projector", "Whiteboard", "Wi-Fi"],
            location: "Building 1, 2nd floor",
            pricePerHour: 300,
            reservations: [
                {
                    reservationId: new Types.ObjectId('a10000000000000000000000'),
                    from: "2025-01-12T10:00:00.000Z",
                    to: "2025-01-12T12:00:00.000Z",
                    status: "confirmed"
                }
            ],
            ownerId: new Types.ObjectId('b10000000000000000000000')
        }).save()
    })

    // Test pro získání všech místností
    it('should get all rooms', async () => {
        const response = await request.get('/rooms')

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThan(0)
    })

    // Test pro získání místnosti podle ID
    it('should get a room by ID', async () => {
        const roomId = 'c10000000000000000000000'
        const response = await request.get(`/rooms/${roomId}`)

        expect(response.status).toBe(200)
        expect(response.body._id).toBe(roomId)
        expect(response.body.name).toBe("Meeting Room A")
        expect(response.body.capacity).toBe(10)
        expect(response.body.equipment).toContain("Projector")
    })

    // Test pro získání místnosti s neplatným ID
    it('should return 400 for a non-existing/invalid room ID', async () => {
        const response = await request.get('/rooms/invalidId')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters')
    })

    // Test pro vytvoření nové místnosti
    it('should create a new room', async () => {
        const newRoom = {
            name: "Conference Room",
            capacity: 20,
            equipment: ["Projector", "Sound System", "Wi-Fi"],
            location: "Building 2, 3rd floor",
            pricePerHour: 500,
            reservations: [],
            ownerId: "b20000000000000000000000"
        }

        const response = await request
            .post('/rooms')
            .send(newRoom)
            .set('Content-Type', 'application/json')

        expect(response.status).toBe(201)
        expect(response.body.name).toBe(newRoom.name)
        expect(response.body.capacity).toBe(newRoom.capacity)
        expect(response.body.pricePerHour).toBe(newRoom.pricePerHour)
    })

    // Test pro aktualizaci existující místnosti
    it('should update an existing room', async () => {
        const roomId = 'c10000000000000000000000'
        const updatedRoom = {
            name: "Updated Meeting Room A",
            capacity: 15,
            equipment: ["Projector", "Whiteboard", "Wi-Fi", "TV"],
            location: "Building 1, 1st floor",
            pricePerHour: 350
        }

        const response = await request
            .put(`/rooms/${roomId}`)
            .send(updatedRoom)
            .set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updatedRoom.name)
        expect(response.body.capacity).toBe(updatedRoom.capacity)
        expect(response.body.location).toBe(updatedRoom.location)
    })

    // Test pro aktualizaci místnosti s neplatným ID
    it('should return 400 for updating a non-existing/invalid room', async () => {
        const response = await request
            .put('/rooms/invalidId')
            .send({
                name: "Updated Meeting Room A",
                capacity: 15,
                equipment: ["Projector", "Whiteboard", "Wi-Fi", "TV"],
                location: "Building 1, 1st floor",
                pricePerHour: 350
            })
            .set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters')
    })

    // Test pro smazání místnosti
    it('should delete a room', async () => {
        const roomId = 'c10000000000000000000000'
        const response = await request.delete(`/rooms/${roomId}`)

        expect(response.status).toBe(204) // No content on successful deletion
    })

    // Test pro smazání místnosti s neplatným ID
    it('should return 400 for deleting a non-existing/invalid room', async () => {
        const response = await request.delete('/rooms/invalidId')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Id must have 24 characters')
    })
})