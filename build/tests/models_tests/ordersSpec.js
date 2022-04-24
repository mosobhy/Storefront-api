"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const order_model = new orders_1.OrderStore();
describe('testing the OrderStore model', () => {
    it('orders index should be defined', async () => {
        expect(order_model.index).toBeDefined();
    });
});
