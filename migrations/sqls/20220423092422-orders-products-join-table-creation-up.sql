/* Replace with your SQL commands */
-- adding the intermediary table between products and orders that represents a 
-- many to many relationship
CREATE TABLE orders_products_join(
    id SERIAL PRIMARY KEY NOT NULL,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL
);