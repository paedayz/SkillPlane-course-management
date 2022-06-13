import "reflect-metadata"
import { DataSource } from "typeorm"
import { url } from "../config"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    url,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
