"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../../models/users");
const middlewares_1 = require("../utilities/middlewares");
dotenv_1.default.config();
const users_route = express_1.default.Router();
users_route.get('/', middlewares_1.verifyJWT, async (req, res) => {
    try {
        const user_model = new users_1.UserStore();
        const users = await user_model.index();
        res.json(users).status(200);
    }
    catch (err) {
        res.status(400);
        res.json({ message: "can not get users" });
    }
});
users_route.get('/:id', middlewares_1.verifyJWT, async (req, res) => {
    try {
        const user_model = new users_1.UserStore();
        const user = await user_model.showUser(req.body.id);
        res.json(user).status(200);
    }
    catch (err) {
        res.status(400);
        res.json({ message: "can not get user with id" + req.body.id });
    }
});
users_route.post('/users', middlewares_1.verifyJWT, (req, res) => {
    try {
        const user_model = new users_1.UserStore();
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        user_model.createUser(user)
            .then((user) => {
            // create a jwt 
            const token = jsonwebtoken_1.default.sign({ user: user }, String(process.env.JWT_TOKEN_SECRET));
            res.status(200);
            res.json(token);
        })
            .catch((err) => {
            console.log(err);
            res.status(400);
            res.json({ message: "ca not insert new user to db" });
        });
    }
    catch (err) {
        res.status(400);
        res.json({ message: "can not add new user" });
    }
});
exports.default = users_route;
