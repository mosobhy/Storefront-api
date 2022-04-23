import databaseClient from "../database";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'


interface Product {
    id?: number,
    name: string,
    price: number,
    category: string
}


export class ProductReports {

    async getTopFiveProducts(): Promise<Product[]> {
        try {
            const connection = await databaseClient.connect()
            const sql = `
                WITH cte(product_id, count) AS (
                   SELECT product_id, COUNT(*) FROM orders_products_join
                   GROUP BY product_id ORDER BY product_id DESC
                   LIMIT 5
                )
                SELECT * FROM products AS p JOIN cte ON p.id = cte.product_id
                ORDER BY cte.count DESC
                LIMIT 5
            `
            const results = await connection.query(sql)
            connection.release()
            return results.rows
        }
        catch (err) {
            throw new Error(`can not retrieve top products, err: ${err}`)
        }
    }
}