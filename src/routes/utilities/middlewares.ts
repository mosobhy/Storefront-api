import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // access the authrization header
        const authorizationHeader = String(req.headers.authorization)
        const jwt_token = authorizationHeader.split(' ')[1]
        jwt.verify(jwt_token, String(process.env.JWT_TOKEN_SECRET))
        return next()
    }
    catch (err) {
        res.json({ message: "invalid token"}).status(401)
    }
}
