import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserStore } from '../../models/users'
import { verifyJWT } from '../utilities/middlewares'


dotenv.config()
const users_route = express.Router()


users_route.get('/', verifyJWT, async (req: Request, res: Response) => {
    try {
        const user_model = new UserStore()
        const users: User[] = await user_model.index()
        res.json(users).status(200)
    }
    catch(err) {
        res.status(400)
        res.json({message: "can not get users"})
    }
})

users_route.get('/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
       const user_model: UserStore = new UserStore() 
       const user: User = await user_model.showUser(Number(req.params.id))
       res.json(user).status(200)
    }
    catch(err) {
        res.status(400)
        res.json({message: "can not get user with id" + req.params.id})
    }
})

users_route.post('/', async (req: Request, res: Response) => {
    try {
        const user_model: UserStore = new UserStore()
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        user_model.createUser(user)
        .then((user) => {
            // create a jwt 
            const token = jwt.sign( user , String(process.env.JWT_TOKEN_SECRET))
            res.status(200)
            res.json(token)
        })
        .catch((err) => {
            console.log(err)
            res.status(400)
            res.json({ message: "ca not insert new user to db"})
        })
    }
    catch(err) {
        res.status(400)
        res.json({message: "can not add new user"})
    }
})



export default users_route;