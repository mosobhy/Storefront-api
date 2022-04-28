import databaseClient from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await databaseClient.connect();
      const query = 'SELECT * FROM users';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error('database error when indexing users: ' + err);
    }
  }

  async showUser(id: number): Promise<User> {
    try {
      const connection = await databaseClient.connect();
      const query = 'SELECT * FROM users WHERE id=($1)';
      const results = await connection.query(query, [id]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`falied to fetch user with id: ${id}, err: ` + err);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const connection = await databaseClient.connect();
      const sql_query =
        'INSERT INTO users(firstname, lastname, password_hash) VALUES($1, $2, $3) RETURNING *';
      const password_hash = bcrypt.hashSync(
        user.password + process.env.BCRYPT_PASSWORD,
        Number(process.env.SALT_ROUNDS)
      );
      const results = await connection.query(sql_query, [
        user.firstname,
        user.lastname,
        password_hash,
      ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`can not create new user: ` + err);
    }
  }
}
