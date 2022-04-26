import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../../models/users'

dotenv.config()

const register = express.Router()


register.post('/', async (req: Request, res: Response) => {
    if (req.body.firstname && req.body.lastname && req.body.password) {
        try {
            const user_model = new UserStore()
            const user: User = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            }
            const result: User = await user_model.createUser(user)
        
            // create jwt of the returned user
            const token = jwt.sign( result , String(process.env.JWT_TOKEN_SECRET))
            res.status(200).json(token)
        }
        catch(err) {
            res.status(500)
            res.json({ message: "can not create new user"})
        }
    }
    else {
        res.status(400)
        res.json({ message: "invalid input data"})
    }
})

export default register 