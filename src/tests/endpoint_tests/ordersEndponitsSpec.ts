import supertest from 'supertest'
import app from '../../server'


const request = supertest(app)


describe("testing the orders endpoints", () => {
    describe("testing the get user's order '/orders/:user_id/' ", () => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImZpcnN0bmFtZSI6ImZhdG1hIiwibGFzdG5hbWUiOiJzYW1haGEiLCJwYXNzd29yZF9oYXNoIjoiJDJiJDEwJGpYbG9BWFNWQi5IRFhJalBWWnVmQk9mT3ZTcUVlcjNYU01HNDhubjhlL01rNkFadkFmL0EuIiwiaWF0IjoxNjUxMDY2NzgzfQ.1w13_8C46TJE9bocl7wZxTghDs6UPe3CyA8fUAuqtfg'

        it("should return be valid when a user id is provided", async () => {
            const response = await request
            .get("/api/orders/2")
            .set("Authorization", `Bearer ${token}`)

            expect(response.status).toEqual(200)
        })

        it('should fail when an invalid id is provided', async () => {
            const id = 'this_is_invalid_id'
            const err_message = 'can not get products of '
            const response = await request
            .get(`/api/orders/${id}`)
            .set("Authorization", `Bearer ${token}`)

            expect(response.status).toBe(400)
            expect(response.body.message).toEqual(`${err_message + id}`)
        })
    })
})