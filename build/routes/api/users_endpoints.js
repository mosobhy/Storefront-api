"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route = express_1.default.Router();
users_route.get('/', (req, res) => {
    res.send("/api/users");
});
users_route.get('/:id', (req, res) => {
    res.send('/api/users/:id');
});
users_route.post('/users', (req, res) => {
    res.send('/api/users  post');
});
exports.default = users_route;
