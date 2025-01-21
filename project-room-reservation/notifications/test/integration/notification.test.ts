import {beforeEach, describe, expect, it} from "vitest";
import request from "../request";

describe('POST /notifications', () => {
    beforeEach(async () => {
        // No data for these tests
    })

    it('returns 201 for valid data', async () => {
        const timestamp = Date.now()
        const res = await request
            .post(`/notifications`)
            .send({
                userId: "c10000000000000000000000",
                message: "Nová rezervace pro taneční plocha",
            })
        console.log(res.body)
        expect(res.status).toBe(201)
        expect(res.body.userId).toBe('c10000000000000000000000')
        expect(res.body.message).toBe('Nová rezervace pro taneční plocha')
        expect(Date.parse(res.body.created)).toBeGreaterThanOrEqual(timestamp)
    })

    it('returns 400 for invalid userId', async () => {
        const timestamp = Date.now()
        const res = await request
            .post(`/notifications`)
            .send({
                userId: "c1000000000000000000000",  // Only 23 chars
                message: "Nová rezervace pro taneční plocha",
            })
        console.log(res.body)
        expect(res.status).toBe(400)
    })

    it('returns 400 for invalid message', async () => {
        const timestamp = Date.now()
        const res = await request
            .post(`/notifications`)
            .send({
                userId: "c10000000000000000000000",
                message: "",
            })
        console.log(res.body)
        expect(res.status).toBe(400)
    })
})