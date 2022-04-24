"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_orders_1 = require("../../dashboard_models/user_orders");
const user_order_model = new user_orders_1.UserOrder();
describe('testing the user_order_product model', () => {
    it('getOrderByUser function should be defined', async () => {
        expect(user_order_model.getOrderByUser).toBeDefined();
    });
});
