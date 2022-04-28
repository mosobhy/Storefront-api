import databaseClient from '../database';

export interface UserOrderProduct {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export class UserOrder {
  async getOrderByUser(user_id: number): Promise<UserOrderProduct[]> {
    try {
      const connection = await databaseClient.connect();
      const query = `
                SELECT * FROM products WHERE id IN
                (
                    SELECT product_id FROM orders_products_join
                    WHERE order_id IN
                    (SELECT id FROM orders WHERE user_id=($1))
                )
            `;
      const results = await connection.query(query, [user_id]);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`can not fetch products from db: ${err}`);
    }
  }
}
