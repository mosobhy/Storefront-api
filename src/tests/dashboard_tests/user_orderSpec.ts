import { UserOrderProduct, UserOrder } from '../../dashboard_models/user_orders'

const user_order_model = new UserOrder()

describe('testing the user_order_product model', () => {
    it('getOrderByUser function should be defined', async () => {
        expect(user_order_model.getOrderByUser).toBeDefined()
    })

})