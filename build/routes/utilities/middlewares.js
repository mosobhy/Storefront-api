"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJWT = async (req, res, next) => {
    try {
        // access the authrization header
        const authorizationHeader = String(req.headers.authorization);
        const jwt_token = authorizationHeader.split(' ')[1];
        console.log("jwt: " + jwt_token);
        jsonwebtoken_1.default.verify(jwt_token, String(process.env.JWT_TOKEN_SECRET));
        return next();
    }
    catch (err) {
        res.json({ message: "invalid token" }).status(401);
    }
};
exports.verifyJWT = verifyJWT;
