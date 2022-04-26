"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM users";
            const results = await connection.query(query);
            connection.release();
            return results.rows;
        }
        catch (err) {
            throw new Error("database error when indexing users: " + err);
        }
    }
    async showUser(id) {
        try {
            const connection = await database_1.default.connect();
            const query = "SELECT * FROM users WHERE id=($1)";
            const results = await connection.query(query, [id]);
            connection.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`falied to fetch user with id: ${id}, err: ` + err);
        }
    }
    async createUser(user) {
        try {
            const connection = await database_1.default.connect();
            const sql_query = "INSERT INTO users(firstname, lastname, password_hash) VALUES($1, $2, $3) RETURNING *";
            const password_hash = bcrypt_1.default.hashSync(user.password + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
            const results = await connection.query(sql_query, [user.firstname, user.lastname, password_hash]);
            connection.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`can not create new user: ` + err);
        }
    }
}
exports.UserStore = UserStore;
