"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
describe('testing the users endpoints', () => {
    let token;
    describe("testing the post user '/'", () => {
        it("should return a valid jwt that hide the created user", async () => {
            const user = {
                firstname: "mohamed",
                lastname: "sobhy",
                password: "123"
            };
            const response = await request
                .post('/api/users/')
                .set('Content-Type', 'application/json')
                .send(user);
            // jwt response
            token = response.body;
            expect(response.status).toBe(200);
            expect(jsonwebtoken_1.default.verify(token, String(process.env.JWT_TOKEN_SECRET))).toBeTruthy();
        });
        it("shold fail when no user data posted", async () => {
            const response = await request
                .post('/api/users/')
                .send("invalid data");
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual("ca not insert new user to db");
        });
    });
    describe("testing the get users '/users'", () => {
        it("should return all users when a token provided", async () => {
            const response = await request
                .get("/api/users")
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
        // it("should fail when no token is provided", async () => {
        //     const response = await request
        //     .get('/api/users')
        //     expect(response.status).toBe(401)
        //     expect(response.body.message).toEqual("invalid token")
        // })
    });
    describe("testing get user by id '/users/:id'", () => {
        it("should return a user with id 1 if 1 is provided", async () => {
            const response = await request
                .get('/api/users/1')
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(1);
        });
        // it("should fail when no token is provided", async () => {
        //     const response = await request
        //     .get('/api/users/1')
        //     expect(response.status).toBe(401)
        //     expect(response.body.message).toEqual('invalid token')
        // })
    });
});
