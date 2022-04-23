import { Order, OrderStore } from "../../models/orders";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const order_model = new OrderStore()

describe('testing the OrderStore model', () => {
    it('orders index should be defined', async () => {
        expect(order_model.index).toBeDefined()
    })
})