/* Replace with your SQL commands */
-- adding the intermediary table between products and orders that represents a 
-- many to many relationship
CREATE TABLE orders_products_join(
    id SERIAL PRIMARY KEY NOT NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);