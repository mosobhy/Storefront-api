import { Product, ProductStore } from "../../models/products";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const product_model = new ProductStore()

describe('testing the ProductStore model', () => {
    it('create production is defined', () => {
        expect(product_model.createProduct).toBeDefined()
    })

    it('show production is defined', () => {
        expect(product_model.showProduct).toBeDefined()
    })

    it('index is defined', () => {
        expect(product_model.index).toBeDefined()
    })

    it('filter by category is defined', () => {
        expect(product_model.filterProductsByCategory).toBeDefined()
    })

    it('returns an object when inserting new item', async() => {
        const p: Product = {
            name: 'Product',
            price: 1234,
            category: 'cat1'
        }
        const result = await product_model.createProduct(p)
        expect(result).toEqual(p)
    })

    it('retuns an item with id 1', async() => {
        const result = await product_model.index()
        expect(result[0].id).toEqual(1)
    })

    it('filter by cate should return one item', async() => {
        const result = await product_model.filterProductsByCategory('cat1')
        expect(result[0].category).toEqual('cat1')
    })
})