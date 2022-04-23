/* Replace with your SQL commands */
-- adding the orders table which has lots or relations
CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(100) NOT NULL
);