import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const env_vars = {
    HOST: process.env.DATABASE_HOST,
    DEV_DATABASE: process.env.DEV_DATABASE_NAME,
    TEST_DATABASE: process.env.TEST_DATABASE_NAME,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    SERVER_MODE: process.env.NODE_ENV
}

console.dir(env_vars)
console.log('a7a')
let databaseClient: Pool = new Pool({
    host: env_vars.HOST,
    database: env_vars.SERVER_MODE === 'dev' ? env_vars.DEV_DATABASE: env_vars.TEST_DATABASE,
    user: env_vars.USERNAME,
    password: env_vars.PASSWORD
})


console.log("the database client is: ")
console.dir(databaseClient)

export default databaseClient;