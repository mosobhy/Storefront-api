"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const user_model = new users_1.UserStore();
describe('testing the UserStore model', () => {
    it('index method is defined', () => {
        expect(user_model.index).toBeDefined();
    });
    it('createuser method is defined', () => {
        expect(user_model.createUser).toBeDefined();
    });
    it('showUser method is defined', () => {
        expect(user_model.showUser).toBeDefined();
    });
    it('inserting a user works', async () => {
        const password_hash = bcrypt_1.default.hashSync('1234' + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
        const newUser = {
            firstname: 'new_user_first',
            lastname: 'new_user_last',
            password: password_hash
        };
        const returned_user = await user_model.createUser(newUser);
        // console.log(returned_user)
        // console.log('thehashis: ' + returned_user.password)
        expect(returned_user.firstname).toEqual(newUser.firstname);
        expect(returned_user.lastname).toEqual(newUser.lastname);
        // expect(bcrypt.compareSync('1234' + String(process.env.BCRYPT_PASSWORD), returned_user.password)).toBeTrue()
    });
    it('show a user by id works', async () => {
        const id = 1;
        const returned_user = await user_model.showUser(id);
        expect(returned_user.id).toEqual(id);
    });
    it('should retuns 1 user when index is called', async () => {
        const result = await user_model.showUser(1);
        expect(result.id).toEqual(1);
    });
});
