"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env_vars = {
    HOST: process.env.DATABASE_HOST,
    DEV_DATABASE: process.env.DEV_DATABASE_NAME,
    TEST_DATABASE: process.env.TEST_DATABASE_NAME,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    SERVER_MODE: process.env.ENV
};
console.dir(env_vars);
console.log('a7a');
let databaseClient = new pg_1.Pool({
    host: env_vars.HOST,
    database: env_vars.SERVER_MODE === 'dev' ? env_vars.DEV_DATABASE : env_vars.TEST_DATABASE,
    user: env_vars.USERNAME,
    password: env_vars.PASSWORD
});
console.log("the database client is: ");
console.dir(databaseClient);
exports.default = databaseClient;
