/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    category VARCHAR(100)
);