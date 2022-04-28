import databaseClient from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

export interface Order {
  id?: number;
  user_id: number;
  status: string;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await databaseClient.connect();
      const query = 'SELECT * FROM orders';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`can not read orders from db, err: ${err}`);
    }
  }
}
