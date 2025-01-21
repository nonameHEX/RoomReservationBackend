import express = require('express')

export const statusController = {
    getStatus(req: express.Request, res: express.Response) {
        res.sendStatus(200)
    }
}