"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const orders_route = express_1.default.Router();
orders_route.get('/:user_id', (req, res) => {
    res.send('api/orders/:user_id');
});
exports.default = orders_route;
