import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { verifyJWT } from '../utilities/middlewares'
import { Product, ProductStore } from '../../models/products'
import { ProductReport } from '../../dashboard_models/product_reports'


dotenv.config()
const products_route = express.Router()


products_route.get('/', async (req: Request, res: Response) => {
    try {
        const products_model: ProductStore = new ProductStore()
        const products: Product[] = await products_model.index()
        res.status(200)
        res.json(products)
    }
    catch( err ) {
        console.log(err)
        res.status(400)
        res.json({ message: 'can not retrieve products from db'})
    }
})

products_route.get('/:id', async (req: Request, res: Response) => {
    try {
        const products_model: ProductStore = new ProductStore()
        const product: Product = await products_model.showProduct(Number(req.params.id))
        res.status(200)
        res.json(product)
    }
    catch (err) {
        res.status(400)
        res.json({ message: 'can not fetch product with id: ' + req.params.id})
    }
})

products_route.post('/', verifyJWT, async (req: Request, res: Response) => {
    try {
        const p: Product = {
            name: req.body.name,
            price: Number(req.body.price),
            category: req.body.category
        }
        const products_model: ProductStore = new ProductStore()
        const product: Product = await products_model.createProduct(p)
        res.status(200)
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400)
        res.json({ message: 'can not insert a new product to db'})
    }
})

products_route.get('/reports/top-5-products/', async (req: Request, res: Response) => {
    try {
        const product_reports_model: ProductReport = new ProductReport()
        const top_products = await product_reports_model.getTopFiveProducts()
        res.status(200)
        res.json(top_products)
    }
    catch (err) {
        res.status(400)
        res.json({ message: 'can not fetch top 5 products'})
    }
})

products_route.get('/filter/:category', async (req: Request, res: Response) => {
    try {
        const product_model: ProductStore = new ProductStore()
        const products: Product[] = await product_model.filterProductsByCategory(String(req.params.category))
        res.status(200)
        res.json(products)
    }
    catch( err ) {
        res.status(400)
        res.json({ message: 'can not filter on db'})
    }
})


export default products_route;