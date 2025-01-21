import 'reflect-metadata';
import {Config} from "../config";
import mongo from "./persistence/mongo";
import {server} from "./api/server";

const port = Config.port || 3000

async function init() {
    await mongo.connect()

    server.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`)
    })
}

init()