import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './cors'
import mainRoute from './routes/main_route'

dotenv.config()

const app: express.Application = express()
const address: string = String(process.env.PORT)

app.use(cors(corsOptions))
app.use(bodyParser.json())

// maping the application to the api
app.use("/api/", mainRoute)

app.listen(address, () => {
    console.log(`starting app on: http://localhost:${address}`)
})
