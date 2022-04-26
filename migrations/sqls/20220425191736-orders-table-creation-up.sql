/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(100) NOT NULL
);
