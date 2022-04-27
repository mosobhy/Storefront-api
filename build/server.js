"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("./cors"));
const main_route_1 = __importDefault(require("./routes/main_route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const address = String(process.env.PORT);
app.use((0, cors_1.default)(cors_2.default));
app.use(body_parser_1.default.json());
// maping the application to the api
app.use("/api/", main_route_1.default);
app.listen(address, () => {
    console.log(`starting app on: http://localhost:${address}`);
});
exports.default = app;
