import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const users_route = express.Router()


users_route.get('/', (req: Request, res: Response) => {
    res.send("/api/users")
})

users_route.get('/:id', (req: Request, res: Response) => {
    res.send('/api/users/:id')
})

users_route.post('/users', (req: Request, res: Response) => {
    res.send('/api/users  post')
})


export default users_route;