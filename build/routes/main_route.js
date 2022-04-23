"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_endpoints_1 = __importDefault(require("./api/users_endpoints"));
const products_endpoint_1 = __importDefault(require("./api/products_endpoint"));
const orders_endpoints_1 = __importDefault(require("./api/orders_endpoints"));
const mainRoute = express_1.default.Router();
// map the main route to the api resources
mainRoute.use('/users/', users_endpoints_1.default);
mainRoute.use('/products/', products_endpoint_1.default);
mainRoute.use('/orders/', orders_endpoints_1.default);
exports.default = mainRoute;
