import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const products_route = express.Router()


products_route.get('/', (req: Request, res: Response) => {
    res.send('/api/products/')
})

products_route.get('/:id', (req: Request, res: Response) => {
    res.send('api/products/:id')
})

products_route.post('/', (req: Request, res: Response) => {
    res.send('api/products   post')
})

products_route.get('/top-5-products', (req: Request, res: Response) => {
    res.send('/products/top-products')
})

products_route.get('/filter/:category', (req: Request, res: Response) => {
    res.send('api/productes/filter/:categor')
})


export default products_route;