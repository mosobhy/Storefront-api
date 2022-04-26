"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const middlewares_1 = require("../utilities/middlewares");
const products_1 = require("../../models/products");
const product_reports_1 = require("../../dashboard_models/product_reports");
dotenv_1.default.config();
const products_route = express_1.default.Router();
products_route.get('/', async (req, res) => {
    try {
        const products_model = new products_1.ProductStore();
        const products = await products_model.index();
        res.status(200);
        res.json(products);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json({ message: 'can not retrieve products from db' });
    }
});
products_route.get('/:id', async (req, res) => {
    try {
        const products_model = new products_1.ProductStore();
        const product = await products_model.showProduct(Number(req.params.id));
        res.status(200);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json({ message: 'can not fetch product with id: ' + req.params.id });
    }
});
products_route.post('/', middlewares_1.verifyJWT, async (req, res) => {
    try {
        const p = {
            name: req.body.name,
            price: Number(req.body.price),
            category: req.body.category
        };
        const products_model = new products_1.ProductStore();
        const product = await products_model.createProduct(p);
        res.status(200);
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json({ message: 'can not insert a new product to db' });
    }
});
products_route.get('/top-5-products/', async (req, res) => {
    try {
        const product_reports_model = new product_reports_1.ProductReport();
        const top_products = await product_reports_model.getTopFiveProducts();
        res.status(200);
        res.json(top_products);
    }
    catch (err) {
        res.status(400);
        res.json({ message: 'can not fetch top 5 products' });
    }
});
products_route.get('/filter/:category', async (req, res) => {
    try {
        const product_model = new products_1.ProductStore();
        const products = await product_model.filterProductsByCategory(String(req.params.category));
        res.status(200);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json({ message: 'can not filter on db' });
    }
});
exports.default = products_route;
