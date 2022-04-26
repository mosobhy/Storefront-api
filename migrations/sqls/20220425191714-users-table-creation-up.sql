/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
