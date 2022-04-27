import supertest from 'supertest'
import app from '../../server'
import { Product } from '../../models/products' 

const request = supertest(app)

describe("testing all products endpoints", () => {
    describe("testing the index '/'", () => {
        it("returns products array", async () => {
            
           const result = await request
           .get('/api/products/')
            const data = result.body
            expect(data).toBeInstanceOf(Array)
        })
    })


    describe("testing the post '/'", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImZpcnN0bmFtZSI6Im1vaGFtZWQiLCJsYXN0bmFtZSI6InNvYmh5IiwicGFzc3dvcmRfaGFzaCI6IiQyYiQxMCRxUzFvWjB6L3lGdllvUmpkbXZwTWllWm85TGk0YS9QLzJKYjNXNk0zNE1BRmlyZTZqMk9PVyIsImlhdCI6MTY1MDg5NDExMH0.xKQzhLmwKaVs7KTNaIWCmCdSAqTP8if__06OiRaNb-A"
        const p: Product = {
                id: 2,
                name: 'test2',
                price: 1234,
                category: 'toys'
        }
        it("should return the same object that is posted", async () => {
            
            const result = await request
                .post('/api/products/')
                .set("Authorization", `Bearer ${token}`)
                .send(p)
            expect(result.status).toBe(200)
        })

        // it("should fail when no token provided", async () => {
        //     const response = await request
        //     .post("/api/products/")
        //     .send(p)

        //     expect(response.status).toBe(401)
        //     expect(response.body.message).toEqual('invalid token')
        // })
    })


    describe("testing get prdoduc by id '/'", () => {
        it("should return a product with id 1 when 1 is provided", async () => {
            const response = await request
            .get("/api/products/1")
            expect(response.status).toBe(200)
            expect(response.body.name).toEqual("test2")
            expect(response.body.price).toEqual(1234)
            expect(response.body.category).toEqual('toys')
            
        })

        it("should return empty str if provided a non existing id", async () => {
            const response = await request
            .get("/api/products/1000")
            expect(response.status).toBe(200)
            expect(response.body).toEqual('')
        })

        it("should fail if provided with a string as id", async () => {
            const str_id = 'this_is_an_id'
            const str_message = 'can not fetch product with id: '
             const response = await request
            .get(`/api/products/${str_id}`)
            expect(response.status).toBe(400)
            expect(response.body.message).toEqual(`${str_message + str_id}`)
        })
    })


    describe("testing the 'filter/:category'", () => {
        it("should return array of items with the same caategory", async () => {
            const response = await request
            .get('/api/products/filter/cat1')
            
            expect(response.status).toBe(200)
        })
    })
})