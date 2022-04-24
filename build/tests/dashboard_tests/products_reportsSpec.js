"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_reports_1 = require("../../dashboard_models/product_reports");
const product_report_model = new product_reports_1.ProductReport();
describe("testing the ProductReport model", () => {
    it('getTopFiveProducts function should be defined', async () => {
        expect(product_report_model.getTopFiveProducts).toBeDefined();
    });
});
