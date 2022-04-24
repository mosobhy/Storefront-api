import { Product, ProductReport } from "../../dashboard_models/product_reports";

const product_report_model = new ProductReport()

describe("testing the ProductReport model", () => {
    it('getTopFiveProducts function should be defined', async () => {
        expect(product_report_model.getTopFiveProducts).toBeDefined()
    })
})