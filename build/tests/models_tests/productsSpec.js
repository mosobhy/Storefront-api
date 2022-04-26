"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const product_model = new products_1.ProductStore();
describe('testing the ProductStore model', () => {
    it('create production is defined', () => {
        expect(product_model.createProduct).toBeDefined();
    });
    it('show production is defined', () => {
        expect(product_model.showProduct).toBeDefined();
    });
    it('index is defined', () => {
        expect(product_model.index).toBeDefined();
    });
    it('filter by category is defined', () => {
        expect(product_model.filterProductsByCategory).toBeDefined();
    });
    it('returns an object when inserting new item', async () => {
        const p = {
            id: 1,
            name: 'Product',
            price: 1234,
            category: 'cat1'
        };
        const result = await product_model.createProduct(p);
        expect(result).toEqual(p);
    });
    it('retuns an item with id 1', async () => {
        const result = await product_model.index();
        expect(result[0].id).toEqual(1);
    });
    it('filter by cate should return one item', async () => {
        const result = await product_model.filterProductsByCategory('cat1');
        expect(result[0].category).toEqual('cat1');
    });
});
