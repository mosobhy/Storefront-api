import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const orders_route = express.Router()


orders_route.get('/:user_id', (req: Request, res: Response) => {
    res.send('api/orders/:user_id')
})


export default orders_route;