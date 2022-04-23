"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM orders";
            const results = await connection.query(query);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`can not read orders from db, err: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
