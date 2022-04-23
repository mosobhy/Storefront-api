"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrders = void 0;
const database_1 = __importDefault(require("../database"));
class UserOrders {
    async getOrderByUser(user_id) {
        try {
            const connection = await database_1.default.connect();
            const query = `
                SELECT * FROM products WHERE id IN
                (
                    SELECT product_id FROM orders_products_join
                    WHERE order_id IN
                    (SELECT id FROM orders WHERE user_id=($1))
                )
            `;
            const results = await connection.query(query, [user_id]);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`can not fetch products from db: ${err}`);
        }
    }
}
exports.UserOrders = UserOrders;
