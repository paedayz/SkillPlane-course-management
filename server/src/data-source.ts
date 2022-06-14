import "reflect-metadata"
import { DataSource } from "typeorm"
import { url } from "../config"
import { Course } from "./entity/Course.entity"
import { User } from "./entity/User.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    url,
    synchronize: true,
    logging: false,
    entities: [User, Course],
    migrations: [],
    subscribers: [],
})
