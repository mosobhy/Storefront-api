"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const middlewares_1 = require("../utilities/middlewares");
const user_orders_1 = require("../../dashboard_models/user_orders");
dotenv_1.default.config();
const orders_route = express_1.default.Router();
orders_route.get('/:user_id', middlewares_1.verifyJWT, async (req, res) => {
    try {
        const user_order = new user_orders_1.UserOrder();
        const user_order_products = await user_order.getOrderByUser(Number(req.params.user_id));
        res.status(200);
        res.json(user_order_products);
    }
    catch (err) {
        res.status(400);
        res.json({ message: 'can not get products of ' + req.params.user_id });
    }
});
exports.default = orders_route;
