import Sequelize from 'sequelize';
import dotenv from 'dotenv';
//This is for environment variables
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME, //database name
    process.env.DB_USER, //username
    process.env.DB_PASS, //password
    {
        host: process.env.DB_HOST, //hostname
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5, //PREGUNTAR QUE SON ESTOS VALORES
            min: 0,
            require: 30000,
            idle: 10000
        },       
        logging: false //not register messages in console
    }
);