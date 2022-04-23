import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const env_vars = {
    HOST: process.env.DATABASE_HOST,
    DEV_DATABASE: process.env.DEV_DATABASE_NAME,
    TEST_DATABASE: process.env.TEST_DATABASE_NAME,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    SERVER_MODE: process.env.ENV
}

let databaseClient: Pool;

if (env_vars.SERVER_MODE === 'dev') {
    databaseClient = new Pool({
        host: env_vars.HOST,
        database: env_vars.DEV_DATABASE,
        user: env_vars.USERNAME,
        password: env_vars.PASSWORD
    })
}
else {
    databaseClient = new Pool({
        host: env_vars.HOST,
        database: env_vars.TEST_DATABASE,
        user: env_vars.USERNAME,
        password: env_vars.PASSWORD
    })
}

export default databaseClient;