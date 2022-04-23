"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const products_route = express_1.default.Router();
products_route.get('/', (req, res) => {
    res.send('/api/products/');
});
products_route.get('/:id', (req, res) => {
    res.send('api/products/:id');
});
products_route.post('/', (req, res) => {
    res.send('api/products   post');
});
products_route.get('/top-5-products', (req, res) => {
    res.send('/products/top-products');
});
products_route.get('/filter/:category', (req, res) => {
    res.send('api/productes/filter/:categor');
});
exports.default = products_route;
