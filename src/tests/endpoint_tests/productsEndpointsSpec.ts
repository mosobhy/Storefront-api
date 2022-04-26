import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe("testing all products endpoints", () => {
    describe("testing the index '/'", () => {
        it("returns products array", async () => {
           const result = await request
           .get('/')
           .set('Content-Type', 'application/json')
            expect(result).toEqual({
                
            })
        })
    })
})