import { DataSource } from "typeorm";
import { Client } from "./entity/Client";
import { BalanceSheet } from "./entity/BalanceSheet";
import * as dotenv from "dotenv";


dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Client, BalanceSheet],
    migrations: [],
    subscribers: [],
});
