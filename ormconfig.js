"use strict";
exports.__esModule = true;
exports.config = void 0;
require('dotenv').config();
exports.config = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    //  username: 'postgres',
    // database: 'hibba',
    // password: '12345',
    // host: process.env.DB_HOST,
    // port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
};
