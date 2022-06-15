"use strict";
exports.__esModule = true;
exports.config = void 0;
require('dotenv').config();
exports.config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRESS_DB,
    password: process.env.POSTGRESS_PASSWORD,
    // host: process.env.DB_HOST,
    // port: Number(process.env.PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
};
