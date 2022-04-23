import { User, UserStore } from "../../models/users";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const user_model = new UserStore()

describe('testing the UserStore model', () => {
    it('index method is defined', () => {
        expect(user_model.index).toBeDefined()
    })

    it('createuser method is defined', () => {
        expect(user_model.createUser).toBeDefined()
    })
    
    it('showUser method is defined', () => {
        expect(user_model.showUser).toBeDefined()
    })

    it('inserting a user works', async() => {
        const password_hash = bcrypt.hashSync('1234'+process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS))
        const newUser: User = {
            firstname: 'mohamed',
            lastname: 'sobhy',
            password : password_hash
        }
        const returned_user = await user_model.createUser(newUser)
        expect(returned_user).toEqual(newUser)
    })

    it('show a user by id works', async () => {
        const id = 1
        const returned_user = await user_model.showUser(id)
        expect(returned_user.id).toEqual(id)
    })

    it('should retuns 1 user when index is called', async () => {
        const result = await user_model.showUser(1)
        expect(result.id).toEqual(1)
    })
})