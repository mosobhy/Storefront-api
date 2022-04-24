"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReport = void 0;
const database_1 = __importDefault(require("../database"));
class ProductReport {
    async getTopFiveProducts() {
        try {
            const connection = await database_1.default.connect();
            const sql = `
                WITH cte(product_id, count) AS (
                   SELECT product_id, COUNT(*) FROM orders_products_join
                   GROUP BY product_id ORDER BY product_id DESC
                   LIMIT 5
                )
                SELECT * FROM products AS p JOIN cte ON p.id = cte.product_id
                ORDER BY cte.count DESC
                LIMIT 5
            `;
            const results = await connection.query(sql);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`can not retrieve top products, err: ${err}`);
        }
    }
}
exports.ProductReport = ProductReport;
