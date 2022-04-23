"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ProductStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM products";
            const results = await connection.query(query);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`can not fetch products from db: ${err}`);
        }
    }
    async showProduct(id) {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM products WHERE id=($1)";
            const results = await connection.query(query, [id]);
            connection.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`can not fetch product with id: ${id}, err: ${err}`);
        }
    }
    async createProduct(product) {
        try {
            const connection = await database_1.default.connect();
            const query = "INSERT INTO products(name, price, category) VALUES($1, $2, $3)";
            const results = await connection.query(query, [product.name, product.price, product.category]);
            connection.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`can not add product ${product.name} to db: ${err}`);
        }
    }
    async filterProductsByCategory(category) {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM products WHERE category=($1)";
            const results = await connection.query(query, [category]);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`can not filter products by categor ${category}, err: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
