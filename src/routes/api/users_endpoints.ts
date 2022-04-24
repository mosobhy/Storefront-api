import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserStore } from '../../models/users'
import { verifyJWT } from '../utilities/middlewares'


const users_route = express.Router()


users_route.get('/', verifyJWT, (req: Request, res: Response) => {
    res.send("/api/users")
})

users_route.get('/:id', verifyJWT, (req: Request, res: Response) => {
    res.send('/api/users/:id')
})

users_route.post('/users', verifyJWT, (req: Request, res: Response) => {
    res.send('/api/users  post')
})


export default users_route;