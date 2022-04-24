import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { verifyJWT } from '../utilities/middlewares'
import { UserOrderProduct, UserOrder } from '../../dashboard_models/user_orders'


dotenv.config()
const orders_route = express.Router()


orders_route.get('/:user_id', verifyJWT, async (req: Request, res: Response) => {
    try {
        const user_order = new UserOrder()
        const user_order_products = await user_order.getOrderByUser(Number(req.params.user_id))
        res.status(200)
        res.json(user_order_products)
    }
    catch (err) {
        res.status(400)
        res.json({ message: 'can not get products of ' + req.params.user_id })
    }
})


export default orders_route;