"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../../models/users");
dotenv_1.default.config();
const register = express_1.default.Router();
register.post('/', async (req, res) => {
    if (req.body.firstname && req.body.lastname && req.body.password) {
        try {
            const user_model = new users_1.UserStore();
            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
            };
            const result = await user_model.createUser(user);
            // create jwt of the returned user
            const token = jsonwebtoken_1.default.sign(result, String(process.env.JWT_TOKEN_SECRET));
            res.status(200).json(token);
        }
        catch (err) {
            res.status(500);
            res.json({ message: "can not create new user" });
        }
    }
    else {
        res.status(400);
        res.json({ message: "invalid input data" });
    }
});
exports.default = register;
