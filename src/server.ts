import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app: express.Application = express()
const address: string = String(process.env.PORT)

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(address, () => {
    console.log(`starting app on: http://localhost:${address}`)
})
