import 'reflect-metadata';
import mongo from "./persistence/mongo";
import {Config} from "../config";
import { createServer } from "http";
import { socketServer } from "./socket/socket.server";
import { server as apiServer } from "./api/server";

const port = Config.port || 3002

async function init() {
    await mongo.connect()

    const httpServer = createServer(apiServer);
    socketServer.init(httpServer);

    httpServer.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`)
    })
}

init()