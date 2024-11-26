var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import configs from './env.js';
import { User } from '../entities/User.js';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: configs.database.POSTGRES_HOST,
    port: configs.database.POSTGRES_PORT,
    username: configs.database.POSTGRES_USER,
    password: configs.database.POSTGRES_PASSWORD,
    database: configs.database.POSTGRES_DB,
    entities: [User],
    synchronize: true,
    logging: true,
});
export const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AppDataSource.initialize();
        console.log('Database connection successful');
    }
    catch (err) {
        console.error('Database connection', err);
    }
});
