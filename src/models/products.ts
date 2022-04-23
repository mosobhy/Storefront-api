import databaseClient from "../database";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

export interface Product {
    id?: number,
    name: string,
    price: number,
    category: string
}

export class ProductStore {

    async index(): Promise<Product[]> {
       try {
           const connection = await databaseClient.connect()
           const query = "SELECT * FROM products"
           const results = await connection.query(query)
           connection.release()
           return results.rows
       } 
       catch (err) {
           throw new Error(`can not fetch products from db: ${err}`)
       }
    }

    async showProduct(id: number): Promise<Product> {
       try {
           const connection = await databaseClient.connect()
           const query = "SELECT * FROM products WHERE id=($1)"
           const results = await connection.query(query, [id])
           connection.release()
           return results.rows[0]
       } 
       catch (err) {
           throw new Error(`can not fetch product with id: ${id}, err: ${err}`)
       }
    }

    async createProduct(product: Product): Promise<Product> {
       try {
           const connection = await databaseClient.connect()
           const query = "INSERT INTO products(name, price, category) VALUES($1, $2, $3)"
           const results = await connection.query(query, [product.name, product.price, product.category])
           connection.release()
           return results.rows[0]
       } 
       catch (err) {
           throw new Error(`can not add product ${product.name} to db: ${err}`)
       }
    }

    async filterProductsByCategory(category: string): Promise<Product[]> {
       try {
           const connection = await databaseClient.connect()
           const query = "SELECT * FROM products WHERE category=($1)"
           const results = await connection.query(query, [category])
           connection.release()
           return results.rows
       } 
       catch (err) {
           throw new Error(`can not filter products by categor ${category}, err: ${err}`)
       }
    }
}
